const formMapElement = document.querySelector('.map__filters');
const formAdvertElement = document.querySelector('.ad-form');
const fieldsets = document.querySelectorAll('fieldset');
const selectsFilter = formMapElement.querySelectorAll('select');
const addressElement = document.querySelector('#address');

//Переводит страницу в неактивное состояние
const getDisabledElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = true;
  });
};

const makesInactiveForm = () => {
  formMapElement.classList.add('map__filters--disabled');
  formAdvertElement.classList.add('ad-form--disabled');

  getDisabledElements(fieldsets);
  getDisabledElements(selectsFilter);
};

makesInactiveForm();

//Переводит страницу в активное состояние
const getEnabledElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = false;
  });
};

const makesActiveForm = () => {
  formMapElement.classList.remove('map__filters--disabled');
  formAdvertElement.classList.remove('ad-form--disabled');

  getEnabledElements(fieldsets);
  getEnabledElements(selectsFilter);
};

export { addressElement, makesActiveForm }
