export const configuration = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error'
};

//функция сокрытия ошибки
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //inputElement.classList.remove('.popup__input_type_error');
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
};
//функция проявления ошибки
const showInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //inputElement.classList.add('.popup__input_type_error');
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

//функция валидации поля, если текущее поле невалидно - показывает спан, если валидно - скрывает
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
  } else {
    hideInputError(formElement, inputElement, config);
  };
};

//функция валидации кнопки проверяет, есть ли в форме невалидные поля и либо отключает кнопку, либо включает
const enableButton = (buttonElement, config) => {
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(config.inactiveButtonClass);
};

export const disabledButton = (buttonElement, config) => {
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(config.inactiveButtonClass);
};

const toggleButtonState = (formElement, buttonElement, config) => {
  if (formElement.checkValidity()) {
    enableButton(buttonElement, config);
  } else {
    disabledButton(buttonElement, config);
  };
};

//функция установки валидации полей находит все поля формы и кнопку сабмита
//запускает валидацию кнопки
//вешает на поля слушатель импута (функция валидации кнопки и функция валидации поля)
const setInputListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(formElement, buttonElement, config);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      toggleButtonState(formElement, buttonElement, config);
      checkInputValidity(formElement, inputElement, config);
    });
    formElement.addEventListener('reset', () => {
      hideInputError(formElement, inputElement, config);
    });
  });
};

//функция валидации форм ищет все формы
//вешает на каждую слушатель сабмита (отмена действия по умолчанию)
//и запускает для каждой функцию установки валидации полей
const enableVaidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    formElement.setAttribute('novalidate', true);
    setInputListeners(formElement, config);
  });
};

//вызываем функцию установки валидации форм
enableVaidation(configuration);