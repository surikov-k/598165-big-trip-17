import {createElement} from '../render.js';

function createTemplate() {
  return '<p class="trip-events__msg">Click New PointView to create your first point</p>';
}

export default class NoPointsView {
  #element = null;

  get element() {

    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createTemplate();
  }

  removeElement() {
   this.#element = null;
  }
}
