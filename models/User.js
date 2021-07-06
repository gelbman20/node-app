const validator = require('validator')
const errorLabels = require('../helpers/errorLabels')

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

User.prototype.validate = function () {
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
}

User.prototype.login = function () {}

User.prototype.register = function () {
  this.clearUp()
  this.validate()

  return new Promise((resolve, reject) => {
    if (!this.errors.length) {
      resolve(this.data)
    } else {
      reject(this.errors)
    }
  })
}

User.prototype.logout = function () {}

module.exports = User
