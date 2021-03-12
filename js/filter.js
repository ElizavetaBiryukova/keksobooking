import { formMapElement } from './form.js';
import { removeMapMarkers } from './map.js';

const filterType = formMapElement.querySelector('#housing-type');
// const filterPrice = formMapElement.querySelector('#housing-price');
// const filterRooms = formMapElement.querySelector('#housing-rooms');
// const filterGuests = formMapElement.querySelector('#housing-guests');
// const filterFeatures = formMapElement.querySelector('#housing-features');
const NOT_SELECTED = 'any'

// Проверяем тип
const checkedType = (data) => {
  return data.offer.type === filterType.value || filterType.value === NOT_SELECTED;
};

//Возвращает отфильтрованные данные
const getFilters = (data) => {
  return checkedType(data)
};

//Устанавливает фильтр
const setFilterChange = (cb) => {
  formMapElement.addEventListener('change', () => {
    removeMapMarkers();
    cb();
  });
};

export { setFilterChange, getFilters }
