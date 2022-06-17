import {createElement} from '../render';

const createTemplate = () => `
  <div class="page-body__container">
    <section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
    </section>
  </div>`;

export default class BoardView {
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
