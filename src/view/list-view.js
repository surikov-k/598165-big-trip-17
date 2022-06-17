import {createElement} from '../render';

const createTemplate = () => `<ul class="trip-events__list"></ul>`;

export default class ListView {
  getTemplate() {
    return createTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
