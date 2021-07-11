const bcrypt = require('bcrypt')
const validator = require('validator')
const md5 = require('md5')
const errorLabels = require('../helpers/errorLabels')
const DB = require('../db')

const User = function (data) {
  this.data = data
  this.errors = []
}

User.prototype.clearUp = function () {
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

  this.data = {
    username,
    email,
    password
  }
}

User.prototype.validate = async function () {
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
}

User.prototype.login = async function () {
  try {
    this.clearUp()
    const { username, password } = this.data
    const user = await DB.getUser({ username })

    if (user && bcrypt.compareSync(password, user.password)) {
      return Promise.resolve(username)
    }

    return Promise.reject('Invalid username or password')

  } catch (error) { return error }
}

User.prototype.register = async function () {
  try {
    this.clearUp()
    await this.validate()

    const { username, email } = await DB.saveUser(this.data)

    if (!this.errors.length) return Promise.resolve({
      username,
      email,
      avatar: this.getAvatar(email)
    })

    return Promise.reject(this.errors)

  } catch (error) { return error }
}

User.prototype.logout = function () {}

User.prototype.getAvatar = function (email) {
  return `https://gravatar.com/avatar/${md5(email)}?s=128`
}

module.exports = User
