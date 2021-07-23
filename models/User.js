const bcrypt = require('bcrypt')
const validator = require('validator')
const md5 = require('md5')
const errorLabels = require('../helpers/errorLabels')
const DB = require('../db')

module.exports = class User {
  /**
   *
   * @param {Object} [data]
   * @param {String} data.username - username
   * @param {String} data.email - email
   * @param {String} data.password - password
   */
  constructor(data) {
    this.data = data
    this.errors = []
  }

  /**
   *
   * @private
   */
  _clearUp () {
    let { username, email, password } = this.data

    if (typeof username !== 'string') {
      username = ''
    }

    if (typeof email !== 'string') {
      email = ''
    }

    if (typeof password !== 'string') {
      password = ''
    }

    this.data = { username, email, password }
  }

  /**
   *
   * @returns {Promise<void>}
   * @private
   */
  async _validate () {
    try {
      const { username, email, password } = this.data

      if (!username.length) {
        this.errors.push(errorLabels.required('Username'))
      }

      if (username.length < 4) {
        this.errors.push(errorLabels.minLength(4, 'Username'))
      }

      if (username.length > 30) {
        this.errors.push(errorLabels.maxLength(30, 'Username'))
      }

      if (!validator.isAlphanumeric(username)) {
        this.errors.push(errorLabels.alphanumeric('Username'))
      }

      if (!email.length) {
        this.errors.push(errorLabels.required('Email'))
      }

      if (!validator.isEmail(email)) {
        this.errors.push(errorLabels.email())
      }

      if (!password.length) {
        this.errors.push(errorLabels.required('Password'))
      }

      if (password.length < 6) {
        this.errors.push(errorLabels.minLength(6, 'Password'))
      }

      if (password.length > 30) {
        this.errors.push(errorLabels.maxLength(30, 'Password'))
      }

      if (!this.errors.length) {
        const checkUsername = DB.getUser({ username })
        const checkEmail = DB.getUser({ email })

        const response = await Promise.all([checkUsername, checkEmail])

        const usernameExist = response[0]
        const emailExist = response[1]

        usernameExist && this.errors.push('That username is already taken.')
        emailExist && this.errors.push('That email is already taken.')
      }
    } catch (errors) {
      this.errors.push(errors)
    }
  }

  async login () {
    try {
      this._clearUp()
      const { username, password } = this.data
      const user = await DB.getUser({ username })
      if (user && bcrypt.compareSync(password, user.password)) {
        return Promise.resolve({
          _id: user._id,
          username,
          email: user.email,
          avatar: User.getAvatar(user.email)
        })
      }

      return Promise.reject('Invalid username or password')

    } catch (error) { return error }
  }

  async register () {
    try {
      this._clearUp()
      await this._validate()

      if (!this.errors.length) {
        const { _id, username, email } = await DB.saveUser(this.data)
        return Promise.resolve({
          _id,
          username,
          email,
          avatar: User.getAvatar(email)
        })
      } else {
        return Promise.reject(this.errors)
      }

    } catch (errors) {
      return Promise.reject(errors)
    }
  }

  static getAvatar (email) {
    return `https://gravatar.com/avatar/${md5(email)}?s=128`
  }
}
