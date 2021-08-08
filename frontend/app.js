import Search from './modules/search';
import Chat from './modules/chat'

new Search()

const chatWrapper = document.querySelector('#chat-wrapper');

if (chatWrapper) {
  new Chat(chatWrapper)
}
