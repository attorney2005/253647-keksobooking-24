import { createListOfAnnouncements } from './data.js';
import { initForm, activateForm, deactivateForm, setAddress } from './form.js';
import { initMap } from './map.js';

const announcements = createListOfAnnouncements();

// вызов функции инициализации формы
initForm();
// функция деактивации формы
deactivateForm();
// вызов функции инициализации карты
initMap(
  announcements,
  onMapLoaded,
  onAddressSet,
);
// кол-бэк функция вызываемая когда пользователь выбирает адрес
function onAddressSet(lat, lng) {
  // вызов функции установки установки координат в инпут
  setAddress(lat, lng);
}
// кол-бэк функция запуска карты
function onMapLoaded() {
  activateForm();
}
