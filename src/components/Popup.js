export default class Popup {
  constructor (popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  };

  open() {
    this.popup.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this.popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose);
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  };

  setEventListeners() {
    this.popup.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  };
};