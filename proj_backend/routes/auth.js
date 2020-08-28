const express = require('express')
const router = express.Router()

const { login, signup, googleController } = require('../controllers/auth')

router.post('/login', login)

router.post('/signup', signup)

router.post('/googleLogin', googleController)

module.exports = router
