import { TYPES  } from './data.js';
import { numDecline } from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup'); //Находит шаблон для копировнаия

//Отрисовка шаблона с данными
const similarCard = ({ author: { avatar }, offer: { title, address, price, type, rooms, guests, checkin, checkout, features, photos, description } }) => {
  const cardElement = cardTemplate.cloneNode(true);
  const offerTitle = cardElement.querySelector('.popup__title');
  if (title) {
    offerTitle.textContent = title;
  } else {
    offerTitle.remove();
  }
  const offerAddress = cardElement.querySelector('.popup__text--address');
  if (address) {
    offerAddress.textContent = address;
  } else {
    offerAddress.remove();
  }
  const offerPrice = cardElement.querySelector('.popup__text--price');
  if (price) {
    offerPrice.textContent = `${price} ₽/ночь`;
  } else {
    offerPrice.remove();
  }
  const offerType = cardElement.querySelector('.popup__type');
  if (type) {
    offerType.textContent = TYPES[type].ru;
  } else {
    offerType.remove();
  }
  const offerCapacity = cardElement.querySelector('.popup__text--capacity');
  if (rooms && guests) {
    offerCapacity.textContent = `${rooms} ${numDecline(rooms, 'комната', 'комнаты', 'комнат')} для ${guests} ${numDecline(guests, 'гостя', 'гостей', 'гостей')}`;
  } else {
    offerCapacity.remove();
  }
  const offerTime = cardElement.querySelector('.popup__text--time');
  if (checkin && checkout) {
    offerTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    offerTime.remove();
  }
  const featureList = cardElement.querySelector('.popup__features');
  if (features) {
    featureList.innerHTML = '';
    for (let i = 0; i < features.length; i++) {
      const featureElement = document.createElement('li');
      const featureClass = `popup__feature--${features[i]}`;
      featureElement.classList.add('popup__feature', featureClass);
      featureList.appendChild(featureElement);
    }
  } else {
    featureList.remove();
  }
  const offerDescription = cardElement.querySelector('.popup__description');
  if (description) {
    offerDescription.textContent = description;
  } else {
    offerDescription.remove();
  }
  const photoList = cardElement.querySelector('.popup__photos');
  if (photos) {
    photoList.innerHTML = '';
    for (let i = 0; i < photos.length; i++) {
      const photoElement = cardTemplate.querySelector('.popup__photo').cloneNode(true);
      photoElement.src = photos[i];
      photoList.appendChild(photoElement);
    }
  } else {
    photoList.remove();
  }
  const authorAvatar = cardElement.querySelector('.popup__avatar');
  if (avatar) {
    authorAvatar.src = avatar;
  } else {
    authorAvatar.remove();
  }
  return cardElement;
};

export { similarCard }
