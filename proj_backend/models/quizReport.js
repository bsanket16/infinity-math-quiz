const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const quizReportSchema = new mongoose.Schema(
    {
        score: Number,
        accuracy: Number,
        correctAnswers: Number,
        incorrectAnswers: Number,
        date: { 
            type: String,
            default: Date.now
        },
        user: {
            type: ObjectId,
            ref: 'User'
        }
    }
)


module.exports = mongoose.model('quizReport', quizReportSchema)
