require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')


// Passport
require('./controllers/passport')(passport)

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// DB connection
mongoose.connect( process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    console.log(`Database connected successfully`)
})

// Routes
app.use('/', require('./routes/auth'))
app.use('/auth', require('./routes/auth_google'))

//PORT
const PORT = process.env.PORT || 3001

// Server
app.listen(PORT, console.log(`App running on port ${PORT}`))