const User = require('./User')
const DB = require('../db')

module.exports = class Follow {
  /**
   *
   * @param {ObjectId} followedUsername
   * @param {ObjectId} authorId
   */
  constructor (followedUsername, authorId) {
    this.followedUsername = followedUsername
    this.authorId = authorId
    this.errors = []
  }

  cleanUp () {
    if (typeof this.followedUsername != 'string') {
      this.followedUsername = ''
    }

    if (typeof this.authorId != 'string') {
      this.authorId = ''
    }
  }

  async validate () {
    try {
      // followedUsername must be exist in database
      const user = await User.getUser(this.followedUsername)
      if (user) {
        this.followedId = user._id
      }
    } catch (errors) {
      if (errors === null) {
        this.errors.push('You cannot follow a user that does not exist')
      } else {
        this.errors.push(errors)
      }
    }
  }

  async create () {
    try {
      this.cleanUp()
      await this.validate()

      if (!this.errors.length) {
        const follow = await DB.createFollow(this.followedId, this.authorId)

        if (follow) {
          return Promise.resolve(follow)
        } else {
          return Promise.reject()
        }
      } else {
        return Promise.reject(this.errors)
      }
    } catch (errors) {
      return Promise.reject(errors)
    }
  }
}
