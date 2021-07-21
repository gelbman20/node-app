const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')

router.get('/', userController.home)
router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/logout', userController.logout)

router.get('/create-post', userController.mustBeLoggedIn, postController.viewCreateScreen)
router.post('/create-post', userController.mustBeLoggedIn, postController.create)

module.exports = router
