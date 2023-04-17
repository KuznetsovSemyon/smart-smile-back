require('dotenv').config();
const express = require('express')
const { createServer } = require('http')
const apiRouter = require('./routes/api-router.js')
const sessions = require('express-session')
const cookieParser = require('cookie-parser')

const app = express()
const PORT = process.env.PORT || 4000

const httpServer = createServer(app)

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: +process.env.SESSION_TIME,
    },
}))
app.use(cookieParser())

app.use('/api', apiRouter)

app.use('*', (req, res) => {
    res.status(404).send('Not Found 404')
})

const start = async () => {
    try {
        httpServer.listen(PORT, () => console.log(`server run on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()