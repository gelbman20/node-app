const DB = require('../db')
const getAvatar = require('./User').getAvatar

module.exports = class Post {
  /**
   *
   * @param {Object} [data]
   * @param {ObjectID} userId
   */
  constructor(data, userId) {
    this.data = data
    this.userId = userId
    this.errors = []
  }

  /**
   * This function checks data and set only needed data,
   * avoids unneeded data and bugs
   * @private
   */
  _cleanUp () {
    let { title, body } = this.data

    if (typeof title !== 'string') {
      title = ''
    }

    if (typeof body !== 'string') {
      body = ''
    }

    title = title.trim()
    body = body.trim()

    this.data = { title, body, createdDate: new Date() }
  }

  /**
   * This function check data and set errors
   * @private
   */
  _validate () {
    const { title, body } = this.data

    if (title === '') {
      this.errors.push('Title must be required')
    }

    if (body === '') {
      this.errors.push('Post content required')
    }
  }

  /**
   * This function saves post
   * @returns {Promise<Document<*, *, unknown>>}
   */
  async create () {
    try {
      this._cleanUp()
      this._validate()

      if (!this.errors.length) {
        const { title, body, createdDate } = this.data
        const post = await DB.savePost({ title, body, createdDate, author: this.userId })
        return Promise.resolve(post)
      }

      return Promise.reject(this.errors)
    } catch (errors) {
      return Promise.reject(errors)
    }
  }

  /**
   *
   * @param {ObjectID} id
   */
  static async getOne (id) {
    try {
      const { _id, title, body, author, createdDate } = await DB.getPost(id)
      const post = {
        _id,
        title,
        body,
        createdDate,
        author: {
          ...author[0]._doc,
          avatar: getAvatar(author[0]._doc.email),
        }
      }

      delete post.author.password

      console.log(post)

      return Promise.resolve(post)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
