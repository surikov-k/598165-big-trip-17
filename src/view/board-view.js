import {createElement} from '../render';

const createTemplate = () => `
  <div class="page-body__container">
    <section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
    </section>
  </div>`;

export default class BoardView {
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
