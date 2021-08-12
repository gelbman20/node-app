import Search from './modules/search';
import Chat from './modules/chat'
import RegistrationForm from './modules/registrationForm';

new Search()

const chatWrapper = document.querySelector('#chat-wrapper');
const registrationForm = document.querySelector('#registration-form');

if (chatWrapper) {
  new Chat(chatWrapper)
}

if (registrationForm) {
  new RegistrationForm(registrationForm)
}
