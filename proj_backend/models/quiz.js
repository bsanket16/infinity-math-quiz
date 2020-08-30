const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
            trim: true
        },
        option_one : {
            type: String,
            required: true,
            trim: true
        },
        option_two : {
            type: String,
            required: true,
            trim: true
        },
        option_three : {
            type: String,
            required: true,
            trim: true
        },
        option_four : {
            type: String,
            required: true,
            trim: true
        },
        correct_answer: {
            type: String,
            required: true
        },
        points: {
            type: Number,
            required: true
        }
    }
)

module.exports = mongoose.model('Quiz', quizSchema)
