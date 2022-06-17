import BoardPresenter from './presenter/board-presenter';
import FilterView from './view/filter-view.js';
import {render} from './render';


const pageMain = document.querySelector('.page-main');
const filterContainer = document.querySelector('.trip-controls__filters')

const boardPresenter = new BoardPresenter();


render(new FilterView(), filterContainer);

boardPresenter.init(pageMain);
