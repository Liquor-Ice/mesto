import './index.css';
import {configuration} from '../utils/constants.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

// Токен: fc86c855-ca05-4f2c-87da-a37a1fb394c0
// Идентификатор группы: cohort-77"

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit');
const addButton = profile.querySelector('.profile__add-button');
const nameInput = document.querySelector('#name-input');
const aboutInput = document.querySelector('#about-input');

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-77',
  headers: {
    authorization: 'fc86c855-ca05-4f2c-87da-a37a1fb394c0',
    'Content-Type': 'application/json'
  }
})

const profileInfo = new UserInfo({
  nameSelector: '.profile__name', 
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar'
});

api.getUserInfo()
  .then(info => {
    profileInfo.setUserInfo({name: info.name, about: info.about})
  })
  .catch(error => {
    console.log('getUserInfo error', error)
  });

const popupProfileForm = new PopupWithForm('.popup_type_profile', {
  submiter: data => {
    api.setUserInfo({name: data.name, about: data.about})
      .then(info => {
        profileInfo.setUserInfo({name: info.name, about: info.about})
      })
      .catch(error => {
        console.log('setUserInfo error', error)
      })
  }
});

const popupCardForm = new PopupWithForm('.popup_type_card', {
  submiter: data => {
    api.addCard({name: data.name, link: data.link})
      .then(card => {
        cardList.renderer(card)
      })
      .catch(error => {
        console.log('addCard error', error)
      })
  }
});

const popupWithImage = new PopupWithImage('.popup_type_image');

const cardList = new Section({
  renderer: item => {
    const card = new Card({
      data: item, 
      handleCardClick: (text, link) => {
        popupWithImage.open(text, link)
      } 
    }, '#card-template');
    const cardElement = card.generate();
    cardList.addItem(cardElement)
  }
}, '.elements')

const vaidateForms = config => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement);
    validator.enableValidation();
  });
};

popupProfileForm.setEventListeners();
popupCardForm.setEventListeners();
popupWithImage.setEventListeners();

api.getInitialCards()
  .then(cards => {
    cardList.renderItems(cards)
  })
  .catch(error => {
    console.log('getInitialCards error', error)
  });
vaidateForms(configuration);

editButton.addEventListener('click', () => {
  const userInfo = profileInfo.getUserInfo();
  nameInput.value = userInfo.name;
  aboutInput.value = userInfo.about;
  popupProfileForm.open()
});
addButton.addEventListener('click', () => {popupCardForm.open()});

// fetch('https://mesto.nomoreparties.co/v1/cohort-77/cards', {
//   method: 'GET',
//   headers: {
//     authorization: 'fc86c855-ca05-4f2c-87da-a37a1fb394c0'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });