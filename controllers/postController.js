const Post = require('../models/Post')

exports.viewCreateScreen = function (req, res) {
  res.render('create-post')
}

exports.create = async function (req, res) {
  try {
    const post = await new Post(req.body, req.session.user._id).create()
    res.redirect(`/post/${post._id}`)
  } catch (errors) {
    res.render('404')
  }
}

exports.viewSingle = async function (req, res) {
  try {
    const post = await Post.getOne(req.params.id, req.visitorId)
    res.render('post', { post })
  } catch (errors) {
    res.render('404')
  }
}
