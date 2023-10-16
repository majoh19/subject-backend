const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors({ origin: '*' }))
app.use(express.urlencoded({ extended: false }))

const user = require('./routes/user')
const semester = require('./routes/semester')
const subject = require('./routes/subject')
const grade = require('./routes/grade')
const authorization = require('./routes/authorization')

app.use(express.json())

app.use('/users', user)
app.use('/semesters', semester)
app.use('/subjects', subject)
app.use('/grades', grade)
app.use('/authorization', authorization)

module.exports = app