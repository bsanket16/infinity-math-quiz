const express = require('express')
const router = express.Router()

const { login, signup } = require('../controllers/auth')


router.post('/', login)

router.post('/signup', signup)

router.get('/dashboard', (req,res) => {
    res.send('hello')
})

module.exports = router
