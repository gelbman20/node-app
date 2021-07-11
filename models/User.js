const validator = require('validator')
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

User.prototype.login = function () {}

User.prototype.register = async function () {
  try {
    this.clearUp()
    await this.validate()

    if (!this.errors.length) return Promise.resolve(DB.saveUser(this.data))

    return Promise.reject(this.errors)

  } catch (error) { return error }
}

User.prototype.logout = function () {}

module.exports = User
