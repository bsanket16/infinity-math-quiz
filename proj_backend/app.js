require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')

const app = express()

app.use(cors())
app.use(bodyParser.json())

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

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

//PORT
const PORT = process.env.PORT || 3001

// Server
app.listen(PORT, console.log(`App running on port ${PORT} in ${process.env.NODE_ENV} mode`))