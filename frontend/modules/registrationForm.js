import axios from 'axios';

export default class RegistrationForm {
  /**
   *
   * @param {HTMLElement} element
   */
  constructor (element) {
    this.form = document.querySelector('#registration-form')
    this.allFields = element.querySelectorAll('.form-control')
    this.insertValidationElements()
    this.username = element.querySelector('#username-register')
    this.username.previousValue = ''
    this.email = element.querySelector('#email-register')
    this.email.previousValue = ''
    this.password = element.querySelector('#password-register')
    this.password.previousValue = ''
    this.username.isUniqure = false
    this.password.isUniqure = false
    this.events()
  }

  // Events
  events () {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault()
      this.formSubmitHandler()
    })

    this.username.addEventListener('keyup', () => {
      this.isDifferent(this.username, this.usernameHandler)
    })

    this.email.addEventListener('keyup', () => {
      this.isDifferent(this.email, this.emailHandler)
    })

    this.password.addEventListener('keyup', () => {
      this.isDifferent(this.password, this.passwordHandler)
    })

    this.username.addEventListener('blur', () => {
      this.isDifferent(this.username, this.usernameHandler)
    })

    this.email.addEventListener('blur', () => {
      this.isDifferent(this.email, this.emailHandler)
    })

    this.password.addEventListener('blur', () => {
      this.isDifferent(this.password, this.passwordHandler)
    })
  }

  formSubmitHandler () {
    this.usernameImmediately()
    this.usernameAfterDelay()
    this.emailAfterDelay()
    this.passwordImmediately()
    this.passwordAfterDelay()

    if (this.username.isUniqure && !this.username.errors && this.email.isUniqure && !this.email.errors && this.password.errors) {
      this.form.submit()
    }
  }

  // Methods
  /**
   *
   * @param {HTMLElement} el
   * @param {String} el.previousValue
   * @param {Function} handler
   */
  isDifferent (el, handler) {
    if (el.previousValue !== el.value) {
      handler.call(this)
    }

    el.previousValue = el.value
  }

  usernameHandler () {
    this.username.errors = false
    this.usernameImmediately()
    clearTimeout(this.username.timer)
    this.username.timer = setTimeout(() => {
      this.usernameAfterDelay()
    }, 800)
  }

  usernameImmediately () {
    if (this.username.value !== '' && !/^([a-zA-Z0-9]+)$/.test(this.username.value)) {
      this.showValidationError(this.username, 'Username can only contains letters and numbers.')
    }

    if (this.username.value.length > 30) {
      this.showValidationError(this.username, 'Username can not exist 30 elements')
    }

    if (!this.username.errors) {
      this.hideValidationError(this.username)
    }
  }

  usernameAfterDelay () {
    if (this.username.value.length < 3) {
      this.showValidationError(this.username, 'Username must be a least 3 characters')
    }

    if (!this.username.errors) {
      axios.post('/doesUsernameExist', {
        username: this.username.value
      }).then((response) => {
        if (response.data) {
          this.showValidationError(this.username, 'This username is already taken')
          this.username.isUniqure = false
        } else {
          this.username.isUniqure = true
        }
      }).catch(() => {
        console.log('Please try again later')
      })
    }
  }

  emailHandler () {
    this.email.errors = false
    this.emailImmediately()
    clearTimeout(this.email.timer)
    this.email.timer = setTimeout(() => {
      this.emailAfterDelay()
    }, 800)
  }

  emailImmediately () {
    if (!this.email.error) {
      this.hideValidationError(this.email)
    }
  }

  emailAfterDelay () {
    if (!/^\S+@\S+$/.test(this.email.value)) {
      this.showValidationError(this.email, 'Emails must be a valid')
    }

    if (!this.email.errors) {
      axios.post('/doesEmailExist', {
        email: this.email.value
      }).then((response) => {
        if (response.data) {
          this.showValidationError(this.email, 'This email is already taken')
          this.email.isUniqure = false
        }  else {
          this.email.isUniqure = true
        }
      }).catch(() => {
        console.log('Please try again later')
      })
    }
  }

  passwordHandler () {
    this.password.errors = false
    this.passwordImmediately()
    clearTimeout(this.password.timer)
    this.password.timer = setTimeout(() => {
      this.passwordAfterDelay()
    }, 800)
  }

  passwordImmediately () {
    if (this.password.value.length > 50) {
      this.showValidationError(this.password, 'Password can not exist 50 characters')
    }

    if (!this.password.errors) {
      this.hideValidationError(this.password)
    }
  }

  passwordAfterDelay () {
    if (this.password.value.length < 12) {
      this.showValidationError(this.password, 'Password must be at least 12 characters')
    }
  }

  /**
   *
   * @param {HTMLElement} el
   * @param {String} message
   */
  showValidationError (el, message) {
    el.nextElementSibling.innerHTML = message
    el.nextElementSibling.classList.add('liveValidateMessage--visible')
    el.errors = true
  }

  /**
   *
   * @param {HTMLElement} el
   */
  hideValidationError (el) {
    el.nextElementSibling.classList.remove('liveValidateMessage--visible')
  }

  insertValidationElements () {
    this.allFields.forEach(field => {
      field.insertAdjacentHTML('afterend', '<div class="alert alert-danger small liveValidateMessage"></div>')
    })
  }
}
