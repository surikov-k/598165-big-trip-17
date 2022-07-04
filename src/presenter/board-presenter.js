import BoardView from '../view/board-view';
import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import PointView from '../view/point-view';
import {render} from '../render';
import EditView from '../view/edit-view';
import NoPointsView from '../view/no-points-view';

export default class BoardPresenter {
  #view = new BoardView();
  #pointsModel = null;
  #points = null;
  #offersModel = null;
  #listView = null;

  init(container, pointsModel, offersModel) {
    this.container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;

    this.#points = [...this.#pointsModel.points];
    this.#points = [];

    render(this.#view, this.container);
    render(
      new SortView(),
      this.#view.element.querySelector('.trip-events'));

    if (!this.#points.length) {
      render(new NoPointsView(), this.#view.element.querySelector('.trip-events'));
    } else {

      this.#listView = new ListView();

      render(
        this.#listView,
        this.#view.element.querySelector('.trip-events')
      );

      this.#points.forEach((point) => {
        this.#renderPoint(point);
      });
    }
  }


  #renderPoint(point) {

    const typeOffers = this.#offersModel.getOffersByType(point.type);
    const pointOffers = this.#offersModel.getOffers(point);

    const pointView = new PointView(point, pointOffers);
    const pointEditView = new EditView(point, typeOffers);

    const replacePointToForm = () => {
      this.#listView.element
        .replaceChild(pointEditView.element, pointView.element);
    };

    const replaceFormToPoint = () => {
      this.#listView.element
        .replaceChild(pointView.element, pointEditView.element);
    };

    const openEditView = () => {
      replacePointToForm();
      window.addEventListener('keydown', handleKeyDown);
    };

    const closeEditView = () => {
      replaceFormToPoint();
      window.removeEventListener('keydown', handleKeyDown);
    };

    function handleKeyDown(evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeEditView();
      }
    }

    pointView.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', () => {
        openEditView();
      });

    pointEditView.element
      .querySelector('form')
      .addEventListener('submit', (evt) => {
        evt.preventDefault();
        closeEditView();
      });

    pointEditView.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', () => {
        closeEditView();
      });

    render(pointView, this.#listView.element);
  }
}
