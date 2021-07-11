const User = require('../models/User')

exports.home = function (req, res) {
  res.render('index', { title: 'Node app' })
}

exports.login = async function (req, res) {
  try {
    const username = await new User(req.body).login()
    res.send(username)
  } catch (error) {
    res.send(error)
  }
}

exports.register = async function (req, res) {
  try {
    const user = await new User(req.body).register()
    req.session.user = {
      username: user.username,
      email: user.email
    }
    req.session.save(() => res.redirect('/'))
  } catch (error) { res.send(error) }
}
