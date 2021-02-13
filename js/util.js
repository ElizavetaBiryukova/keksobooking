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

const getTypeHause = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
}

export {getRandomInteger, getRandomFloat, getRandomArrayElement, shuffleArray, getTypeHause};
