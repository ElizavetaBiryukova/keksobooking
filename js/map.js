/* global L:readonly */
import { addressElement, makesActiveForm } from './form.js';
import { NUMBER_OF_SINGS, TOKYO_LAT, TOKYO_LNG, MARKER_WIDTH, MARKER_HEIGHT, MAP_SCALE, MAIN_PIN_IMAGE, PIN_IMAGE } from './data.js';
import { similarCard } from './popup.js';

//Отрисовывает карту
const map = L.map('map-canvas')
  //Добавляет события на карту: переводит страницу в активное состояние
  .on('load', () => {
    makesActiveForm();
  })
  //Центр карты
  .setView({
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  }, MAP_SCALE); //Масштаб карты

//Добавляет слой изображения на карту
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

//Добавляет главную метку
const mainPinIcon = L.icon({
  iconUrl: MAIN_PIN_IMAGE,
  iconSize: [MARKER_WIDTH, MARKER_HEIGHT],
  iconAnchor: [MARKER_WIDTH / 2, MARKER_HEIGHT],
});

const mainMarker = L.marker(
  {
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  },
  {
    draggable: true, //Передвижение маркера по карте
    icon: mainPinIcon, //Замена штатной иконки на свою
  },
);

mainMarker.addTo(map);

addressElement.value = '35.62605, 139.77081'; //Поле адреса заполнено всегда

//Перемещение метки, округление координат до 5 символов после запятой
mainMarker.on('move', (evt) => {
  addressElement.value = `${evt.target.getLatLng().lat.toFixed(NUMBER_OF_SINGS)}, ${evt.target.getLatLng().lng.toFixed(NUMBER_OF_SINGS)}`;
});

//Добавляет обычные метки
const createMapIcon = (offers) => {
  offers.forEach((card) => {
    const lat = card.location.lat;
    const lng = card.location.lng;

    const pinIcon = L.icon({
      iconUrl: PIN_IMAGE,
      iconSize: [MARKER_WIDTH, MARKER_HEIGHT],
      iconAnchor: [MARKER_WIDTH / 2, MARKER_HEIGHT],
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
};

export {mainMarker, createMapIcon};
