const User = require('../models/User')

exports.home = function (req, res) {
  res.render('index', { title: 'Node app' })
}

exports.register = function (req, res) {
  const user = new User(req.body)
  user.register()
    .then((response) => {
      console.log(response)
      res.send('Thanks for registrations')
    })
    .catch((errors) => {
      console.log(errors)
      res.send(errors)
    })
}
