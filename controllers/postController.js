const Post = require('../models/Post')

exports.viewCreateScreen = function (req, res) {
  res.render('create-post')
}

exports.create = async function (req, res) {
  try {
    const post = await new Post(req.body, req.session.user._id).create()
    res.send(`Post has been successfully created!, ${post}`)
  } catch (errors) {
    res.send(errors)
  }
}
