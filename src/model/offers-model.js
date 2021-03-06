export default class OffersModel {
  #offers = null;

  constructor(offers) {
    this.#offers = offers;
  }

  getOffers(point) {
    const offersIds = point.offers;
    const typeOffers = this.getOffersByType(point.type);

    if (!typeOffers) {
      return [];
    }

    return typeOffers.reduce((acc, offer) => {
      if (offersIds.includes(offer.id)) {
        acc.push(offer);
      }
      return acc;
    }, []);
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers;
  }
}
