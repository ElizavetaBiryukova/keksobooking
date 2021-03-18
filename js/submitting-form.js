// import { sendData } from './fetch.js';
import { mainMarker } from './map.js';
import { formAdvertElement, formMapElement } from './form.js';
import { LAT_MAIN_MARKER, LNG_MAIN_MARKER } from './data.js';
import { request } from './fetch.js';

const resetForm = formAdvertElement.querySelector('.ad-form__reset');
const successMessage = document.querySelector('#success').content;
const errorMessage = document.querySelector('#error').content;
const main = document.querySelector('main');
const escape = 'Escape';

//Кнопка сброса формы
resetForm.addEventListener('click', (evt) => {
  evt.preventDefault();
  formAdvertElement.reset();
  formMapElement.reset();
  mainMarker.setLatLng([LAT_MAIN_MARKER, LNG_MAIN_MARKER]);
});

//Возвращение формы в исходное состояние при успешной отправке
const returnResetForm = () => {
  createSuccessMessage();
  formAdvertElement.reset();
  formMapElement.reset();
  mainMarker.setLatLng([LAT_MAIN_MARKER, LNG_MAIN_MARKER]);
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
  if (evt.key === escape) {
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
  if (evt.key === escape) {
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

// const onSuccess = () => {
//   returnResetForm();
// };

// const onError = () => {
//   createErrorMessage();
// };

// Обработчик отправки формы
const setOfferFormSubmit = (onSuccess, onError) => {

  formAdvertElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    request(() => onSuccess(),() => onError(), formAdvertElement.method.toUpperCase(), new FormData(formAdvertElement))
  });
};

setOfferFormSubmit(returnResetForm, createErrorMessage);
