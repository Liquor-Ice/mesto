export default class Section {
  constructor ({renderer}, containerSelector) {
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  addItem(element) {
    this._container.prepend(element);
  };

  renderItems(items) {
    items.forEach(this.renderer);
  }
};