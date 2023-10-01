import imgLink1 from '../images/BIONICLE17.jpg';
import imgLink2 from '../images/BIONICLE07.jpg';
import imgLink3 from '../images/BIONICLE18.jpg';
import imgLink4 from '../images/BIONICLE05.jpg';
import imgLink5 from '../images/BIONICLE03.jpg';
import imgLink6 from '../images/BIONICLE08.jpg';

const configuration = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error'
};

const initialCards = [
  {
    name: 'Алтарь маски Жизни',
    link: imgLink1
  },
  {
    name: 'Храм маски Жизни',
    link: imgLink2
  },
  {
    name: 'Хранилище Вируса',
    link: imgLink3
  },
  {
    name: 'Лавовый резервуар',
    link: imgLink4
  },
  {
    name: 'Озеро протодермиса',
    link: imgLink5
  },
  {
    name: 'Воя Нуи',
    link: imgLink6
  }
];

export {configuration, initialCards};