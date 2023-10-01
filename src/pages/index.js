import './index.css';
import {configuration, initialCards} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit');
const addButton = profile.querySelector('.profile__add-button');
const nameInput = document.querySelector('#name-input');
const aboutInput = document.querySelector('#about-input');

const profileInfo = new UserInfo({
  nameSelector: '.profile__name', 
  aboutSelector: '.profile__about'
});

const popupProfileForm = new PopupWithForm('.popup_type_profile', {
  submiter: data => {
    profileInfo.setUserInfo(data);
  }
});

const popupCardForm = new PopupWithForm('.popup_type_card', {
  submiter: data => {
    cardList.renderer(data);
  }
});

const popupWithImage = new PopupWithImage('.popup_type_image');

const cardList = new Section({
  items: initialCards,
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

cardList.renderItems();
vaidateForms(configuration);

editButton.addEventListener('click', () => {
  const userInfo = profileInfo.getUserInfo();
  nameInput.value = userInfo.userName;
  aboutInput.value = userInfo.userAbout;
  popupProfileForm.open()
});
addButton.addEventListener('click', () => {popupCardForm.open()});