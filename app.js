const express = require('express')
const router = require('./router')

const app = express()


app.use(express.static('public'))
app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

module.exports = app
