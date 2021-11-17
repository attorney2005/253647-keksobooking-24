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

function createForm(defaultLocation) {
  const form = document.querySelector('.ad-form');
  const fieldsets = form.querySelectorAll('fieldset');
  const titleInput = document.querySelector('#title');
  const priceInput = document.querySelector('#price');
  const typeSelect = document.querySelector('#type');
  const roomsSelect = document.querySelector('#room_number');
  const guestsSelect = document.querySelector('#capacity');
  const guestsSelectOptions = guestsSelect.querySelectorAll('option');
  const addressField = document.querySelector('#address');
  const timeIn = document.querySelector('#timein');
  const timeOut = document.querySelector('#timeout');
  const resetButton = form.querySelector('.ad-form__reset');
  let formResetListener = () => null;
  let formSubmitListener = () => null;

  typeSelect.addEventListener('change', setMinPrice);
  roomsSelect.addEventListener('change', setGuestsOptions);
  resetButton.addEventListener('click', onFormReset);
  form.addEventListener('submit', onFormSubmit);
  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);

  setMinPrice();
  setGuestsOptions();
  setAddress(defaultLocation.lat, defaultLocation.lng);

  // Test data
  // ======================
  titleInput.value = 'Заполните все обязательные поля, назначьте цену';
  priceInput.value = 4000;
  guestsSelect.value = '1';
  // ======================


  // Private methods
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

  // Public methods
  function activate() {
    form.classList.remove('ad-form--disabled');
    activateFieldsets();
  }

  function deactivate() {
    form.classList.add('ad-form--disabled');
    disableFieldsets();
  }

  function setAddress(lat, lng) {
    addressField.value = `${lat}, ${lng}`;
  }

  function clear() {
    form.reset();
    setAddress(defaultLocation.lat, defaultLocation.lng);
  }

  function addSubmitListener(callback) {
    formSubmitListener = callback;
  }

  function addResetListener(callback) {
    formResetListener = callback;
  }

  return {
    activate: activate,
    deactivate: deactivate,
    setAddress: setAddress,
    clear: clear,
    addSubmitListener: addSubmitListener,
    addResetListener: addResetListener,
  };
}

export { createForm };
