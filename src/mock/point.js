import {getId, getRandomFromArray, getRandomInteger, getUniqueRandomFromArray} from '../utils';
import {offers} from './offer';

const MIN_PRICE_ORDER = 3;
const MAX_PRICE_ORDER = 11;

const offersTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const destinationNames = ['Valencia', 'Frankfurt', 'Berlin', 'Den Haag', 'Tokio', 'Oslo', 'Barcelona', 'Saint Petersburg', 'Monaco', 'Copenhagen', 'Geneva', 'Munich', 'Nagasaki', 'Moscow',];

const destinationDescriptionParts = ['a perfect place to stay with a family', 'a true asian pearl', 'famous for its crowded street markets with the best street food in Asia', 'for those who value comfort and coziness', 'full of of cozy canteens where you can try the best coffee in the Middle East', 'in a middle of Europe', 'is a beautiful city', 'middle-eastern paradise', 'with a beautiful old town', 'with an embankment of a mighty river as a centre of attraction', 'with crowded streets'];

const pictureDescriptionParts = [
  'biggest supermarket',
  'central station',
  'city centre',
  'embankment',
  'kindergarten',
  'park',
  'parliament building',
  'street market',
  'zoo',
];


const generatePrice = () => {
  const order = getRandomInteger(MIN_PRICE_ORDER, MAX_PRICE_ORDER);
  return order * 100;
};

const descriptionPart = getUniqueRandomFromArray(destinationDescriptionParts);
const id = getId();


const generateDestinationDescription = (name) => `${name}, ${Array
  .from({
    length: getRandomInteger(2, 5)
  }, () => descriptionPart.next().value).join(', ')}.`;

const genertatePictures = (destinationName) => {
  return Array.from({length: getRandomInteger(0, 5)}, () => ({
    src: `http://picsum.photos/300/200?r=${Math.random()}`,
    description: `${destinationName} ${getRandomFromArray(pictureDescriptionParts)}`
  }));
};

const generateDestination = () => ({
  name: getRandomFromArray(destinationNames),

  get description() {
    return generateDestinationDescription(this.name);
  },

  get pictures() {
    return genertatePictures(this.name);
  }

});

const ONE_HOUR = 60 * 60 * 1000;
const FIVE_HOURS = 5 * ONE_HOUR;

function* generateDate() {
  let now = new Date();
  while (true) {
    const next = new Date(now.getTime() + getRandomInteger(ONE_HOUR, FIVE_HOURS));
    now = next;
    yield next;
  }
};

const date = generateDate();

const getOffers = (type) => {
  const offer = offers.find((it) => it.type === type);
  if (!offer) {
    return [];
  }
  const idx1 = getRandomInteger(0, offer.offers.length);
  const idx2 = getRandomInteger(0, offer.offers.length);

  return offer.offers
    .slice(
      Math.min(idx1, idx2),
      Math.max(idx1, idx2))
    .map((it) => it.id);
};

export const generatePoint = () => ({
  basePrice: generatePrice(),
  dateFrom: date.next().value,
  dateTo: date.next().value,
  destination: generateDestination(),
  id: id.next().value.toString(),
  isFavorite: Boolean(getRandomInteger()),
  get offers() {
    return getOffers(this.type);
  },
  type: getRandomFromArray(offersTypes)
});
