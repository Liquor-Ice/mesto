import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submiter}) {
    super(popupSelector);
    this._submiter = submiter;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  };

  _getInputValues() {
    const values = {};
    this._inputList.forEach(input => {
      values[input.getAttribute('name')] = input.value;
    });
    return values;
  }

  close() {
    super.close();
    this._form.reset();
  };

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      const data = this._getInputValues()
      this._submiter(data);
      this.close();
    });
  };
};