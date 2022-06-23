import BoardPresenter from './presenter/board-presenter';
import FilterView from './view/filter-view.js';
import {render} from './render';
import {generatePoint} from './mock/point';
import {offers} from './mock/offer';

import PointsModel from './model/points-model';
import OffersModel from './model/offers-model';

const points = Array.from({length: 5}, generatePoint);
const pointsModel = new PointsModel(points);
const offersModel = new OffersModel(offers);

const pageMain = document.querySelector('.page-main');
const filterContainer = document.querySelector('.trip-controls__filters');

const boardPresenter = new BoardPresenter();


render(new FilterView(), filterContainer);

boardPresenter.init(pageMain, pointsModel, offersModel);


