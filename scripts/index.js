import Card from './Card.js';
import {initialCards} from './cards.js';
import FormValidator from './FormValidator.js';

const configuration = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error'
};

const profile = document.querySelector('.profile');
const placesElement = document.querySelector('.elements');

const popupProf = document.querySelector('.popup_type_profile');
const editButton = profile.querySelector('.profile__edit');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const nameInput = popupProf.querySelector('.popup__input_type_name');
const aboutInput = popupProf.querySelector('.popup__input_type_about');
const profileForm = popupProf.querySelector('.popup__form');

const popupCard = document.querySelector('.popup_type_card');
const addButton = profile.querySelector('.profile__add-button');
const placeInput = popupCard.querySelector('.popup__input_type_place');
const linkInput = popupCard.querySelector('.popup__input_type_link');
const cardForm = popupCard.querySelector('.popup__form');

const popupImg = document.querySelector('.popup_type_image');
const bigImage = popupImg.querySelector('.popup__image');
const imageSubt = popupImg.querySelector('.popup__subtitle');

let openedPopup;

function escClose(evt) {
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  };
};

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  window.removeEventListener('keydown', escClose);
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  window.addEventListener('keydown', escClose);
  openedPopup = popupElement;
}

function openBigImage(evt) {
  if (evt.target.classList.contains('card__image')) {
    imageSubt.textContent = evt.target.alt;
    bigImage.src = evt.target.src;
    bigImage.alt = evt.target.alt;
    openPopup(popupImg);
  }
}

function renderCard(text, link) {
  const card = new Card (text, link, '#card-template');
  placesElement.prepend(card.generate());
}

function openProfileEditor() {
  profileForm.reset();
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openPopup(popupProf);
}

function submitProfileChange(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupProf);
}

function submitNewCard(evt) {
  evt.preventDefault();
  renderCard(placeInput.value, linkInput.value);
  closePopup(popupCard);
}

editButton.addEventListener('click', openProfileEditor);

popupProf.addEventListener('submit', submitProfileChange);

addButton.addEventListener('click', () => {
  cardForm.reset();
  openPopup(popupCard);
});

popupCard.addEventListener('submit', submitNewCard)

const enableVaidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement);
    validator.enableValidation();
  });
}

document.addEventListener('mouseup', (event) => {
  const targetClassList = event.target.classList;
  if (targetClassList.contains('popup') || targetClassList.contains('popup__close')) {
    closePopup(openedPopup);
  };
});

initialCards.forEach((item)  => {
  renderCard(item.name, item.link);
})

document.addEventListener('click', openBigImage)

enableVaidation(configuration)
