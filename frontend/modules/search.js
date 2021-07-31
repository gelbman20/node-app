export default class Search {
  constructor () {
    this.headerSearchIcon = document.querySelector('[data-header-search-icon]')
    this.overlay = document.querySelector('[data-search-overlay]')
    this.closeIcon = document.querySelector('[data-search-close]')

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
  }

  openOverlay () {
    this.overlay.classList.add('search-overlay--visible')
  }

  closeOverlay () {
    this.overlay.classList.remove('search-overlay--visible')
  }
}
