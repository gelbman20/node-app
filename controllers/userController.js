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
    await new User(req.body).register()
    res.send('Thanks for registrations')
  } catch (error) { res.send(error) }
}
