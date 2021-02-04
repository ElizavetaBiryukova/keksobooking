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


getRandomInteger(5, 48);
getRandomFloat(2.1, 35.2, 8);


// заготовки данных из задания в виде массивов
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
]

// поиск случайного элемента в переданных массивах
const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)]
}

// функция создающая объявление
const createAd = () => {
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomInteger(1, 8) + '.png',
    },

    offer: {
      title: getRandomArrayElement(TITLE),
      // address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.x}}, {{location.y}}.
      // address: (),
      price: getRandomInteger(1200, 1000000),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 10),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      // features Значения не должны повторяться
      features: getRandomArrayElement(FEATURES),
      description: getRandomArrayElement(DESCRIPTION),
      photos: getRandomArrayElement(PHOTOS),
    },

  // location: {
  //     const locationX = getRandomFloat(35.6, 35.7, 5);
  //     const locationY = getRandomFloat(139.7, 139.8, 5);
  //   }
  }
}

createAd();
