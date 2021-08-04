const Follow = require('../models/Follow')

exports.addFollow = async (req, res) => {
  try {
    await new Follow(req.params.username, req.visitorId).create()
    req.flash('success', `Success followed on ${req.params.username}`)
    req.session.save(() => res.redirect(`/profile/${req.params.username}`))
  } catch (errors) {
    req.flash('errors', errors)
    req.session.save(() => res.redirect('/404'))
  }
}

exports.removeFollow = async (req, res) => {
  try {
    const result = await new Follow(req.params.username, req.visitorId).remove()
    console.log('Result', result)
    req.flash('success', `Success unfollowed on ${req.params.username}`)
    req.session.save(() => res.redirect(`/profile/${req.params.username}`))
  } catch (errors) {
    req.flash('errors', errors)
    req.session.save(() => res.redirect(`/profile/${req.params.username}`))
  }
}
