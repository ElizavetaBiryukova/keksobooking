const formMapElement = document.querySelector('.map__filters');
const formAdvertElement = document.querySelector('.ad-form');
const addressElement = document.querySelector('.address');

//Переводит страницу в неактивное состояние
formMapElement.classList.add('map__filters--disabled');
formAdvertElement.classList.add('ad-form--disabled');
formAdvertElement.setAttribute('disabled', 'disabled');
formMapElement.setAttribute('disabled', 'disabled');

export { formMapElement, formAdvertElement, addressElement }
