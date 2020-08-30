const Quiz = require('../models/quiz')

exports.getQuestions = async (req, res) => {
        
    await Quiz.find()
        
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
            option_one : quiz.option_one,
            option_two : quiz.option_two,
            option_three : quiz.option_three,
            option_four : quiz.option_four,
            correct_answer : quiz.correct,
            points: quiz.points
        })
    })
}