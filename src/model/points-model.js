export default class PointsModel {
  #points = null;

  constructor(points) {
    this.#points = points;
  }

  getPoints() {
    return this.#points;
  }
}
