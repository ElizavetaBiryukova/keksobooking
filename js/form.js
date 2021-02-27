import { TYPES } from './data.js';

const formMapElement = document.querySelector('.map__filters');
const formAdvertElement = document.querySelector('.ad-form');
const fieldsets = document.querySelectorAll('fieldset');
const selectsFilter = formMapElement.querySelectorAll('select');
const addressElement = document.querySelector('#address');
const typeSelect = formAdvertElement.querySelector('#type');
const priceInput = formAdvertElement.querySelector('#price');
const selectTimeIn = formAdvertElement.querySelector('#timein');
const selectTimeOut = formAdvertElement.querySelector('#timeout');

//Выбор опции типа жилья меняет атрибуты минимального значения и плейсхолдера поля «Цена за ночь»
typeSelect.addEventListener('change', () => {
  priceInput.min = TYPES[typeSelect.value].minPrice;
  priceInput.placeholder = TYPES[typeSelect.value].minPrice;
});

//Выбор опции "Время заезда" автоматически изменят значение "Время выезда"
selectTimeIn.addEventListener('change', () => {
  selectTimeOut.value = selectTimeIn.value;
});

selectTimeOut.addEventListener('change', () => {
  selectTimeIn.value = selectTimeOut.value;
});

//Переводит страницу в неактивное и активное состояния
const setDisabledState = (elements) => {
  elements.forEach((element) => {
    element.disabled = !element.disabled;
  });
};

const makesInactiveForm = () => {
  formMapElement.classList.add('map__filters--disabled');
  formAdvertElement.classList.add('ad-form--disabled');

  setDisabledState(fieldsets);
  setDisabledState(selectsFilter);
};

makesInactiveForm();

const makesActiveForm = () => {
  formMapElement.classList.remove('map__filters--disabled');
  formAdvertElement.classList.remove('ad-form--disabled');

  setDisabledState(fieldsets);
  setDisabledState(selectsFilter);
};

export { addressElement, makesActiveForm }
