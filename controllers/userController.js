const User = require('../models/User')
const Post = require('../models/Post')
const Follow = require('../models/Follow')

exports.mustBeLoggedIn = function (req, res, next) {
  const { user } = req.session
  if (user) {
    next()
  } else {
    req.flash('errors', 'You must be logged in to perform this action.')
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
    req.flash('errors', errors)
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

exports.ifUserExists = async (req, res, next) => {
  try {
    const user = await User.getUser(req.params.username)
    if (user) {
      req.userProfile = user
      next()
    } else {
      res.render('404')
    }
  } catch (errors) {
    res.render('404')
  }
}

exports.sharedProfileData = async (req, res, next) => {
  let isFollowing = false

  try {
    if (req.session.user) {
      isFollowing = await Follow.isVisitorFollowing(req.userProfile._id, req.visitorId)
    }

    req.isFollowing = isFollowing
    next()
  } catch (errors) {
    req.flash('errors', errors)
    req.session.save(() => res.redirect('404'))
  }

}

exports.profilePostsScreen = async (req, res) => {
  try {
    const { userProfile, isFollowing, visitorId } = req
    if (userProfile) {
      let posts = await Post.getAllByAuthorId(userProfile._id)
      res.render('profile', { userProfile, posts, isFollowing, visitorId })
    } else {
      res.render('404')
    }
  } catch (errors) {
    res.render('404')
  }
}
