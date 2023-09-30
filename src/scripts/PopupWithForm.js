import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submiter}) {
    super(popupSelector);
    this._submiter = submiter;
    this._form = document.querySelector(popupSelector).querySelector('.popup__form')
  };

  _getInputValues() {
    this.inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this.valuesList = this.inputList.map(item => {
      return item.value;
    });

    const data = {
      name: this.valuesList[0],
      link: this.valuesList[1]
    };
    return data;
  };

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