import Card from './Card.js';
import initialCards from './cards.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';

const configuration = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error'
};

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit');
const addButton = profile.querySelector('.profile__add-button');

const profileInfo = new UserInfo({
  nameSelector: '.profile__name', 
  aboutSelector: '.profile__about'
});

const popupProfileForm = new PopupWithForm('.popup_type_profile', {
  submiter: (data) => {
    profileInfo.setUserInfo(data);
  }
});

const popupCardForm = new PopupWithForm('.popup_type_card', {
  submiter: (data) => {
    cardList.renderer(data);
  }
});

const popupWithImage = new PopupWithImage('.popup_type_image');

const cardList = new Section({
  items: initialCards,
  renderer: item => {
    const card = new Card({
      data: item, 
      handleCardClick: (evt) => {
        popupWithImage.open(evt)
      }
    }, '#card-template');
    const cardElement = card.generate();
    cardList.addItem(cardElement)
  }
}, '.elements')

const vaidateForms = (config) => {
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
  popupProfileForm.open()
});
addButton.addEventListener('click', () => {popupCardForm.open()});