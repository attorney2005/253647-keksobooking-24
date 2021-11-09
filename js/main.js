// import { createListOfAnnouncements } from './data.js';
import {
  initForm,
  deactivateForm,
  setAddress,
  setUserFormSubmit
} from './form.js';
import { initMap } from './map.js';

// вызов функции инициализации формы
initForm();
// функция деактивации формы
deactivateForm();
// вызов функции инициализации карты
initMap(
  onAddressSet,
);
// кол-бэк функция вызываемая когда пользователь выбирает адрес
function onAddressSet(lat, lng) {
  // вызов функции установки установки координат в инпут
  setAddress(lat, lng);
}

