import BoardView from '../view/board-view';
import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import EventView from '../view/event-view';
import {render} from '../render';
import EditView from '../view/edit-view';

export default class BoardPresenter {
  view = new BoardView();
  #pointsModel = null;
  #points = null;
  #offersModel = null;

  init(container, pointsModel, offersModel) {
    this.container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;

    this.#points = [...this.#pointsModel.getPoints()];

    render(this.view, container);
    render(
      new SortView(),
      this.view.getElement().querySelector('.trip-events'));

    const listView = new ListView();

    render(
      listView,
      this.view.getElement().querySelector('.trip-events')
    );

    const editPoint = this.#points[0];
    const typeOffers = this.#offersModel.getOffersByType(editPoint.type);
    render(
      new EditView(editPoint, typeOffers),
      listView.getElement()
    );

    for (let i = 1; i < 5; i++) {
      const pointOffers = this.#offersModel.getOffers(this.#points[i]);
      render(new EventView(this.#points[i], pointOffers), listView.getElement());
    }
  }
}
