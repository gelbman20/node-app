const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')

// User
router.get('/', userController.home)
router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/logout', userController.logout)

// Profile
router.get('/profile/:username', userController.ifUserExists, userController.profilePostsScreen)

// Post
router.get('/create-post', userController.mustBeLoggedIn, postController.viewCreateScreen)
router.post('/create-post', userController.mustBeLoggedIn, postController.create)
router.get('/post/:id', postController.viewSingle)
router.get('/post/:id/edit', postController.viewEditScreen)
router.post('/post/:id/edit', userController.mustBeLoggedIn, postController.edit)
router.post('/post/:id/delete', userController.mustBeLoggedIn, postController.delete)

module.exports = router
