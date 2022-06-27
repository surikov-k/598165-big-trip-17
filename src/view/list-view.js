import {createElement} from '../render';

const createTemplate = () => '<ul class="trip-events__list"></ul>';

export default class ListView {
  #element = null;

  get template() {
    return createTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
