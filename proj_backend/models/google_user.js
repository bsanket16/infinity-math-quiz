const mongoose = require('mongoose')

const UserSchemaG = new mongoose.Schema (
    {
        googleId: {
            type: String,
            required: true
        },        
        displayName: {
            type: String,
            required: true
        }
    },
        { timestamps: true }
)

module.exports = mongoose.model('Google_User', UserSchemaG)