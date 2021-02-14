import { getRandomInteger, getRandomFloat, getRandomArrayElement, shuffleArray} from './util.js';

const OFFER_COUNT = 1;

const AVATAR = {
  MIN: 1,
  MAX: 8,
};

const ADDRESS = {
  MIN: 1,
  MAX: 600,
};

const PRICE = {
  MIN: 1200,
  MAX: 1000000,
};

const ROOMS = {
  MIN: 1,
  MAX: 5,
};

const GUESTS = {
  MIN: 1,
  MAX: 10,
};

const LOCATION_X = {
  MIN: 35.65,
  MAX: 35.7,
};

const LOCATION_Y = {
  MIN: 139.7,
  MAX: 139.8,
};

const NUMBER_OF_SINGS = 5;

const TITLES = [
  'Отель в Токио',
  'Отель в Киото',
  'Отель в Хиросиме',
  'Отель в Осаке',
  'Отель в Саппоро',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Номер повышенной комфортности',
  'Стандартный однокомнатнный номер',
  'Однокомнатный номер категории студия c мини-кухней',
  'Отдельные апартаменты с собственной кухней',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const createOffer = () => {
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomInteger(AVATAR.MIN, AVATAR.MAX) + '.png',
    },

    offer: {
      title: getRandomArrayElement(TITLES),
      address: getRandomInteger(ADDRESS.MIN, ADDRESS.MAX) + ', ' + getRandomInteger(ADDRESS.MIN, ADDRESS.MAX),
      price: getRandomInteger(PRICE.MIN, PRICE.MAX),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(ROOMS.MIN, ROOMS.MAX),
      guests: getRandomInteger(GUESTS.MIN, GUESTS.MAX),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: shuffleArray(FEATURES).slice(0, getRandomInteger(1, FEATURES.length)),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: shuffleArray(PHOTOS).slice(0, getRandomInteger(1, PHOTOS.length)),
    },

    location: {
      x: getRandomFloat(LOCATION_X.MIN, LOCATION_X.MAX, NUMBER_OF_SINGS),
      y: getRandomFloat(LOCATION_Y.MIN, LOCATION_Y.MAX, NUMBER_OF_SINGS),
    },
  }
}

const createOffers = () =>  new Array(OFFER_COUNT).fill(null).map(() => createOffer());

export {createOffers};
