const User = require('../models/user')
const expressJwt = require('express-jwt')   
const _ = require('lodash')
const { OAuth2Client } = require('google-auth-library')
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
        const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '7d' })
        
        //cookie
        // res.cookie('token', token, {expire: new Date() + 9999})

        //response to frontend
        const {_id, name, email} = user
        return res.json({token, user: {_id, name, email}})

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
            name : user.name,
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

const client = new OAuth2Client(process.env.GOOGLE_CLIENT)

exports.googleController = (req, res) => {
    const { idToken } = req.body

client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
    .then(response => {
        const { name, email } = response.payload
        if (email) {
        User.findOne({ email }).exec((err, user) => {
                if (user) {
                const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
                    expiresIn: '7d'
                })
                const { _id, email, name } = user
                return res.json({
                    token,
                    user: { _id, email, name }
                })
            } else {
            let password = email + process.env.SECRET
            user = new User({ name, email, password })
            user.save((err, data) => {
            if (err) {
                console.log('ERROR GOOGLE LOGIN ON USER SAVE', err)
                return res.status(400).json({
                    error: 'User signup failed with google'
                })
            }
                const token = jwt.sign(
                    { _id: data._id },
                    process.env.SECRET,
                    { expiresIn: '7d' }
            )
            const { _id, email, name } = data
            return res.json({
                token,
                user: { _id, email, name }
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