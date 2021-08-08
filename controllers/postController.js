const Post = require('../models/Post')

exports.viewCreateScreen = function (req, res) {
  res.render('create-post', { title: 'Create a new post' })
}

exports.create = async function (req, res) {
  try {
    const post = await new Post(req.body, req.session.user._id).create()
    if (post) {
      req.flash('success', 'Post successfully created')
      req.session.save(() => res.redirect(`/post/${post._id}`))
    } else {
      res.redirect('404')
    }
  } catch (errors) {
    res.render('404')
  }
}

exports.viewSingle = async function (req, res) {
  try {
    const post = await Post.getOne(req.params.id, req.visitorId)
    res.render('post', { post, title: post.title })
  } catch (errors) {
    res.render('404')
  }
}

exports.viewEditScreen = async (req, res) => {
  try {
    const post = await Post.getOne(req.params.id, req.visitorId)
    const { isAuthor } = post
    if (isAuthor) {
      res.render('edit-post', { post, title: post.title })
    } else {
      res.redirect(`/post/${post._id}`)
    }
  } catch (errors) {
    res.render('404')
  }
}

exports.edit = async (req, res) => {
  try {
    const post = await new Post(req.body, req.session.user._id, req.params.id).update()
    if (post) {
      req.flash('success', 'You successfully changed the post')
      req.session.save(() => res.redirect(`/post/${req.params.id}/edit`))
    }
  } catch (errors) {
    req.flash('errors', errors)
    req.session.save(() => res.redirect(`/post/${req.params.id}/edit`))
  }
}

exports.delete = async (req, res) => {
  try {
    const isPostDeleted = await Post.deleteOne(req.params.id, req.visitorId)
    if (isPostDeleted) {
      req.flash('success', 'The post hase been successfully deleted')
      req.session.save(() => res.redirect(`/profile/${req.session.user.username}`))
    } else {
      req.flash('errors', 'You don\'t have permission to do this action')
      req.session.save(() => res.redirect(`/post/${req.params.id}`))
    }
  } catch (errors) {
    req.flash('errors', errors)
    req.session.save(() => res.redirect(`/post/${req.params.id}`))
  }
}

exports.search = async (req, res) => {
  try {
    const result = await Post.search(req.body.searchTerm, req.visitorId)
    if (result && result.length) {
      res.json(result)
    } else {
      res.json([])
    }
  } catch (errors) {
    res.json([])
  }
}
