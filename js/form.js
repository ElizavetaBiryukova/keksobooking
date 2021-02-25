const formMapElement = document.querySelector('.map__filters');
const formAdvertElement = document.querySelector('.ad-form');
const fieldsets = document.querySelectorAll('fieldset');
const selectsFilter = formMapElement.querySelectorAll('select');
const addressElement = document.querySelector('#address');

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
