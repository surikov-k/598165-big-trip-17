import BoardView from '../view/board-view';
import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import EventView from '../view/event-view';
import {render} from '../render';
import EditView from '../view/edit-view';

export default class BoardPresenter {
  view = new BoardView();

  init(container) {
    this.container = container;
    render(this.view, container);
    render(
      new SortView(),
      this.view.getElement().querySelector('.trip-events'));

    const listView = new ListView();


    render(
      listView,
      this.view.getElement().querySelector('.trip-events')
    );

    render(
      new EditView(),
      listView.getElement()
    );

    for (let i = 0; i < 3; i++) {
      render(new EventView(), listView.getElement());
    }
  }
}
