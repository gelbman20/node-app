require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const mongoUri = process.env.MONGOURL


const appInit = async (callback) => {
  try {
    console.time('MongoDB Connection')
    await mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })

    const userScheme = new Schema({
      username: String,
      email: String,
      password: String
    })
    const User = mongoose.model('User', userScheme)

    const postScheme = new Schema({
      title: String,
      body: String,
      createdDate: { type: Date, default: new Date() },
      author: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    })

    const Post = mongoose.model('Post', postScheme)

    const followScheme = new Schema({
      followedId: mongoose.Types.ObjectId,
      authorId: mongoose.Types.ObjectId
    })

    const Follow = mongoose.model('Follow', followScheme)

    module.exports = class DB {
      static saveUser ({ username, email, password }) {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        return new User({ username, email, password: hash }).save()
      }

      static getUser (user) {
        return User.findOne(user).exec()
      }

      /**
       *
       * @param {Object} [data]
       * @param {String} [data.title]
       * @param {String} [data.body]
       * @param {Date} [data.createdDate]
       * @param {ObjectID} [data.author]
       * @returns {Promise<Document<any, any, unknown>>}
       */
      static savePost (data) {
        return new Post(data).save()
      }

      /**
       *
       * @param id
       * @param data
       * @returns {QueryWithHelpers<EnforceDocument<unknown, {}> | null, EnforceDocument<unknown, {}>, {}, unknown>}
       */
      static updatePost (id, data) {
        return Post.findByIdAndUpdate(id, data)
      }

      /**
       *
       * @param {Object} id
       * @returns {Promise<Document<any, any, unknown> | null>}
       */
      static getPost (id) {
        return Post.findById(id).populate('author').exec()
      }

      static getAllByAuthorId (id) {
        return Post.find({ author: id }).exec()
      }

      /**
       * This function delete Post
       * @param id
       * @return {Promise<Document<any, any, unknown> | null>}
       */
      static deletePost (id) {
        return Post.findByIdAndDelete(id).exec()
      }

      static getAllPostsByTerm (term) {
        const regex = new RegExp(term, 'i')
        return Post.find().or([{ title: regex }, { 'body': regex }]).populate('author').exec()
      }

      /**
       *
       * @param {ObjectID} followedId
       * @param {ObjectId} authorId
       */
      static createFollow (followedId, authorId) {
        return new Follow({ followedId, authorId }).save()
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
  .then(() => console.timeEnd('MongoDB Connection'))
  .catch(() => console.timeEnd('MongoDB Connection'))
