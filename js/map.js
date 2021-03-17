/* global L:readonly */
import { addressElement, makesActiveForm, formMapElement } from './form.js';
import { NUMBER_OF_SINGS, LAT_MAIN_MARKER, LNG_MAIN_MARKER, MARKER_WIDTH, MARKER_HEIGHT, MAP_SCALE, MAIN_PIN_IMAGE, PIN_IMAGE, OFFER_COUNT } from './data.js';
import { similarCard } from './popup.js';
import { filterData } from './filter.js';
import { request } from './fetch.js';
import { showModalError } from './retrieval-data.js';
import { debounce } from './util.js';

let markers = [];
const RERENDER_DELAY = 500;

//Отрисовывает карту
const map = L.map('map-canvas')
  //Добавляет события на карту: переводит страницу в активное состояние
  .on('load', () => {
    makesActiveForm();
  })
  //Центр карты
  .setView({
    lat: LAT_MAIN_MARKER,
    lng: LNG_MAIN_MARKER,
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
    lat: LAT_MAIN_MARKER,
    lng: LNG_MAIN_MARKER,
  },
  {
    draggable: true, //Передвижение маркера по карте
    icon: mainPinIcon, //Замена штатной иконки на свою
  },
);

mainMarker.addTo(map);

addressElement.value = LAT_MAIN_MARKER + ',' + LNG_MAIN_MARKER; //Поле адреса заполнено всегда

//Перемещение метки, округление координат до 5 символов после запятой
mainMarker.on('move', (evt) => {
  addressElement.value = `${evt.target.getLatLng().lat.toFixed(NUMBER_OF_SINGS)}, ${evt.target.getLatLng().lng.toFixed(NUMBER_OF_SINGS)}`;
});

const layerGroup = L.layerGroup().addTo(map);

const removeMapMarkers = () => {
  layerGroup.clearLayers();
}

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
  })
};

const onMapFiltersChange = () => {
  removeMapMarkers()
  filterData(debounce(
    () => createMapIcon(markers),
    RERENDER_DELAY,
  ))
};
// console.log();

const onSuccess = (data) => {
  markers = data.slice(data.slice(0, OFFER_COUNT));
  createMapIcon(markers);
  formMapElement.addEventListener('change', onMapFiltersChange);
};
// console.log(onSuccess);

const onError = () => {
  showModalError('Коничева! Не удалось получить данные c сервера. Попробуйте позже.')
};
// console.log();

request(onSuccess, onError, 'GET')
// console.log(request);

export { mainMarker };
