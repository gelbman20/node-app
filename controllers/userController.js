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

exports.home = async (req, res) => {
  try {
    const user = req.session.user || null

    if (user) {
      const { _id } = user
      const followings = await Follow.getFollowingBeId(_id)
      let followingsPosts = []


      if (followings && followings.length) {
        const ids = followings.map(({ _id }) => _id)
        followingsPosts = await Post.getAllByAuthorsId(ids)
      }

      console.log(followingsPosts)

      res.render('home-logged', { followingsPosts })
      return true
    }
    res.render('index', { title: 'Node app' })
  } catch (errors) {
    res.redirect('404')
  }
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

exports.doesUserExist = async (req, res) => {
  try {
    const user = await User.getUser(req.body.username)
    if (user) {
      res.json(true)
    } else {
      res.json(false)
    }
  } catch (errors) {
    res.json(false)
  }
}

exports.doesEmailExist = async (req, res) => {
  try {
    const user = await User.getUserByEmail(req.body.email)

    if (user) {
      res.json(true)
    } else {
      res.json(false)
    }
  } catch (errors) {
    res.json(false)
  }
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
      const { _id } = userProfile
      const [posts, followers, following] = await Promise.all([Post.getAllByAuthorId(_id), Follow.getFollowersById(_id), Follow.getFollowingBeId(_id)])
      res.render('profile', { userProfile, posts, isFollowing, visitorId, followers, following, page: 'profile', title: `Profile for ${userProfile.username}` })
    } else {
      res.redirect('/404')
    }
  } catch (errors) {
    res.redirect('/404')
  }
}

exports.profileFollowersScreen = async (req, res) => {
  try {
    const { userProfile, isFollowing, visitorId } = req

    if (userProfile) {
      const { _id } = userProfile
      const [posts, followers, following] = await Promise.all([Post.getAllByAuthorId(_id), Follow.getFollowersById(_id), Follow.getFollowingBeId(_id)])
      res.render('profile-followers', { userProfile, isFollowing, visitorId, posts, followers, following, page: 'followers', title: `Profile for ${userProfile.username}` })
    } else {
      res.redirect('/404')
    }
  } catch (errors) {
    res.redirect('/404')
  }
}

exports.profileFollowingScreen = async (req, res) => {
  try {
    const { userProfile, isFollowing, visitorId } = req

    if (userProfile) {
      const { _id } = userProfile
      const [posts, followers, following] = await Promise.all([Post.getAllByAuthorId(_id), Follow.getFollowersById(_id), Follow.getFollowingBeId(_id)])
      res.render('profile-following', { userProfile, isFollowing, visitorId, posts, followers, following, page: 'following', title: `Profile for ${userProfile.username}` })
    } else {
      res.redirect('/404')
    }
  } catch (errors) {
    res.redirect('/404')
  }
}
