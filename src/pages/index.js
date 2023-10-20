import './index.css';
import {configuration} from '../utils/constants.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
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
let cardToBeDeleted;
const checkLikeStatus = card => {
  const res = card.likes.find(likeItem => {
    return likeItem._id === userId
  })
  return res
}
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

api.getUserInfo()
  .then(info => {
    profileInfo.setUserInfo({name: info.name, about: info.about});
    profileInfo.setAvatar({avatar: info.avatar});
    userId = info._id;
  })
  .catch(error => {
    console.log('getUserInfo error', error)
  });

const popupProfileForm = new PopupWithForm('.popup_type_profile', {
  submiter: data => {
    submitLoading(popupProfileForm, true, 'Сохранить');
    api.setUserInfo({name: data.name, about: data.about})
      .then(info => {
        profileInfo.setUserInfo({name: info.name, about: info.about})
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
        cardList.renderer(card)
      })
      .catch(error => {
        console.log('addCard error', error)
      })
      .finally(() => {submitLoading(popupCardForm, true, 'Создать');})
  }
});
popupCardForm.setEventListeners();

const popupAvatarForm = new PopupWithForm('.popup_type_avatarChange', {
  submiter: data => {
    submitLoading(popupAvatarForm, true, 'Сохранить')
    api.changeAvatar({avatar: data.avatar})
      .then(info => {
        profileInfo.setAvatar({avatar: info.avatar})
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

const popupDeleteConfirm = new Popup('.popup_type_confirm');
popupDeleteConfirm.setEventListeners();
popupDeleteConfirm.popup.querySelector('.popup__button').addEventListener('click', () => {
  api.deleteCard(cardToBeDeleted.id)
    .then(() => {
      cardToBeDeleted.element.remove();
      popupDeleteConfirm.close();
    })
    .catch(error => {
      console.log('deleteCard error', error)
    })
});


const cardList = new Section({
  renderer: item => {
    const card = new Card({
      data: item, 
      handleCardClick: (text, link) => {
        popupWithImage.open(text, link)
      },
      handleDelClick: () => {
        cardToBeDeleted = card;
        popupDeleteConfirm.open();
      },
      handleLikeClick: () => {
        if(checkLikeStatus(card) === undefined) {
          api.likeCard(card.id)
            .then(cardItem => {
              card.like.classList.add('card__like_liked');
              card.setLikeCounter(cardItem.likes);
            })
            .catch(error => {
              console.log('likeCard error', error)
            })
        } else {
          api.unlikeCard(card.id)
            .then(cardItem => {
              card.like.classList.remove('card__like_liked');
              card.setLikeCounter(cardItem.likes);
            })
            .catch(error => {
              console.log('unlikeCard error', error)
            })
        }
      }
    }, '#card-template');
    const cardElement = card.generate();
    if (!(card.ownerId === userId)) {
      cardElement.querySelector('.card__delete').remove()
    }
    if(checkLikeStatus(card) !== undefined) {
      card.like.classList.add('card__like_liked');
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
avaButton.addEventListener('click', () => {
  const userAv = profileInfo.getAvatar();
  avatarInput.value = userAv.avatar;
  popupAvatarForm.open()
});