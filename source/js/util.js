//Функция склонения существительных
const getNumberDecline = (number, nominative, genitiveSingular, genitivePlural) => {
  if (number > 10 && (Math.round((number % 100) / 10)) === 1) {
    return genitivePlural;
  } else {
    switch (number % 10) {
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
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(cb, delay)
  }
};

export { getNumberDecline, debounce };
