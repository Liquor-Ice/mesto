import {Card} from './Card.js';
import {initialCards} from './cards.js';
import {FormValidator} from './FormValidator.js';

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

const popupImg = document.querySelector('.popup_type_image');
const bigImage = popupImg.querySelector('.popup__image');
const imageSubt = popupImg.querySelector('.popup__subtitle');

function escClose(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
};

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  window.removeEventListener('keydown', escClose);
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  window.addEventListener('keydown', escClose);
}

function openBigImage() {
  if (event.target.classList.contains('card__image')) {
    imageSubt.textContent = event.target.alt;
    bigImage.src = event.target.src;
    bigImage.alt = event.target.alt;
    openPopup(popupImg);
  }
}

function renderCard(text, link) {
  const card = new Card (text, link, '#card-template');
  placesElement.prepend(card.generate());
}

editButton.addEventListener('click', () => {
  popupProf.querySelector('.popup__form').reset();
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
  popupCard.querySelector('.popup__form').reset();
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
    validator.enableValidation();
  });
}

const setCloseListeners = () => {
  //найти все попапы
  const popupList = Array.from(document.querySelectorAll('.popup'));
  //на каждый повесить слушатель, закрывающий именно этот попап при нажатии на "Esc", кнопку закрытия или оверлей
  popupList.forEach((popup) => { // итерируем массив. объявляя каждый попап в переменную popup
    popup.addEventListener('mouseup', (event) => { // на каждый попап устанавливаем слушателя события
      const targetClassList = event.target.classList; // запишем в переменную класс элемента, на котором произошло событие
      if (targetClassList.contains('popup') || targetClassList.contains('popup__close')) { // проверяем наличие класса попапа ИЛИ кнопки закрытия
        closePopup(popup); // если один из классов присутствует, то закрываем попап
      };
    });
  });
}

initialCards.forEach((item)  => {
  renderCard(item.name, item.link);
})

document.addEventListener('click', openBigImage)

enableVaidation(configuration)

setCloseListeners()