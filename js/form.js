
const form = document.querySelector('.ad-form');
const adFormFieldset = form.querySelectorAll('fieldset');
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const typeSelect = document.querySelector('#type');
const roomsSelect = document.querySelector('#room_number');
const guestsSelect = document.querySelector('#capacity');
const timeOutSelect = document.querySelector('#timeout');
const timeInSelect = document.querySelector('#timein');

const ROOM_0 = '0';
const ROOM_1 = '1';
const ROOM_2 = '2';
const ROOM_3 = '3';
const ROOM_100 = '100';

form.setAttribute('action', 'https://24.javascript.pages.academy/keksobooking');
form.setAttribute('method', 'POST');
form.setAttribute('enctype', 'multipart/form-data');

titleInput.setAttribute('required', true);
titleInput.setAttribute('minlength', '30');
titleInput.setAttribute('maxlength', '100');

priceInput.setAttribute('required', true);
priceInput.setAttribute('number', true);
priceInput.setAttribute('max', '10000');

const typeToMinPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

function setMinPriceForType() {
  const type = typeSelect.value;
  const price = typeToMinPrice[type];
  priceInput.setAttribute('min', price);
  priceInput.setAttribute('placeholder', price);
}

typeSelect.addEventListener('change', setMinPriceForType);
setMinPriceForType();

function disableRoomSelects() {

  for (let i = 0; i < guestsSelect.options.length; i++) {
    guestsSelect.options[i].disabled = true;
  }
}

function roomNumberChangeHandler() {
  disableRoomSelects();
  const choosenValue = roomsSelect.value;

  switch (choosenValue) {

    case ROOM_100:
      for (let i = 0; i < guestsSelect.options.length; i++) {
        if (guestsSelect.options[i].value === ROOM_0) {
          guestsSelect.options[i].disabled = false;
        }
      }
      break;

    case ROOM_1:
      for (let i = 0; i < guestsSelect.options.length; i++) {
        if (guestsSelect.options[i].value === choosenValue) {
          guestsSelect.options[i].disabled = false;
        }
      }
      break;

    case ROOM_2:
      for (let i = 0; i < guestsSelect.options.length; i++) {
        if (guestsSelect.options[i].value === choosenValue || guestsSelect.options[i].value === ROOM_1) {
          guestsSelect.options[i].disabled = false;
        }
      }
      break;

    case ROOM_3:
      for (let i = 0; i < guestsSelect.options.length; i++) {
        if (guestsSelect.options[i].value === choosenValue || guestsSelect.options[i].value === ROOM_2 || guestsSelect.options[i].value === ROOM_1) {
          guestsSelect.options[i].disabled = false;
        }
      }
      break;
  }

  for (let i = 0; i < guestsSelect.options.length; i++) {
    if (!guestsSelect.options[i].disabled) {
      guestsSelect.options[i].selected = true;
      break;
    }
  }
}

roomsSelect.addEventListener('change', roomNumberChangeHandler);

roomNumberChangeHandler();

// Добавление disabled
function setDisabled(collection, value) {
  collection.forEach((item) => {
    item.disabled = value;
  });
}

setDisabled(adFormFieldset, true);

// Перевод в активное состояние
function enableActiveState() {
  form.classList.remove('ad-form--disabled');
}

// Перевод в неактивное состояние
function enableInactiveState() {
  form.classList.add('ad-form--disabled');

  setDisabled(adFormFieldset, true);
}

export {
    enableInactiveState
  };
