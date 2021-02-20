/* global L:readonly */
import { formMapElement, formAdvertElement, addressElement } from './form.js';
import { NUMBER_OF_SINGS, createOffers, tokyoLat, tokyoLng, markerWidth, markerHeight, mapScale } from './data.js';
import { similarCard } from './popup.js';

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
    lat: tokyoLat,
    lng: tokyoLng,
  }, mapScale); //Масштаб карты

//Добавляет слой изображения на карту
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

//Добавляет главную метку
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [markerWidth, markerHeight],
  iconAnchor: [markerWidth / 2, markerHeight],
});

const mainMarker = L.marker(
  {
    lat: tokyoLat,
    lng: tokyoLng,
  },
  {
    draggable: true, //Передвижение маркера по карте
    icon: mainPinIcon, //Замена штатной иконки на свою
  },
);

mainMarker.addTo(map);


addressElement.value = '35.62605, 139.77081'; //Поле адреса заполнено всегда
addressElement.setAttribute('readonly', ''); //Содержимое поля доступно только для чтения

//Перемещение метки, округление координат до 5 символов после запятой
mainMarker.on('move', (evt) => {
  addressElement.value = `${evt.target.getLatLng().lat.toFixed(NUMBER_OF_SINGS)}, ${evt.target.getLatLng().lng.toFixed(NUMBER_OF_SINGS)}`;
});

//Добавляет обычные метки
createOffers().forEach((card) => {
  const lat = card.location.x;
  const lng = card.location.y;

  const pinIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [markerWidth, markerHeight],
    iconAnchor: [markerWidth / 2, markerHeight],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: pinIcon,
    },
  );

  marker
    .addTo(map)
    .bindPopup( //Добавляет балуны
      similarCard(card),
      {
        keepInView: true, //Балуны не появляются вне видимой области
      },
    );
});
