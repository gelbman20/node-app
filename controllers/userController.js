const User = require('../models/User')

exports.mustBeLoggedIn = function (req, res, next) {
  const { user } = req.session
  if (user) {
    next()
  } else {
    req.flash('loginErrors', 'You must be logged in to perform this action.')
    req.session.save(() => res.redirect('/'))
  }
}

exports.home = function (req, res) {
  const user = req.session.user || null

  if (user) {
    res.render('home-logged')
    return true
  }

  res.render('index', { title: 'Node app' })
}

exports.login = async function (req, res) {
  try {
    const user = await new User(req.body).login()
    req.session.user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar
    }
    req.session.save(() => res.redirect('/'))
  } catch (errors) {
    req.flash('loginErrors', errors)
    req.session.save(() => res.redirect('/'))
  }
}

exports.register = async function (req, res) {
  try {
    const user = await new User(req.body).register()
    req.session.user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar
    }

    req.session.save(() => res.redirect('/'))
  } catch (errors) {
    req.flash('errors', errors)
    req.session.save(() => res.redirect('/'))
  }
}

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/'))
}
