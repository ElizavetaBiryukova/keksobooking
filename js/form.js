import { TYPES, PRICE, TITLE_LENGTH_FORM } from './data.js';

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
  if (valueLength < TITLE_LENGTH_FORM.MIN) {
    titleInput.setCustomValidity(`Введите ещё ${TITLE_LENGTH_FORM.MIN - valueLength} симв.`)
  } else if (valueLength > TITLE_LENGTH_FORM.MAX) {
    titleInput.setCustomValidity(`Удалите лишние ${valueLength - TITLE_LENGTH_FORM.MAX} симв.`)
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});


//Валидация поля "Цена за ночь"
priceInput.addEventListener('input', () => {
  const priceValue = priceInput.value.length;

  if (priceValue > PRICE.MAX) {
    priceInput.setCustomValidity(`Цена должна быть меньше ${PRICE.MAX}`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

//Валидация полей количество комнат и количество мест
const numberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const validateRooms = () => {
  const roomValue = roomNumber.value;

  capacityOptions.forEach(function (option) {
    //Находит неподходящее число гостей для количества комнат.
    //При выборе комнат метод indexOf возвращает индекс элементов, соответствующий значениям количесва гостей.
    //Если индекс не получается найти, тогда indexOf возвращает -1.
    //Нам нужно ,что бы значение всегда определялось, т.е. индекс был найден, поэтому находим индексы, которые >=0
    //Теперь мы получаем булевые значения.
    //Наши найденные гости будут true. Индексы, которые не удалось найти false.
    //Дальше для скрытия неподходящих значений, инвертируем булевые с помощью !
    //Например. Выбираем в поле ввода значение "2 комнаты",
    //indexOF вернет для одного гостя индекс 0, для двух гостей индекс 1, для трех и "без гостей" вернет индекс -1, тк не найдет их в массиве
    //Индексы найденных гостей >=0, поэтому для одного и двух гостей присваивается true, для трех  и "без гостей" false
    //Меняем значения на противоположенные. Трем гостям и "без гостей" теперь присвоено значение true и мы их можем заблокировать и скрыть из списка

    let isDisabled = !(numberOfGuests[roomValue].indexOf(option.value) >= 0 );
    option.selected = numberOfGuests[roomValue] [0] === option.value;
    option.disabled = isDisabled;
    option.hidden = isDisabled;
  });
};

const onRoomsNumberChange = () => {
  validateRooms();
};

roomNumber.addEventListener('change', onRoomsNumberChange);
validateRooms();

export { addressElement, makesActiveForm }
