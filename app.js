require('dotenv').config()
const express = require('express')
const session = require('express-session')
const flash = require('express-flash')
const markdonw = require('marked')
const MongoStore = require('connect-mongo')
const router = require('./router')
const mongoUrl = process.env.MONGOURL

const sessionOptions = session({
  secret: 'JavaScript',
  store: MongoStore.create({ mongoUrl }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    httpOnly: true
  }
})

const app = express()
app.use(sessionOptions)
app.use(flash())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static('public'))
app.set('view engine', 'pug')

app.use((req, res, next) => {
  /**
   *
   * @param {String} content
   * @return {*|((destination: string) => AggregationCursor<T>)|object}
   */
  res.locals.filterUserHTML = function (content) {
    return markdonw(content)
  }

  // make visitor available
  req.visitorId = req.session.user ? req.session.user._id : 0

  // make our current login user available on the req object
  res.locals.user = req.session.user

  // make success and errors flash available global
  res.locals.errors = req.flash('errors')
  res.locals.success = req.flash('success')
  next()
})

app.use('/', router)

module.exports = app
