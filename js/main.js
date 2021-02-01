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
