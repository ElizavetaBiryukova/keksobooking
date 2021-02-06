'use strict';

const OFFERS_COUNT = 10;

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

const TITLE = [
  'Отель в Токио',
  'Отель в Киото',
  'Отель в Хиросиме',
  'Отель в Осаке',
  'Отель в Саппоро',
];

const TYPE = [
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

const DESCRIPTION = [
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

const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  } if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, digit) => {
  if (min < 0 || max < 0) {
    return -1;
  } if (min > max) {
    [min, max] = [max, min];
  }

  return (Math.floor(Math.random() * (max - min + min)) + min).toFixed(digit);
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)]
};

const shuffleArray = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const createOffers = () => {
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomInteger(AVATAR.MIN, AVATAR.MAX) + '.png',
    },

    offer: {
      title: getRandomArrayElement(TITLE),
      address: getRandomInteger(ADDRESS.MIN, ADDRESS.MAX) + ', ' + getRandomInteger(ADDRESS.MIN, ADDRESS.MAX),
      price: getRandomInteger(PRICE.MIN, PRICE.MAX),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomInteger(ROOMS.MIN, ROOMS.MAX),
      guests: getRandomInteger(GUESTS.MIN, GUESTS.MAX),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: shuffleArray(FEATURES).slice(0, getRandomInteger(1, FEATURES.length)),
      description: getRandomArrayElement(DESCRIPTION),
      photos: getRandomArrayElement(PHOTOS),
    },

    location: {
      x: getRandomFloat(LOCATION_X.MIN, LOCATION_X.MAX, NUMBER_OF_SINGS),
      y: getRandomFloat(LOCATION_Y.MIN, LOCATION_Y.MAX, NUMBER_OF_SINGS),
    },
  }
}

const similarOffers = new Array(OFFERS_COUNT).fill(null).map(() => createOffers());

similarOffers();
