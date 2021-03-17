//Функция, возвращающая случайное целое число из переданного диапазона

const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  } if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Функция, возвращающая случайное число c плавающей точкой из переданного диапазона

const getRandomFloat = (min, max, digit) => {
  if (min < 0 || max < 0) {
    return -1;
  } if (min > max) {
    [min, max] = [max, min];
  }

  return (Math.random() * (max - min) + min).toFixed(digit);
};

//Функция получения случайного элемента массива

const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)]
};

//Функция перемешивания массива

const shuffleArray = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

//Функция склонения существительных
const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  if(num > 10 && (Math.round((num % 100) / 10)) === 1) {
    return genitivePlural;
  } else {
    switch(num % 10) {
      case 1: return nominative;
      case 2:
      case 3:
      case 4: return genitiveSingular;
    }
    return genitivePlural;
  }
};

//Функция устранения дребезга
const debounce = (cb, delay) => {
  let timeout;
  return () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(cb, delay)
  };
};

export {getRandomInteger, getRandomFloat, getRandomArrayElement, shuffleArray, numDecline, debounce};
