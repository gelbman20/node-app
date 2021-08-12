const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')
const followController = require('./controllers/followController')

// User
router.get('/', userController.home)
router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/logout', userController.logout)
router.post('/doesUsernameExist', userController.doesUserExist)
router.post('/doesEmailExist', userController.doesEmailExist)

// Profile
router.get('/profile/:username', userController.ifUserExists, userController.sharedProfileData, userController.profilePostsScreen)
router.get('/profile/:username/followers', userController.ifUserExists, userController.sharedProfileData, userController.profileFollowersScreen)
router.get('/profile/:username/following', userController.ifUserExists, userController.sharedProfileData, userController.profileFollowingScreen)

// Post
router.get('/create-post', userController.mustBeLoggedIn, postController.viewCreateScreen)
router.post('/create-post', userController.mustBeLoggedIn, postController.create)
router.get('/post/:id', postController.viewSingle)
router.get('/post/:id/edit', postController.viewEditScreen)
router.post('/post/:id/edit', userController.mustBeLoggedIn, postController.edit)
router.post('/post/:id/delete', userController.mustBeLoggedIn, postController.delete)

// Search
router.post('/search', postController.search)

// Follow
router.post('/follow/:username', userController.mustBeLoggedIn, followController.addFollow)
router.post('/removeFollow/:username', userController.mustBeLoggedIn, followController.removeFollow)

router.get('/404', (req, res) => res.render('404', { title: 'Whoops, we cannot find that page.' }))

module.exports = router
