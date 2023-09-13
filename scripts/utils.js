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

export {popupImg, bigImage, imageSubt, openPopup, closePopup, escClose, openBigImage}