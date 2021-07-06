const placeholder = 'This'

module.exports = {
  required: (field = placeholder) => `${field} is required`,
  minLength: (length = 1, field = placeholder) => `${field} length must be more then ${length}`,
  maxLength: (length = 10, field = placeholder) => `${field} length must be less then ${length}`,
  alphanumeric: (field = placeholder) => `${field} can only contains letters and numbers`,
  email: (field = 'Email') => `${field} must be valid email`
}
