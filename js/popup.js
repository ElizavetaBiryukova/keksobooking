import { createOffers, TYPE_HOUSE } from './data.js';

const mapCanvas = document.querySelector('#map-canvas'); //Блок для вставки похожих элементов
const cardTemplate = document.querySelector('#card').content.querySelector('.popup'); //Находит шаблон для копировнаия
// const similarCard = createOffers();
// const cardListFragment = document.createDocumentFragment();

//Отрисовка шаблона с данными
const similarCard = ({ author: { avatar }, offer: { title, address, price, type, rooms, guests, checkin, checkout, features, photos, description } }) => {
  // const similarCards = ({ author, offer }) => {
  const cardElement = cardTemplate.cloneNode(true);
  // const { title, address, price, type, rooms, guests, checkin, checkout } = card.offer;
  // const { avatar } = card.author;
  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = TYPE_HOUSE[type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} + гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  const featureList = cardElement.querySelector('.popup__features');
  featureList.innerHTML = '';
  for (let i = 0; i < features.length; i++) {
    const featureElement = document.createElement('li');
    const featureClass = `popup__feature--${features[i]}`;
    featureElement.classList.add('popup__feature', featureClass);
    featureList.appendChild(featureElement);
  }
  cardElement.querySelector('.popup__description').textContent = description;
  const photoList = cardElement.querySelector('.popup__photos');
  photoList.innerHTML = '';
  for (let i = 0; i < photos.length; i++) {
    const photoElement = cardTemplate.querySelector('.popup__photo').cloneNode(true);
    photoElement.src = photos[i];
    photoList.appendChild(photoElement);
  }
  cardElement.querySelector('.popup__avatar').src = avatar;
  mapCanvas.appendChild(cardElement);

};

similarCard(createOffers[0]);

