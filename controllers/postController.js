exports.viewCreateScreen = function (req, res) {
  const { user } = req.session
  const { username, avatar } = user

  res.render('create-post', {
    title: `Create a new post ${username} | Node app`,
    username,
    avatar
  })
}
