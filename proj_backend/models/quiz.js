const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
            trim: true
        },
        options : [
            {option: {type: String, required: true}},
            {option: {type: String, required: true}},
            {option: {type: String, required: true}},
            {option: {type: String, required: true}}
        ],
        answer: {
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
