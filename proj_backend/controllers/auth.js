const User = require('../models/user')
const expressJwt = require('express-jwt')   
const _ = require('lodash')
const { OAuth2Client } = require('google-auth-library')
const fetch = require('node-fetch')
const { validationResult } = require('express-validator')
const  jwt = require('jsonwebtoken')


//login controller
exports.login = (req, res) => {

    const errors = validationResult(req)

    const {email, password} = req.body

    if(!errors.isEmpty()){
        return res.status(422).json({
            error : `${errors.array()[0].msg}`
        })
    }

    User.findOne({ email }, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error : 'Email does not exist'
            })
        }

        if(!user.authenticate(password))  {
            return res.status(401).json({
                error : 'Incorrect password'
            })
        }

        //create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET)
        
        //cookie
        res.cookie('token', token, {expire: new Date() + 9999})

        //response to frontend
        const {_id, username, email} = user
        return res.json({token, user: {_id, username, email}})

    })

}

//signup controller
exports.signup = (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error : `${errors.array()[0].msg}`
        })
    }

    const user = new User(req.body)
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: 'Not able to store user in database'
            })
        }
        res.json({
            id : user._id,
            username : user.username,
            email : user.email
        })
    })
}

//logout controller
exports.logout = (req, res) => {
    res.clearCookie('token')
    res.json({
        message: 'logout successfully!'
    })
}

exports.isSignedIn = expressJwt({   
    secret: process.env.SECRET,
    algorithms: ['HS256'],
    userProperty: 'auth'
})  

// //custom middleware
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next()
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT)
// Google Login
exports.googleController = (req, res) => {
    const { idToken } = req.body

client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
    .then(response => {
      // console.log('GOOGLE LOGIN RESPONSE',response)
        const { username, email } = response.payload
        if (email) {
        User.findOne({ email }).exec((err, user) => {
                if (user) {
                const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
                    expiresIn: '7d'
                })
                const { _id, email, username } = user
                return res.json({
                    token,
                    user: { _id, email, username }
                })
            } else {
            let password = email + process.env.SECRET
            user = new User({ username, email, password })
            user.save((err, data) => {
            if (err) {
                console.log('ERROR GOOGLE LOGIN ON USER SAVE', err)
                return res.status(400).json({
                    error: 'User signup failed with google'
                })
            }
                const token = jwt.sign(
                    { _id: data._id },
                    process.env.JWT_SECRET,
                    { expiresIn: '7d' }
            )
            const { _id, email, username } = data
            return res.json({
                token,
                user: { _id, email, username }
            })
            })
        }
        })
    } else {
        return res.status(400).json({
            error: 'Google login failed. Try again'
        })
    }
    })
}