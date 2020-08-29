const express = require('express')
const router = express.Router()

const {getQuestions, addQuestion} = require('../controllers/quiz')

router.get('/questions', getQuestions)

router.post('/questions', addQuestion)

module.exports = router 
