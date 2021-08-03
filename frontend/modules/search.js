import axios from 'axios';
import dompurify from 'dompurify'

/**
 *
 * @param {Number} number
 * @return {`<div class="list-group-item active"><strong>Search Results</strong> (${string} items found)</div>`}
 */
const activeListItem = (number) => `<div class="list-group-item active"><strong>Search Results</strong> (${number} items found)</div>`

/**
 *
 * @param {Object} item
 * @param {String} [item.title]
 * @param {ObjectID} [item._id]
 * @param {Object} [item.author]
 * @param {Date} [item.createdDate]
 * @return {`<a class="list-group-item list-group-item-action" href="/post/${string}">
            <img class="avatar-sm rounded-circle mr-2" src="${*}">
            <strong class="d-inline-block mr-2">${String}</strong>
            <span class="text-muted small">by ${string} on ${number}/${number}/${number}</span>
          </a>`}
 */
const listItem = (item) => {
  return dompurify.sanitize(`<a class="list-group-item list-group-item-action" href="/post/${item._id}">
            <img class="avatar-sm rounded-circle mr-2" src="${item.author.avatar}" alt="">
            <strong class="d-inline-block mr-2">${item.title}</strong>
            <span class="text-muted small">by ${item.author.username} on ${new Date(item.createdDate).getMonth() + 1}/${new Date(item.createdDate).getDay()}/${new Date(item.createdDate).getFullYear()}</span>
          </a>`)
}

const generateList = (posts) => {
  return activeListItem(posts.length) + posts.map(item => listItem(item)).join('')
}

export default class Search {
  constructor () {
    this.headerSearchIcon = document.querySelector('[data-header-search-icon]')
    this.overlay = document.querySelector('[data-search-overlay]')
    this.closeIcon = document.querySelector('[data-search-close]')
    this.inputField = document.querySelector('#live-search-field')
    this.resultArea = document.querySelector('[data-live-search-results]')
    this.resultList = this.resultArea.querySelector('[data-live-search-results-list]')
    this.loaderIcon = document.querySelector('[data-search-loader]')
    this.typingWaitTime = null
    this.previousValue = ''

    if (this.headerSearchIcon) {
      this.init()
      this.events()
    }
  }

  init () {
    this.overlay.style.transition = '.33s visibility ease-in-out, .33s opacity ease-in-out, .33s transform ease-in-out'
  }

  events () {
    this.headerSearchIcon.addEventListener('click', (event) => {
      event.preventDefault()
      this.openOverlay()
    })

    this.closeIcon.addEventListener('click', (event) => {
      event.preventDefault()
      this.closeOverlay()
    })

    this.inputField.addEventListener('keyup', () => this.keyPressHandler())
  }

  openOverlay () {
    this.overlay.classList.add('search-overlay--visible')

    setTimeout(() => {
      this.inputField.focus()
    }, 50)
  }

  closeOverlay () {
    this.overlay.classList.remove('search-overlay--visible')
  }

  keyPressHandler () {
    let value = this.inputField.value

    if (value != '' && value !== this.previousValue) {
      this.showLoaderIcon()
      this.hideListResult()
      clearTimeout(this.typingWaitTime)
      this.typingWaitTime = setTimeout(() => this.sendRequest(), 750)
    }

    this.previousValue = value
  }

  showLoaderIcon () {
    this.loaderIcon.classList.add('circle-loader--visible')
  }

  hideLoaderIcon () {
    this.loaderIcon.classList.remove('circle-loader--visible')
  }

  showListResult () {
    this.resultArea.classList.add('live-search-results--visible')
  }

  hideListResult () {
    this.resultArea.classList.remove('live-search-results--visible')
  }

  sendRequest () {
    axios.post('/search', { searchTerm: this.inputField.value })
    .then((response) => {
      this.hideLoaderIcon()

      const posts = response.data
      this.resultList.innerHTML = ''

      if (posts && posts.length) {
        this.resultList.insertAdjacentHTML('afterbegin', generateList(posts))
      } else {
        this.resultList.insertAdjacentHTML('afterbegin', '<div class="list-group-item">No search result</div>')
      }

      this.showListResult()
    })
    .catch((e) => {
      console.log(e)
    })
  }
}
