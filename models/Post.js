const sanitizeHTML = require('sanitize-html')
const DB = require('../db')
const getAvatar = require('./User').getAvatar

/**
 *
 * @param _id
 * @param title
 * @param body
 * @param author
 * @param createdDate
 * @param visitorId
 * @param other
 * @returns {{createdDate, author: (*&{avatar: string}), _id, title, body}}
 */
const defaultPost = ({ _id, title, body, author, createdDate }, visitorId = null) => {
  const post = {
    _id,
    title: sanitizeHTML(title.trim(), { allowedTags: [], allowedAttributes: {} }),
    body: sanitizeHTML(body.trim(), { allowedTags: [], allowedAttributes: {} }),
    createdDate,
    isAuthor: visitorId == author[0]._id,
    author: {
      ...author[0]._doc,
      avatar: getAvatar(author[0]._doc.email),
    }
  }
  delete post.author.password

  return post
}

module.exports = class Post {
  /**
   *
   * @param {Object} [data]
   * @param {ObjectID} userId
   * @param {ObjectID} postId
   */
  constructor(data, userId, postId) {
    this.data = data
    this.userId = userId
    this.postId = postId
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

  async update () {
    try {
      this._cleanUp()
      this._validate()

      if (!this.errors.length) {
        const { title, body, createdDate } = this.data
        const post = await DB.updatePost(this.postId, { title, body, createdDate })
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
   * @param {ObjectID} visitorId
   */
  static async getOne (id, visitorId) {
    try {
      const post = await DB.getPost(id)
      return Promise.resolve(defaultPost(post, visitorId))
    } catch (errors) {
      return Promise.reject(errors)
    }
  }

  static async getAllByAuthorId (id) {
    try {
      const posts = await DB.getAllByAuthorId(id)
      if (posts) {
        return Promise.resolve(posts)
      }

      return Promise.resolve([])
    } catch (errors) {
      return Promise.reject(errors)
    }
  }

  static async getAllByAuthorsId (ids) {
    try {
      let posts = await DB.getAllByAuthorsId(ids)

      if (posts) {
        posts = posts.map(post => defaultPost(post))
        return Promise.resolve(posts)
      }

      return Promise.resolve([])
    } catch (errors) {
      return Promise.reject(errors)
    }
  }

  static async deleteOne (id, visitorId) {
    try {
      const post = await DB.getPost(id)
      const { isAuthor } = defaultPost(post, visitorId)

      if (isAuthor) {
        const deletedPost = await DB.deletePost(id)
        return Promise.resolve(deletedPost)
      } else {
        return Promise.resolve(false)
      }
    } catch (errors) {
      return Promise.reject(errors)
    }
  }

  static async search (term, visitorId) {
    try {
      if (typeof (term) === 'string') {
        let posts = await DB.getAllPostsByTerm(term)
        if (posts && posts.length) {
          posts = posts.map(post => {
            const resultPost = defaultPost(post, visitorId)
            resultPost.author._id = null
            return resultPost
          })

          return Promise.resolve(posts)
        } else {
          return Promise.reject()
        }
      } else {
        return Promise.reject()
      }
    } catch (errors) {
      return Promise.reject(errors)
    }
  }
}
