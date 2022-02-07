import { priceToType } from './popup.js';

const PRICE_MAX = 1000000;
const TitleLengthForm = {
  MIN: 30,
  MAX: 100,
};
const numbersOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};
const mapFilters = document.querySelector('.map__filters');
const form = document.querySelector('.ad-form');
const fieldsets = document.querySelectorAll('fieldset');
const selectsFilter = mapFilters.querySelectorAll('select');
const addressInput = document.querySelector('#address');
const typeSelect = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const timeInSelect = form.querySelector('#timein');
const timeOutSelect = form.querySelector('#timeout');
const titleInput = form.querySelector('#title');
const roomNumber = form.querySelector('#room_number');
const capacitySelect = form.querySelector('#capacity');
const capacityOptions = capacitySelect.querySelectorAll('option');

//Выбор опции типа жилья меняет атрибуты минимального значения и плейсхолдера поля «Цена за ночь»
const onSelectTypeChange = () => {
  priceInput.min = priceToType[typeSelect.value].minPrice;
  priceInput.placeholder = priceToType[typeSelect.value].minPrice;
};

onSelectTypeChange();
typeSelect.addEventListener('change', onSelectTypeChange);

//Выбор опции "Время заезда" автоматически изменят значение "Время выезда"
timeInSelect.addEventListener('change', () => {
  timeOutSelect.value = timeInSelect.value;
});

//Выбор опции "Время выезда" автоматически изменят значение "Время заезда"
timeOutSelect.addEventListener('change', () => {
  timeInSelect.value = timeOutSelect.value;
});

//Переводит страницу в неактивное и активное состояния
const setDisabledState = (elements) => {
  elements.forEach((element) => {
    element.disabled = !element.disabled;
  });
};

const makesInactiveForm = () => {
  mapFilters.classList.add('map__filters--disabled');
  form.classList.add('ad-form--disabled');

  setDisabledState(fieldsets);
  setDisabledState(selectsFilter);
};

makesInactiveForm();

const makesActiveForm = () => {
  mapFilters.classList.remove('map__filters--disabled');
  form.classList.remove('ad-form--disabled');

  setDisabledState(fieldsets);
  setDisabledState(selectsFilter);
};

//Валидация заголовка объявления
titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;
  if (valueLength < TitleLengthForm.MIN) {
    titleInput.setCustomValidity(`Введите ещё ${TitleLengthForm.MIN - valueLength} симв.`)
  } else if (valueLength > TitleLengthForm.MAX) {
    titleInput.setCustomValidity(`Удалите лишние ${valueLength - TitleLengthForm.MAX} симв.`)
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});


//Валидация поля "Цена за ночь"
priceInput.addEventListener('input', () => {
  const priceValue = priceInput.value.length;

  if (priceValue > PRICE_MAX) {
    priceInput.setCustomValidity(`Цена должна быть меньше ${PRICE_MAX}`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

//Валидация полей количество комнат и количество мест
const validateRooms = () => {
  const roomValue = roomNumber.value;

  capacityOptions.forEach(function (option) {

    let isDisabled = !(numbersOfGuests[roomValue].indexOf(option.value) >= 0);
    option.selected = numbersOfGuests[roomValue][0] === option.value;
    option.disabled = isDisabled;
    option.hidden = isDisabled;
  });
};

const onRoomsNumberChange = () => {
  validateRooms();
};

roomNumber.addEventListener('change', onRoomsNumberChange);
validateRooms();


export { addressInput, makesActiveForm, form, mapFilters, onSelectTypeChange };
