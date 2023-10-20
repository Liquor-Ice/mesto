import './index.css';
import {configuration} from '../utils/constants.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit');
const addButton = profile.querySelector('.profile__add-button');
const avaButton = profile.querySelector('.profile__avatar-container')
const nameInput = document.querySelector('#name-input');
const aboutInput = document.querySelector('#about-input');
const avatarInput = document.querySelector('#avatar-input');

let userId;
const submitLoading = (form, isLoading, message) => {
  if(isLoading) {
    form.button.textContent = 'Сохранение...'
  } else {
    form.button.textContent = message
  }
}

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

const popupProfileForm = new PopupWithForm('.popup_type_profile', {
  submiter: data => {
    submitLoading(popupProfileForm, true, 'Сохранить');
    api.setUserInfo({name: data.name, about: data.about})
      .then(info => {
        profileInfo.setUserInfo({name: info.name, about: info.about});
        popupProfileForm.close();
      })
      .catch(error => {
        console.log('setUserInfo error', error)
      })
      .finally(() => {submitLoading(popupProfileForm, false, 'Сохранить')})
  }
});
popupProfileForm.setEventListeners();

const popupCardForm = new PopupWithForm('.popup_type_card', {
  submiter: data => {
    submitLoading(popupCardForm, true, 'Создать');
    api.addCard({name: data.name, link: data.link})
      .then(card => {
        cardList.renderer(card);
        popupCardForm.close();
      })
      .catch(error => {
        console.log('addCard error', error)
      })
      .finally(() => {submitLoading(popupCardForm, false, 'Создать');})
  }
});
popupCardForm.setEventListeners();

const popupAvatarForm = new PopupWithForm('.popup_type_avatarChange', {
  submiter: data => {
    submitLoading(popupAvatarForm, true, 'Сохранить')
    api.changeAvatar({avatar: data.avatar})
      .then(info => {
        profileInfo.setAvatar({avatar: info.avatar});
        popupAvatarForm.close();
      })
      .catch(error => {
        console.log('changeAvatar error', error)
      })
      .finally(() => {submitLoading(popupAvatarForm, false, 'Сохранить')})
  }
});
popupAvatarForm.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const popupDeleteConfirm = new PopupWithConfirmation('.popup_type_confirm', {
  submiter: card => {
    api.deleteCard(card.id)
      .then(() => {
        card.removeCard();
        popupDeleteConfirm.close();
      })
      .catch(error => {
        console.log('deleteCard error', error)
      })
  }
});
popupDeleteConfirm.setEventListeners();

const cardList = new Section({
  renderer: item => {
    const card = new Card({
      data: item, 
      handleCardClick: (text, link) => {
        popupWithImage.open(text, link)
      },
      handleDelClick: () => {
        popupDeleteConfirm.open(card);
      },
      handleLikeClick: () => {
        if(card.checkLikeStatus(userId) === undefined) {
          api.likeCard(card.id)
            .then(cardItem => {
              card.setLike(cardItem);
            })
            .catch(error => {
              console.log('likeCard error', error)
            })
        } else {
          api.unlikeCard(card.id)
            .then(cardItem => {
              card.setLike(cardItem);
            })
            .catch(error => {
              console.log('unlikeCard error', error)
            })
        }
      }
    }, '#card-template');
    const cardElement = card.generate();
    if (!(card.ownerId === userId)) {
      card.trashRemove();
    }
    if(card.checkLikeStatus(userId) !== undefined) {
      card.setLikeStatus();
    }
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
vaidateForms(configuration);

editButton.addEventListener('click', () => {
  const userInfo = profileInfo.getUserInfo();
  nameInput.value = userInfo.name;
  aboutInput.value = userInfo.about;
  popupProfileForm.open()
});
addButton.addEventListener('click', () => {popupCardForm.open()});
avaButton.addEventListener('click', () => {
  popupAvatarForm.open()
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([info, cards]) => {
    profileInfo.setUserInfo({name: info.name, about: info.about});
    profileInfo.setAvatar({avatar: info.avatar});
    userId = info._id;
    cardList.renderItems(cards)
  })
  .catch(error => {
    console.log('Error', error)
  })