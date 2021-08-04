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

  /**
   *
   * @param {'create'|'delete'} action
   * @return {Promise<void>}
   */
  async validate (action) {
    try {
      // followedUsername must be exist in database
      const user = await User.getUser(this.followedUsername)
      if (user) {
        this.followedId = user._id
      }

      // check is follow ready exist
      const isFollowReadyExist = await DB.isFollowing(this.followedId, this.authorId)

      if (action === 'create') {
        if (isFollowReadyExist) {
          this.errors.push(`You already followed on ${this.followedUsername}`)
        }
      }

      if (action === 'delete') {
        if (!isFollowReadyExist) {
          this.errors.push(`You cannot stop following on ${this.followedUsername} you must be follow`)
        }
      }

      if (this.followedId == this.authorId) {
        this.errors.push('You cannot follow yourself')
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
      await this.validate('create')

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

  async remove () {
    try {
      this.cleanUp()
      await this.validate('delete')

      if (!this.errors.length) {
        await DB.removeFollow(this.followedId, this.authorId)
        return Promise.resolve()
      } else {
        return Promise.reject(this.errors)
      }
    } catch (errors) {
      return Promise.reject(errors)
    }
  }

  static async isVisitorFollowing (followedId, visitorId) {
    try {
      const isFollowing = await DB.isFollowing(followedId, visitorId)

      if (isFollowing) {
        return Promise.resolve(true)
      } else {
        return Promise.resolve(false)
      }
    } catch (errors) {
      return Promise.reject(errors)
    }
  }

  static async getFollowersById (followedId) {
    try {
      let followers = await DB.getFollowersById(followedId)

      if (followers) {
        followers = followers.map(follower => {
          const author = follower.authorId[0]
          return {
            _id: author._id,
            username: author.username,
            email: author.email,
            avatar: User.getAvatar(author.email)
          }
        })

        return Promise.resolve(followers)
      } else {
        return Promise.resolve([])
      }

    } catch (errors) {
      return Promise.reject(errors)
    }
  }

  static async getFollowingBeId (followerId) {
    try {
      let following = await DB.getFollowingBeId(followerId)

      if (following) {
        following = following.map(follower => {
          const author = follower.followedId[0]
          return {
            _id: author._id,
            username: author.username,
            email: author.email,
            avatar: User.getAvatar(author.email)
          }
        })

        return Promise.resolve(following)
      } else {
        return Promise.resolve([])
      }

    } catch (errors) {
      return Promise.reject(errors)
    }
  }
}
