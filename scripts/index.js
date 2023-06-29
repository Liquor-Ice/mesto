const profile = document.querySelector('.profile');

const popupProf = document.querySelector('.popup_type_profile');
const closePP = popupProf.querySelector('.popup__close');
const editButton = profile.querySelector('.profile__edit');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const nameInput = popupProf.querySelector('.popup__input_type_name');
const jobInput = popupProf.querySelector('.popup__input_type_job');

const popupCard = document.querySelector('.popup_type_card');
const closePC = popupCard.querySelector('.popup__close');
const addButton = profile.querySelector('.profile__add-button');
const placeInput = popupCard.querySelector('.popup__input_type_place');
const linkInput = popupCard.querySelector('.popup__input_type_link');

const placesElement = document.querySelector('.elements');
const templateElement = document.querySelector('#card-template').content.querySelector('.card');

const initialCards = [
  {
    name: 'Алтарь маски Жизни',
    link: './images/BIONICLE17.jpg'
  },
  {
    name: 'Храм маски Жизни',
    link: './images/BIONICLE07.jpg'
  },
  {
    name: 'Хранилище Вируса',
    link: './images/BIONICLE18.jpg'
  },
  {
    name: 'Лавовый резервуар',
    link: './images/BIONICLE05.jpg'
  },
  {
    name: 'Озеро протодермиса',
    link: './images/BIONICLE03.jpg'
  },
  {
    name: 'Воя Нуи',
    link: './images/BIONICLE08.jpg'
  }
];

function toggleThis(cont, clas) {
  cont.classList.toggle(clas);
}

function createCard(data) {
  const cardElement = templateElement.cloneNode(true);
  const titleElement = cardElement.querySelector('.card__title');
  const imageElement = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like');
  const deleteButton = cardElement.querySelector('.card__delete');

  likeButton.addEventListener('click', () => {
    toggleThis(likeButton, 'card__like_liked');
  });
  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });
  titleElement.textContent = data.name;
  imageElement.src = data.link;

  placesElement.prepend(cardElement);
}

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  toggleThis(popupProf, 'popup_opened');
});

closePP.addEventListener('click', () => {
  toggleThis(popupProf, 'popup_opened');
});

popupProf.addEventListener('submit', (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  toggleThis(popupProf, 'popup_opened');
});

addButton.addEventListener('click', () => {
  toggleThis(popupCard, 'popup_opened');
});

closePC.addEventListener('click', () => {
  toggleThis(popupCard, 'popup_opened');
});

popupCard.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {name: `${placeInput.value}`, link: `${linkInput.value}`};
  createCard(data);
  toggleThis(popupCard, 'popup_opened');
  placeInput.value = '';
  linkInput.value = '';
})

initialCards.forEach((item)  => {
  createCard(item);
})