const form = document.querySelector('.ad-form');
const fieldsets = form.querySelectorAll('fieldset');
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const typeSelect = document.querySelector('#type');
const roomsSelect = document.querySelector('#room_number');
const guestsSelect = document.querySelector('#capacity');
const guestsSelectOptions = guestsSelect.querySelectorAll('option');
const addressField = document.querySelector('#address');

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

function initForm() {
  // form.setAttribute('action', 'https://24.javascript.pages.academy/keksobooking');
  // form.setAttribute('method', 'POST');
  // form.setAttribute('enctype', 'multipart/form-data');

  titleInput.setAttribute('required', true);
  titleInput.setAttribute('minlength', '30');
  titleInput.setAttribute('maxlength', '100');

  priceInput.setAttribute('required', true);
  priceInput.setAttribute('number', true);
  priceInput.setAttribute('max', '10000');

  // addressField.setAttribute('readonly', true);

  typeSelect.addEventListener('change', setMinPrice);
  roomsSelect.addEventListener('change', setGuestsOptions);

  setMinPrice();
  setGuestsOptions();
}

// функция установки установки координат в инпут
function setAddress(lat, lng) {
  addressField.value = `${lat}, ${lng}`;
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

  guestsSelectOptions.forEach((option) => {
    option.disabled = !availableGuestOptions.includes(option.value);
  });
}

function disableFieldsets() {
  fieldsets.forEach((fieldset) => fieldset.disabled = true);
}

function activateFieldsets() {
  fieldsets.forEach((fieldset) => fieldset.disabled = false);
}

function activateForm() {
  form.classList.remove('ad-form--disabled');
  activateFieldsets();
}

function deactivateForm() {
  form.classList.add('ad-form--disabled');
  disableFieldsets();
}

export {
  deactivateForm,
  activateForm,
  initForm,
  setAddress
};
