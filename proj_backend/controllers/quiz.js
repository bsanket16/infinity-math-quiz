const Quiz = require('../models/quiz')

exports.getQuestions = (req, res) => {
    Quiz.find()
        .then((question) => {
            res.json(question)
        })
        .catch(err => {console.log(err)})
}

exports.addQuestion = (req, res) => {
    const quiz = new Quiz(req.body)
    quiz.save((err, quiz) => {
        if(err) {
            return res.status(400).json({
                err: 'Not able to store user in database'
            })
        }
        res.json({
            question : quiz.question,
            options : quiz.options,
            answer : quiz.answer
        })
    })
}