const User = require('../models/User')

exports.home = function (req, res) {
  const user = req.session.user || null

  if (user) {
    const { username, avatar } = user

    res.render('home-logged', {
      title: `Welcome ${username} | Node app`,
      username,
      avatar
    })
    return true
  }

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
      email: user.email,
      avatar: user.avatar
    }

    req.session.save(() => res.redirect('/'))
  } catch (errors) {
    req.flash('errors', errors)
    res.redirect('/')
  }
}

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/'))
}
