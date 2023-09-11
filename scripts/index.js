import {Card} from './card.js';
import {closePopup, openPopup} from './utils.js';
import {initialCards} from './cards.js';
import {FormValidator} from './validate.js';

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
const cardSubmit = cardForm.querySelector('.popup__button');

function renderCard(text, link) {
  const card = new Card (text, link, '#card-template');
  placesElement.prepend(card.generate());
}

editButton.addEventListener('click', () => {
  profileForm.reset();
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openPopup(popupProf);
});

popupProf.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupProf);
});

addButton.addEventListener('click', () => {
  cardForm.reset();
  openPopup(popupCard);
});

const disabledButton = (buttonElement, config) => {
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(config.inactiveButtonClass);
};

popupCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard(placeInput.value, linkInput.value);
  closePopup(popupCard);
  disabledButton(cardSubmit, configuration);
})

const enableVaidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement);
    validator.setInputListeners();
  });
}

const setCloseListeners = () => {
  //найти все попапы
  const popupList = Array.from(document.querySelectorAll('.popup'));
  //на каждый повесить слушатель, закрывающий именно этот попап при нажатии на "Esc", кнопку закрытия или оверлей
  popupList.forEach((popupElement) => {
    const closeButton = popupElement.querySelector('.popup__close');
    const popupContainer = popupElement.querySelector('.popup__container');
    popupContainer.addEventListener('click', (evt) => {
      evt.stopPropagation();
    });
    closeButton.addEventListener('click', () => {
      closePopup(popupElement);
    });
    popupElement.addEventListener('click', () => {
      closePopup(popupElement);
    });
  });
};

initialCards.forEach((item)  => {
  renderCard(item.name, item.link);
})

enableVaidation(configuration)

setCloseListeners()