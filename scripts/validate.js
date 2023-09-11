export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._submitButton = formElement.querySelector(config.submitButtonSelector);
    this._inputSelector = config.inputSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
  };

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    this._formElement.querySelector(`.${inputElement.id}-error`).textContent = '';
  };

  _showInputError(inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    this._formElement.querySelector(`.${inputElement.id}-error`).textContent = inputElement.validationMessage;
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      _showInputError(inputElement);
    } else {
      _hideInputError(inputElement);
    };
  };

  _enableButton() {
    this._submitButton.removeAttribute('disabled');
    this._submitButton.classList.remove(this._inactiveButtonClass);
  };
  
  _disabledButton() {
    this._submitButton.setAttribute('disabled', true);
    this._submitButton.classList.add(this._inactiveButtonClass);
  };
  
  _toggleButtonState() {
    if (this._formElement.checkValidity()) {
      this._enableButton();
    } else {
      this._disabledButton();
    };
  };

  setInputListeners() {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._formElement.setAttribute('novalidate', true);
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._toggleButtonState();
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState();
        this._checkInputValidity(inputElement);
      });
      this._formElement.addEventListener('reset', () => {
        this._hideInputError(inputElement);
      });
    });
  };
}
