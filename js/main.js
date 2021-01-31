const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return new Error('Отрицательные значения запрещены');
  } else if (min > max) {
    return new Error('Значение "до" меньшее, чем значение "от"');
  } else if (min === max) {
    return min;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloatNumber = (x, y, numberOfSings = 1) => {
  if (x < 0 || y < 0) {
    return new Error('Отрицательные значения запрещены');
  } else if (x > y) {
    return new Error('Значение "до" меньшее, чем значение "от"');
  } else if (x === y) {
    return x;
  }

  const random = Math.random() * (y - x + 1) + x;
  return random.toFixed(numberOfSings);
};


getRandomNumber(5, 48);
getRandomFloatNumber(2, 35, 8);
