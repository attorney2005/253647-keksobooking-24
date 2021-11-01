const form = document.querySelector('.ad-form');
const fieldsets = form.querySelectorAll('fieldset');
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const typeSelect = document.querySelector('#type');
const roomsSelect = document.querySelector('#room_number');
const guestsSelect = document.querySelector('#capacity');
const guestsSelectOptions = guestsSelect.querySelectorAll('option');
const addressSelect = document.querySelector('#address');

const TYPE_TO_MIN_PRICE_MAP = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const ROOMS_TO_GUESTS_MAP = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

function initForm() {
  form.setAttribute('action', 'https://24.javascript.pages.academy/keksobooking');
  form.setAttribute('method', 'POST');
  form.setAttribute('enctype', 'multipart/form-data');
  
  titleInput.setAttribute('required', true);
  titleInput.setAttribute('minlength', '30');
  titleInput.setAttribute('maxlength', '100');
  
  priceInput.setAttribute('required', true);
  priceInput.setAttribute('number', true);
  priceInput.setAttribute('max', '10000');

  typeSelect.addEventListener('change', setMinPrice);
  roomsSelect.addEventListener('change', setGuestsOptions);

  addressSelect.setAttribute('readonly', true)

  setMinPrice(); 
  setGuestsOptions();
  disableForm();
}

function setCoordinates() {

}

function setMinPrice() {
    const type = typeSelect.value;
    const price = TYPE_TO_MIN_PRICE_MAP[type];
    priceInput.setAttribute('min', price);
    priceInput.setAttribute('placeholder', price);
}

function setGuestsOptions() {
  const selectedRoomsOption = roomsSelect.value;
  const availableGuestOptions = ROOMS_TO_GUESTS_MAP[selectedRoomsOption];

  guestsSelectOptions.forEach((option) => {
    if (availableGuestOptions.includes(option.value)) {
      option.disabled = false;
    } else {
      option.disabled = true;
    }
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

function disableForm() {
  form.classList.add('ad-form--disabled');
  disableFieldsets();
}

export {
  disableForm,
  activateForm,
  initForm
};
