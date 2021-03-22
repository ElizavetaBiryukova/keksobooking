/* global L:readonly */
import { addressInput, makesActiveForm, mapFilters } from './form.js';
import { similarCard } from './popup.js';
import { filterData } from './filter.js';
import { request } from './fetch.js';
import { showModalError } from './error.js';
import { debounce } from './util.js';

let markers = [];
const RERENDER_DELAY = 500;
const OFFER_COUNT = 10;
const NUMBER_OF_SINGS = 5;
const LAT_MAIN_MARKER = 35.62605;
const LNG_MAIN_MARKER = 139.77081;
const MARKER_WIDTH = 52;
const MARKER_HEIGHT = 52;
const MAP_SCALE = 10;
const MAIN_PIN_IMAGE = './img/main-pin.svg';
const PIN_IMAGE = './img/pin.svg';

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

addressInput.value = LAT_MAIN_MARKER + ', ' + LNG_MAIN_MARKER; //Поле адреса заполнено всегда

//Перемещение метки, округление координат до 5 символов после запятой
mainMarker.on('move', (evt) => {
  addressInput.value = `${evt.target.getLatLng().lat.toFixed(NUMBER_OF_SINGS)}, ${evt.target.getLatLng().lng.toFixed(NUMBER_OF_SINGS)}`;
});

const layerGroup = L.layerGroup().addTo(map);

const removeMapMarkers = () => {
  layerGroup.clearLayers();
  map.closePopup();
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
      .addTo(layerGroup)
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
  createMapIcon(filterData(markers.slice()))
};

const onSuccess = (data) => {
  markers = data.slice();
  createMapIcon(markers.slice(0, OFFER_COUNT));
  mapFilters.addEventListener('change', debounce(onMapFiltersChange),RERENDER_DELAY);
};

const onError = () => {
  showModalError('Коничева! Не удалось получить данные c сервера. Попробуйте позже.')
};

request(onSuccess, onError, 'GET')

export { mainMarker, createMapIcon, markers, OFFER_COUNT, LAT_MAIN_MARKER, LNG_MAIN_MARKER };
