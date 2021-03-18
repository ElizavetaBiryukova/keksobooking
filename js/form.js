import { TYPES, Price, TitleLengthForm } from './data.js';

const formMapElement = document.querySelector('.map__filters');
const formAdvertElement = document.querySelector('.ad-form');
const fieldsets = document.querySelectorAll('fieldset');
const selectsFilter = formMapElement.querySelectorAll('select');
const addressElement = document.querySelector('#address');
const typeSelect = formAdvertElement.querySelector('#type');
const priceInput = formAdvertElement.querySelector('#price');
const selectTimeIn = formAdvertElement.querySelector('#timein');
const selectTimeOut = formAdvertElement.querySelector('#timeout');
const titleInput = formAdvertElement.querySelector('#title');
const roomNumber = formAdvertElement.querySelector('#room_number');
const capacitySelect = formAdvertElement.querySelector('#capacity');
const capacityOptions = capacitySelect.querySelectorAll('option');
const numberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

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

  if (priceValue > Price.MAX) {
    priceInput.setCustomValidity(`Цена должна быть меньше ${Price.MAX}`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

//Валидация полей количество комнат и количество мест
const validateRooms = () => {
  const roomValue = roomNumber.value;

  capacityOptions.forEach(function (option) {

    let isDisabled = !(numberOfGuests[roomValue].indexOf(option.value) >= 0);
    option.selected = numberOfGuests[roomValue][0] === option.value;
    option.disabled = isDisabled;
    option.hidden = isDisabled;
  });
};

const onRoomsNumberChange = () => {
  validateRooms();
};

roomNumber.addEventListener('change', onRoomsNumberChange);
validateRooms();


export { addressElement, makesActiveForm, formAdvertElement, formMapElement };
