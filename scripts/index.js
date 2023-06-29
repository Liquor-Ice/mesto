const profile = document.querySelector('.profile'); 
const popup = document.querySelector('.popup');
const editButton = profile.querySelector('.profile__edit');
const closeButton = popup.querySelector('.popup__close');
const profileName = profile.querySelector('.profile__name');
const job = profile.querySelector('.profile__job');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_job');

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

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = job.textContent;
  togglePopup();
});

closeButton.addEventListener('click', togglePopup);

popup.addEventListener('submit', function (e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  job.textContent = jobInput.value;
  togglePopup();
});

function createCard(data) {
  const cardElement = templateElement.cloneNode(true);
  const titleElement = cardElement.querySelector('.card__title');
  const imageElement = cardElement.querySelector('.card__image');

  titleElement.textContent = data.name;
  imageElement.src = data.link;

  placesElement.prepend(cardElement);
}

initialCards.forEach((item)  => {
  createCard(item);
})