require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoUri = process.env.MONGOURL
const app = require('./app')

const userScheme = new Schema({
  username: String,
  email: String,
  password: String
})

class DB {
  static saveUser ({ username, email, password }) {
    const User = mongoose.model('User', userScheme)
    const user = new User({
      username,
      email,
      password
    })

    return new Promise((resolve, reject) => {
      user.save()
        .then((doc) => {
          resolve(doc)
          mongoose.disconnect()
        })
        .catch((err) => {
          reject(err)
          mongoose.disconnect()
        })
    })
  }
}

mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log('Mongo connection status: Success')
    })
  })
  .catch(err => console.log(`Mongo connection status: Error \n ${err}`))

module.exports = DB
