import axios from 'axios';

export default class Search {
  constructor () {
    this.headerSearchIcon = document.querySelector('[data-header-search-icon]')
    this.overlay = document.querySelector('[data-search-overlay]')
    this.closeIcon = document.querySelector('[data-search-close]')
    this.inputField = document.querySelector('#live-search-field')
    this.resultArea = document.querySelector('[data-live-search-results]')
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
      clearTimeout(this.typingWaitTime)
      this.showLoaderIcon()
      this.typingWaitTime = setTimeout(() => this.sendRequest(), 750)
    }

    this.previousValue = value
  }

  showLoaderIcon () {
    this.loaderIcon.classList.add('circle-loader--visible')
  }

  sendRequest () {
    axios.post('/search', { searchTerm: this.inputField.value })
    .then(() => {

    })
    .catch((e) => {
      console.log(e)
    })
  }
}
