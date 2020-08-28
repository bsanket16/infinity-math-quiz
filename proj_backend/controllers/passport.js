const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const Google_User = require('../models/google_user')
const  jwt = require('jsonwebtoken')

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {

        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName
        }
        try {
            let user = await Google_User.findOne({ googleId: profile.id })

            if(user) {
                done(null, user)
            } else {
                user = await Google_User.create(newUser)
                done(null, user)
            }
        } catch (error) {
            console.log(error)
        }


    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    
    passport.deserializeUser((id, done) => {
        Google_User.findById(id, (err, user) => done(err, user))
    })
}