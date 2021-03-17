const OFFER_COUNT = 10;
const PRICE = {
  MIN: 1200,
  MAX: 1000000,
};
const NUMBER_OF_SINGS = 5;
const TYPES = {
  flat: { ru: 'Квартира', minPrice: 1000 },
  bungalow: { ru: 'Бунгало', minPrice: 0 },
  house: { ru: 'Дом', minPrice: 5000 },
  palace: { ru: 'Дворец', minPrice: 10000 },
}
const LAT_MAIN_MARKER = 35.62605;
const LNG_MAIN_MARKER = 139.77081;
const MARKER_WIDTH = 52;
const MARKER_HEIGHT = 52;
const MAP_SCALE = 10;
const MAIN_PIN_IMAGE = './img/main-pin.svg';
const PIN_IMAGE = './img/pin.svg';
const TITLE_LENGTH_FORM = {
  MIN: 30,
  MAX: 100,
}





export { TYPES, NUMBER_OF_SINGS, LAT_MAIN_MARKER,LNG_MAIN_MARKER, MARKER_WIDTH, MARKER_HEIGHT, MAP_SCALE, MAIN_PIN_IMAGE, PIN_IMAGE, PRICE, TITLE_LENGTH_FORM, OFFER_COUNT };
