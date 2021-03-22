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
  document.addEventListener('keydown', escapeSuccessMessage);
  document.addEventListener('click', closeSuccessMessage);
  main.appendChild(successModalMessage);
};

//Закрытие сообщения об успешном создании клавишей Esc
const escapeSuccessMessage = (evt) => {
  const modalMessage = main.querySelector('.success')
  evt.preventDefault();
  if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
    modalMessage.remove();
  }

  document.removeEventListener('keydown', escapeSuccessMessage);
  document.removeEventListener('click', closeSuccessMessage);
};

//Закрытие сообщения об успешеом создании кликом
const closeSuccessMessage = () => {
  const modalMessage = main.querySelector('.success')
  modalMessage.remove();
  document.removeEventListener('click', closeSuccessMessage);
  document.removeEventListener('keydown', escapeSuccessMessage);
};

//Сообщение об ошибке создания объявления
const createErrorMessage = () => {
  const error = errorMessage.cloneNode(true);
  document.addEventListener('keydown', escapeErrorMessage);
  document.addEventListener('click', closeErrorMessage);
  main.appendChild(error);
};

//Закрытие сообщения c ошибкой клавишей Esc
const escapeErrorMessage = (evt) => {
  const errorModalMessage = main.querySelector('.error')
  evt.preventDefault();
  if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
    errorModalMessage.remove();
  }

  document.removeEventListener('keydown', escapeErrorMessage);
  document.removeEventListener('click', closeErrorMessage);
};

//Закрытие сообщения с ошибкой кликом
const closeErrorMessage = () => {
  const errorModalMessage = main.querySelector('.error')
  errorModalMessage.remove();

  document.removeEventListener('click', closeErrorMessage);
  document.removeEventListener('keydown', escapeErrorMessage);
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

