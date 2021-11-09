import { renderAnnouncementCard } from './template.js';
import { activateForm } from './form.js';
import { getData } from './api.js';


const LAT_TOKIO = 35.68172;
const LNG_TOKIO = 139.75392;
const MAIN_PIN_SIZE = 52;
const USER_PIN_SIZE = 40;
const FIXED_NUMBER = 5;

let announcements = [];

// кол-бэк функция запуска карты
function onMapLoaded() {
  // активация формы
  activateForm();
  // получение запроса с сервера
  getData((data) => {
    announcements = data.slice();
    // создание отдельного слоя на карте через группу layers
    const markerGroup = L.layerGroup().addTo(map);

    const renderMarkers = (announcements) => {
      markerGroup.clearLayers();
      announcements.forEach((announcement) => {
        const { lat, lng } = announcement.location;
        const icon = L.icon({
          iconUrl: 'img/pin.svg',
          iconSize: [USER_PIN_SIZE, USER_PIN_SIZE],
          iconAnchor: [USER_PIN_SIZE / 2, USER_PIN_SIZE],
        });

        const marker = L.marker(
          {
            lat,
            lng,
          },
          {
            icon: icon,
          },
        );
        marker
          .addTo(markerGroup)
          .bindPopup(renderAnnouncementCard(announcements));
      });
    };
  });
}

// функция инициализации формы
function initMap(onAddressSet) {
  const map = createMap();
  const tileLayer = createTileLayer();
  const mainMarker = createMainMarker(onAddressSet);
  const publishedMarkers = createMarkers(announcements);

  tileLayer.addTo(map);
  mainMarker.addTo(map);
  publishedMarkers.forEach((marker) => marker.addTo(map));
}

// функция создания карты
function createMap() {
  return L.map('map-canvas')
    .on('load', () => onMapLoaded())
    .setView({
      lat: LAT_TOKIO,
      lng: LNG_TOKIO,
    }, 14);
}

// функция создания слоя карты
function createTileLayer() {
  return L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });
}

// функция создания главной метки
function createMainMarker(onAddressSet) {
  const icon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
    iconAnchor: [MAIN_PIN_SIZE / 2, MAIN_PIN_SIZE],
  });

  const marker = L.marker({
    lat: LAT_TOKIO,
    lng: LNG_TOKIO,
  }, {
    draggable: true,
    icon: icon,
  });

  onAddressSet(getLat(marker), getLng(marker));

  // координаты главной метки при переносе главной метки
  marker.on('moveend', (evt) => {
    onAddressSet(getLat(evt.target), getLng(evt.target));
  });

  return marker;
}

// функции поолучения координат
function getLng(marker) {
  return marker.getLatLng().lng.toFixed(FIXED_NUMBER);
}

function getLat(marker) {
  return marker.getLatLng().lat.toFixed(FIXED_NUMBER);
}

// функция создания списка меток
function createMarkers(announcements) {
  return announcements.map((announcement) => createMarker(announcement));
}

// функция создания одной метки
function createMarker(announcement) {
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [USER_PIN_SIZE, USER_PIN_SIZE],
    iconAnchor: [USER_PIN_SIZE / 2, USER_PIN_SIZE],
  });

  const marker = L.marker({
    lat: announcement.location.lat,
    lng: announcement.location.lng,
  }, {
    icon: icon,
  });

  marker.bindPopup(renderAnnouncementCard(announcement));

  return marker;
}

export {
  initMap
};
