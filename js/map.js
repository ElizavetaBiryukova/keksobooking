/* global L:readonly */
import { formMapElement, formAdvertElement, addressElement } from './form.js';
import { NUMBER_OF_SINGS, createCards, OFFER_COUNT } from './data.js';
// import { similarCard } from './popup.js';

//Отрисовывает карту
const map = L.map('map-canvas')
  //Добавляет события на карту: переводит страницу в активное состояние
  .on('load', () => {
    formMapElement.classList.remove('map__filters--disabled');
    formAdvertElement.classList.remove('ad-form--disabled');
    formAdvertElement.removeAttribute('disabled', 'disabled');
    formMapElement.removeAttribute('disabled', 'disabled');

  })
  //Центр карты
  .setView({
    lat: 35.41371,
    lng: 139.41501,
  }, 10); //Масштаб карты

//Добавляет слой изображения на карту
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

//Добавляет главную метку
const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [50, 50],
  iconAnchor: [25, 82],
});

const mainMarker = L.marker(
  {
    lat: 35.41371,
    lng: 139.41501,
  },
  {
    draggable: true, //Передвижение маркера по карте
    icon: mainPinIcon, //Замена штатной иконки на свою
  },
);

mainMarker.addTo(map);


addressElement.value = '35.41371, 139.41501'; //Поле адреса заполнено всегда
addressElement.setAttribute('readonly', ''); //Содержимое поля доступно только для чтения

//Перемещение метки, округление координат до 5 символов после запятой
mainMarker.on('move', (evt) => {
  addressElement.value = `${evt.target.getLatLng().lat.toFixed(NUMBER_OF_SINGS)}, ${evt.target.getLatLng().lng.toFixed(NUMBER_OF_SINGS)}`;
});

//Добавляет обычные метки
// const createMarker = () =>{
// const pinIcon = L.icon({
//   iconUrl: '../img/pin.svg',
//   iconSize: [50, 50],
//   iconAnchor: [25, 50],
// });

// const marker = L.marker(
//   {
//     lat: location.x,
//     lng: location.y,
//   },
//   {
//     icon: pinIcon,
//   },
// );

// marker.addTo(map);

const createMarker = createCards(OFFER_COUNT);

createMarker.forEach((card) => {
  const lat = card.location.x;
  const lng = card.location.y;

  const pinIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [50, 50],
    iconAnchor: [25, 50],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      pinIcon,
    },
  );

  marker
    .addTo(map)
    // .bindPopup(),
});

export { map, mainMarker, createMarker };
