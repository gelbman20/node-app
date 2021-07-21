require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const mongoUri = process.env.MONGOURL


const appInit = async (callback) => {
  try {
    console.time('MongoDB Connection')
    await mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true })
    console.timeEnd('MongoDB Connection')

    const userScheme = new Schema({
      username: String,
      email: String,
      password: String
    })
    const User = mongoose.model('User', userScheme)

    module.exports = class DB {
      static saveUser ({ username, email, password }) {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        return new User({ username, email, password: hash }).save()
      }

      static getUser (user) {
        return User.findOne(user).exec()
      }
    }

    callback()
  } catch (error) {
    console.log(`Mongo connection status: Error \n ${error}`)
  }
}

appInit(() => {
  const app = require('./app')
  app.listen(process.env.PORT || 3000, () => {
    console.log('Mongo connection status: Success')
  })
}) 
  .then(() => {})
  .catch(() => {})
