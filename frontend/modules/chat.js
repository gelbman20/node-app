import dompurify from 'dompurify'

export default class Chat {
  /**
   *
   * @param {HTMLElement} chatWrapper
   */
  constructor(chatWrapper) {
    this.openedYet = false
    this.chatWrapper = chatWrapper
    this.openIcon = document.querySelector('[data-header-chat-icon]')
    this.injectHTML()
    this.chatLog = document.querySelector('#chat')
    this.chatField = document.querySelector('#chatField')
    this.chatForm = document.querySelector('#chatForm')
    this.closeIcon = document.querySelector('.chat-title-bar-close')
    this.events()
  }

  // Events
  events () {
    this.openIcon.addEventListener('click', () => this.showChat())
    this.closeIcon.addEventListener('click', () => this.hideChat())

    this.chatForm.addEventListener('submit', (e) => {
      e.preventDefault()

      this.sendMessageToServer()
    })
  }

  sendMessageToServer () {
    this.socket.emit('chatMessageFromBrowser', {
      message: this.chatField.value
    })
    this.chatLog.insertAdjacentHTML('beforeend', dompurify.sanitize(`
      <div class="chat-self">
        <div class="chat-message">
            <div class="chat-message-inner">
                ${this.chatField.value}
            </div>
        </div>
        <img src="${this.user.avatar}" alt="${this.user.username}" class="chat-avatar avatar-xs rounded-circle">
      </div>    
    `))
    this.chatLog.scrollTop = this.chatLog.scrollHeight
    this.chatField.value = ''
    this.chatField.focus()
  }

  // Methods
  showChat () {
    if (!this.openedYet) {
      this.openConnection()
    }

    this.openedYet = true
    this.chatWrapper.classList.add('chat--visible')
    this.chatField.focus()
  }

  hideChat () {
    this.chatWrapper.classList.remove('chat--visible')
  }

  openConnection () {
    this.socket = io()
    this.socket.on('welcome', (data) => {
      this.user = data.user
    })

    this.socket.on('chatMessageFromServer', (data) => {
      this.displayMessageFromServer(data)
    })
  }

  /**
   *
   * @param {Object} data
   * @param {String} data.message
   * @param {Object} data.user
   * @param {String} data.user.avatar
   * @param {String} data.user.email
   * @param {String} data.user.username
   * @param {String} data.user._id
   */
  displayMessageFromServer (data) {
    this.chatLog.insertAdjacentHTML('beforeend', dompurify.sanitize(`
    <div class="chat-other">
      <a href="/profile/${data.user.username}">
          <img class="avatar avatar-xs rounded-circle" src="${data.user.avatar}" alt="${data.user.username}">
      </a>
      <div class="chat-message">
        <div class="chat-message-inner">
          <a href="#">
              <strong>
                  ${data.user.username}
              </strong>
          </a>
            ${data.message}
        </div>
      </div>
    </div>
    `))
    this.chatLog.scrollTop = this.chatLog.scrollHeight
  }

  injectHTML () {
    this.chatWrapper.innerHTML = `
    <div class="chat-title-bar">Chat 
      <span class="chat-title-bar-close"><i class="fe fe-x-circle"></i></span>
    </div>
      <div id="chat" class="chat-log"></div>
    
      <form id="chatForm" class="chat-form border-top">
        <input type="text" class="chat-field" id="chatField" placeholder="Type a message…" autocomplete="off">
      </form>`
  }
}
