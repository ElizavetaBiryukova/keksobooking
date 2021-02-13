import { createOffers } from './data.js';
import { getTypeHause } from './util.js'

const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarCards = createOffers();
const cardListFragment = document.createDocumentFragment();

similarCards.forEach(({ author, offer }) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = getTypeHause(offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  // const featureList = cardElement.querySelector('.popup__features');
  // featureList.innerHTML = '';

  cardElement.querySelector('.popup__description').textContent = offer.description;
  // const photoList = cardElement.querySelector('.popup__photos');
  // photoList.innerHTML = '';
  // for (let i = 0; i < offer.photos.length; i++) {
  //
  // }
  cardElement.querySelector('.popup__avatar').src = author.avatar;
});

mapCanvas.appendChild(cardListFragment);
