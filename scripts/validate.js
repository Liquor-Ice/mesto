//функция сокрытия ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //inputElement.classList.remove('.popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};
//функция проявления ошибки
const showInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //inputElement.classList.add('.popup__input_type_error');
  errorElement.classList.add('popup__input-error_active');
  errorElement.textContent = inputElement.validationMessage;
};

//функция валидации поля, если текущее поле невалидно - показывает спан, если валидно - скрывает
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement);
  } else {
    hideInputError(formElement, inputElement);
  };
};

//функция валидации кнопки проверяет, есть ли в форме невалидные поля и либо отключает кнопку, либо включает
const toggleButtonState = (formElement, buttonElement) => {
  if (formElement.checkValidity()) {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('popup__buttone_disabled');
  } else {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('popup__buttone_disabled');
  };
};

//функция установки валидации полей находит все поля формы и кнопку сабмита
//запускает валидацию кнопки
//вешает на поля слушатель импута (функция валидации кнопки и функция валидации поля)
const setInputListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(formElement, buttonElement);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      toggleButtonState(formElement, buttonElement);
      checkInputValidity(formElement, inputElement);
    });
  });
};

//функция валидации форм ищет все формы
//вешает на каждую слушатель сабмита (отмена действия по умолчанию)
//и запускает для каждой функцию установки валидации полей
const enableVaidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setInputListeners(formElement);
  });
};

//вызываем функцию установки валидации форм
enableVaidation();