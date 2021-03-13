import './data.js'
import './util.js'
import './popup.js'
import './form.js'
import './map.js'
import './fetch.js'
import './submitting-form.js'
import { createMapIcon } from './map.js'
import { getData } from './fetch.js';
import './filter.js'
import { setFilterChange } from './filter.js';
import { debounce } from './util.js'

const RERENDER_DELAY = 500;

getData((offers) => {
  createMapIcon(offers);
  setFilterChange(debounce(
    () => createMapIcon(offers),
    RERENDER_DELAY,
  ));
});
