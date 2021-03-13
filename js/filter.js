import { formMapElement } from './form.js';
import { removeMapMarkers } from './map.js';

const filterType = formMapElement.querySelector('#housing-type');
const filterPrice = formMapElement.querySelector('#housing-price');
const filterRooms = formMapElement.querySelector('#housing-rooms');
const filterGuests = formMapElement.querySelector('#housing-guests');
const filterFeatures = formMapElement.querySelector('#housing-features');
const NOT_SELECTED = 'any';
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const HIGH_PRICE_VALUE = 'high'
const LOW_PRICE_VALUE = 'low'
const MIDDLE_PRICE_VALUE = 'middle'


// Проверяем тип
const checkedType = (data) => {
  return data.offer.type === filterType.value || filterType.value === NOT_SELECTED;
};

//Проверяем цены
const checkPrice = (data) => {
  switch (filterPrice.value) {
    case LOW_PRICE_VALUE:
      return data.offer.price < MIN_PRICE;
    case MIDDLE_PRICE_VALUE:
      return data.offer.price >= MIN_PRICE && data.offer.price <= MAX_PRICE;
    case HIGH_PRICE_VALUE:
      return data.offer.price > MAX_PRICE;
    case NOT_SELECTED:
      return true;
  }
};

//Проверяем колличество комнат
const checkRooms = (data) => {
  return data.offer.rooms === Number(filterRooms.value) || filterRooms.value === NOT_SELECTED;
};

//Проверяем гостей
const checkGuests = (data) => {
  return data.offer.guests === Number(filterGuests.value) || filterGuests.value === NOT_SELECTED;
};

//Проверяет дополнительные условия
const checkFeatures = (data) => {
  const checkedFeatures = filterFeatures.querySelectorAll('input:checked');

  if (checkedFeatures.length === 0) {
    return true;
  }

  for (let feature of checkedFeatures) {
    if (!data.offer.features.includes(feature.value)) {
      return false;
    }
  }

  return true;
};

//Возвращает отфильтрованные данные
const getFilters = (data) => {
  return checkedType(data) && checkPrice(data) && checkRooms(data) && checkGuests(data) && checkFeatures(data)
};

//Устанавливает фильтр
const setFilterChange = (cb) => {
  formMapElement.addEventListener('change', () => {
    removeMapMarkers();
    cb();
  });
};

export { setFilterChange, getFilters }
