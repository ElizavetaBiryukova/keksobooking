import { mainMarker, createMapIcon, markers, LAT_MAIN_MARKER, LNG_MAIN_MARKER } from './map.js';
import { form, mapFilters, onSelectTypeChange } from './form.js';
import { request } from './fetch.js';
import { resetPreviews } from './photo.js';

const Keys = { ESCAPE: 'Escape', ESC: 'Esc' };
const resetForm = form.querySelector('.ad-form__reset');
const successMessage = document.querySelector('#success').content;
const errorMessage = document.querySelector('#error').content;
const main = document.querySelector('main');


//Кнопка сброса формы
resetForm.addEventListener('click', (evt) => {
  evt.preventDefault();
  form.reset();
  createMapIcon(markers);
  mapFilters.reset();
  mainMarker.setLatLng([LAT_MAIN_MARKER, LNG_MAIN_MARKER]);
  onSelectTypeChange();
  resetPreviews();
});

//Возвращение формы в исходное состояние при успешной отправке
const returnResetForm = () => {
  createSuccessMessage();
  form.reset();
  createMapIcon(markers);
  mapFilters.reset();
  mainMarker.setLatLng([LAT_MAIN_MARKER, LNG_MAIN_MARKER]);
  resetPreviews();
  onSelectTypeChange();
};

//Сообщение об успешном создании объявления
const createSuccessMessage = () => {
  const successModalMessage = successMessage.cloneNode(true);
  document.addEventListener('keydown', escapeSuccessMessageHandler);
  document.addEventListener('click', closeSuccessMessageHandler);
  main.appendChild(successModalMessage);
};

//Закрытие сообщения об успешном создании клавишей Esc
const escapeSuccessMessageHandler = (evt) => {
  const modalMessage = main.querySelector('.success')
  evt.preventDefault();
  if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
    modalMessage.remove();
  }

  document.removeEventListener('keydown', escapeSuccessMessageHandler);
  document.removeEventListener('click', closeSuccessMessageHandler);
};

//Закрытие сообщения об успешеом создании кликом
const closeSuccessMessageHandler = () => {
  const modalMessage = main.querySelector('.success')
  modalMessage.remove();
  document.removeEventListener('click', closeSuccessMessageHandler);
  document.removeEventListener('keydown', escapeSuccessMessageHandler);
};

//Сообщение об ошибке создания объявления
const createErrorMessage = () => {
  const error = errorMessage.cloneNode(true);
  document.addEventListener('keydown', escapeErrorMessageHandler);
  document.addEventListener('click', closeErrorMessageHandler);
  main.appendChild(error);
};

//Закрытие сообщения c ошибкой клавишей Esc
const escapeErrorMessageHandler = (evt) => {
  const errorModalMessage = main.querySelector('.error')
  evt.preventDefault();
  if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
    errorModalMessage.remove();
  }

  document.removeEventListener('keydown', escapeErrorMessageHandler);
  document.removeEventListener('click', closeErrorMessageHandler);
};

//Закрытие сообщения с ошибкой кликом
const closeErrorMessageHandler = () => {
  const errorModalMessage = main.querySelector('.error')
  errorModalMessage.remove();

  document.removeEventListener('click', closeErrorMessageHandler);
  document.removeEventListener('keydown', escapeErrorMessageHandler);
};

const onSuccess = () => {
  returnResetForm();
};

const onError = () => {
  createErrorMessage();
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  request(onSuccess, onError, form.method.toUpperCase(), new FormData(form))
});

