import {initialCards} from './cards.js'

const profile = document.querySelector('.profile');
const placesElement = document.querySelector('.elements');
const templateElement = document.querySelector('#card-template').content.querySelector('.card');

const popupProf = document.querySelector('.popup_type_profile');
const closePP = popupProf.querySelector('.popup__close');
const editButton = profile.querySelector('.profile__edit');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const nameInput = popupProf.querySelector('.popup__input_type_name');
const aboutInput = popupProf.querySelector('.popup__input_type_about');

const popupCard = document.querySelector('.popup_type_card');
const closePC = popupCard.querySelector('.popup__close');
const addButton = profile.querySelector('.profile__add-button');
const placeInput = popupCard.querySelector('.popup__input_type_place');
const linkInput = popupCard.querySelector('.popup__input_type_link');
const cardForm = popupCard.querySelector('.popup__form');

const popupImg = document.querySelector('.popup_type_image');
const closePI = popupImg.querySelector('.popup__close');
const bigImage = popupImg.querySelector('.popup__image');
const imageSubt = popupImg.querySelector('.popup__subtitle');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function createCard(data) {
  const cardElement = templateElement.cloneNode(true);
  const titleElement = cardElement.querySelector('.card__title');
  const imageElement = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like');
  const deleteButton = cardElement.querySelector('.card__delete');

  titleElement.textContent = data.name;
  imageElement.src = data.link;
  imageElement.alt = data.name;

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like_liked');
  });
  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });
  imageElement.addEventListener('click', () => {
    imageSubt.textContent = data.name;
    bigImage.src = data.link;
    bigImage.alt = data.name;
    openPopup(popupImg);
  })

  return cardElement;
}

function renderCard(card) {
  placesElement.prepend(createCard(card));
}

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openPopup(popupProf);
});

closePP.addEventListener('click', () => {
  closePopup(popupProf);
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

closePC.addEventListener('click', () => {
  closePopup(popupCard);
});

popupCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const data = {name: placeInput.value, link: linkInput.value};
  renderCard(data);
  closePopup(popupCard);
})

closePI.addEventListener('click', () => {
  closePopup(popupImg);
});

initialCards.forEach((item)  => {
  renderCard(item);
})
