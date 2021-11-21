import { DEFAULT_VALUE } from './data.js';

const form = document.querySelector('.map__filters');
const typeSelect = form.querySelector('#housing-type');
const priceSelect = form.querySelector('#housing-price');
const roomsSelect = form.querySelector('#housing-rooms');
const guestsSelect = form.querySelector('#housing-guests');
const featuresSelect = form.querySelector('#housing-features');
const featuresCheckboxes = Array.from(featuresSelect.querySelectorAll('input'));
let state = getDefaultState();
let changeListener = () => null;

typeSelect.addEventListener('change', onTypeChange);
priceSelect.addEventListener('change', onPriceChange);
roomsSelect.addEventListener('change', onRoomsChange);
guestsSelect.addEventListener('change', onGuestsChange);
featuresSelect.addEventListener('change', onFeaturesChange);

function onTypeChange() {
  state.type = typeSelect.value;
  changeListener();
}
function onPriceChange() {
  state.price = priceSelect.value;
  changeListener();
}
function onRoomsChange() {
  state.rooms = roomsSelect.value;
  changeListener();
}
function onGuestsChange() {
  state.guests = guestsSelect.value;
  changeListener();
}
function onFeaturesChange() {
  state.features = featuresCheckboxes
    .filter((checkbox) => checkbox.checked === true)
    .map((checkbox) => checkbox.value);
  changeListener();
}

function getDefaultState() {
  return {
    type: DEFAULT_VALUE,
    price: DEFAULT_VALUE,
    rooms: DEFAULT_VALUE,
    guests: DEFAULT_VALUE,
    features: [],
  };
}

function activate() {
  form.classList.remove('map__filters--disabled');
}

function deactivate() {
  form.classList.add('map__filters--disabled');
}

function setChangeListener(callback) {
  changeListener = callback;
}

function reset() {
  state = getDefaultState();
  form.reset();
  changeListener();
}

function getFilters() {
  return state;
}

const filtersComponent = {
  activate,
  deactivate,
  setChangeListener,
  getFilters,
  reset,
};

export { filtersComponent };
