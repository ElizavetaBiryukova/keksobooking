import { createOffers } from './data.js';

const mapCanvas = document.querySelector('#map-canvas'); //Блок для вставки похожих элементов
const cardTemplate = document.querySelector('#card').content.querySelector('.popup'); //Находит шаблон для копировнаия
const similarCards = createOffers();
const cardListFragment = document.createDocumentFragment();

//Отрисовка шаблона с данными
similarCards.forEach(({ author, offer }) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  const getTypeHause = (type) => {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'bungalow':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
    }
  };
  cardElement.querySelector('.popup__type').textContent = getTypeHause(offer.type);
  // Для склонения слова "комната" наверно потом будет функция
  let declensionOfRoom = ' комнатa для '
  if (offer.rooms > 1) { declensionOfRoom = ' комнаты для ' }
  if (offer.rooms > 4) { declensionOfRoom = ' комнат для ' }
  let declensionOfGuest = ' гостя '
  if (offer.guests > 1) { declensionOfGuest = ' гостей ' }
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms}` + declensionOfRoom + `${offer.guests}` + declensionOfGuest;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  const featureList = cardElement.querySelector('.popup__features');
  featureList.innerHTML = '';
  for (let i = 0; i < offer.features.length; i++) {
    const featureElement = document.createElement('li');
    const featureClass = `popup__feature--${offer.features[i]}`;
    featureElement.classList.add('popup__feature', featureClass);
    featureList.appendChild(featureElement);
  }
  cardElement.querySelector('.popup__description').textContent = offer.description;
  const photoList = cardElement.querySelector('.popup__photos');
  photoList.innerHTML = '';
  for (let i = 0; i < offer.photos.length; i++) {
    const photoElement = cardTemplate.querySelector('.popup__photo').cloneNode(true);
    photoElement.src = offer.photos[i];
    photoList.appendChild(photoElement);
  }
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  mapCanvas.appendChild(cardElement);
});

mapCanvas.appendChild(cardListFragment);
