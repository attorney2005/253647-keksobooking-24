import { createListOfAnnouncements } from './data.js';
import { renderAnnouncementCard } from './template.js';
import { initForm, activateForm, setAddress } from './form.js';
import { initMap } from './map.js';

const announcements = createListOfAnnouncements();

// вызов функции инициализации формы
initForm();
// вызов функции инициализации карты
initMap(
  announcements, 
  onMapLoaded, 
  onAddressSet
);
// кол-бэк функция  
function onAddressSet(lat, lng) {
  // вызов функции установки установки координат в инпут 
  setAddress(lat, lng);
}
// функция запуска карты
function onMapLoaded() {
  activateForm();
}
