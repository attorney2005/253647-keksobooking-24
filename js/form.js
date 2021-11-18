const DEFAULT_LOCATION = {
  lat: 35.68172,
  lng: 139.75392,
};

const typeToMinPriceMap = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const roomsToGuestsMap = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

const defaultGuestForRoomMap = {
  '1': '1',
  '2': '1',
  '3': '1',
  '100': '0',
};

const formElement = document.querySelector('.ad-form');
const fieldsets = formElement.querySelectorAll('fieldset');
const priceInput = document.querySelector('#price');
const typeSelect = document.querySelector('#type');
const roomsSelect = document.querySelector('#room_number');
const guestsSelect = document.querySelector('#capacity');
const guestsSelectOptions = guestsSelect.querySelectorAll('option');
const addressField = document.querySelector('#address');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const resetButton = formElement.querySelector('.ad-form__reset');
let formResetListener = () => null;
let formSubmitListener = () => null;

typeSelect.addEventListener('change', onTypeChange);
roomsSelect.addEventListener('change', onRoomsChange);
resetButton.addEventListener('click', onFormReset);
formElement.addEventListener('submit', onFormSubmit);
timeIn.addEventListener('change', onTimeInChange);
timeOut.addEventListener('change', onTimeOutChange);

setMinPrice();
setGuestsOptions();
setAddress(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng);

function onTypeChange() {
  setMinPrice();
}

function onRoomsChange() {
  setGuestsOptions();
}

function onFormReset(evt) {
  evt.preventDefault();
  clear();
  formResetListener();
}

function onFormSubmit(evt) {
  evt.preventDefault();
  formSubmitListener(new FormData(evt.target));
}

function onTimeInChange() {
  timeOut.value = timeIn.value;
}

function onTimeOutChange() {
  timeIn.value = timeOut.value;
}

function setMinPrice() {
  const type = typeSelect.value;
  const price = typeToMinPriceMap[type];
  priceInput.setAttribute('min', price);
  priceInput.setAttribute('placeholder', price);
}

function setGuestsOptions() {
  const selectedRoomsOption = roomsSelect.value;
  const availableGuestOptions = roomsToGuestsMap[selectedRoomsOption];
  const defaultGuestsOption = defaultGuestForRoomMap[selectedRoomsOption];

  guestsSelectOptions.forEach((option) => {
    option.disabled = !availableGuestOptions.includes(option.value);
    option.selected = option.value === defaultGuestsOption;
  });
}

function disableFieldsets() {
  fieldsets.forEach((fieldset) => fieldset.disabled = true);
}

function activateFieldsets() {
  fieldsets.forEach((fieldset) => fieldset.disabled = false);
}

function activate() {
  formElement.classList.remove('ad-form--disabled');
  activateFieldsets();
}

function deactivate() {
  formElement.classList.add('ad-form--disabled');
  disableFieldsets();
}

function setAddress(lat, lng) {
  addressField.value = `${lat}, ${lng}`;
}

function clear() {
  formElement.reset();
  setGuestsOptions();
  setAddress(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng);
}

function addSubmitListener(callback) {
  formSubmitListener = callback;
}

function addResetListener(callback) {
  formResetListener = callback;
}

const formComponent = {
  activate,
  deactivate,
  setAddress,
  clear,
  addSubmitListener,
  addResetListener
};

export { formComponent };
