import { renderAnnouncementCard } from './template.js';

// функция инициализации формы
function initMap(announcements, onLoad, onAddressSet) {
  const map = createMap(onLoad);
  const tileLayer = createTileLayer();
  const mainMarker = createMainMarker(onAddressSet);
  const publishedMarkers = createMarkers(announcements);

  tileLayer.addTo(map);
  mainMarker.addTo(map);
  publishedMarkers.forEach((marker) => marker.addTo(map));
}

// функция создания карты
function createMap(onLoad) {
  return L.map('map-canvas')
    .on('load', () => onLoad())
    .setView({
      lat: 35.68172,
      lng: 139.75392,
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
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const marker = L.marker({
    lat: 35.65862,
    lng: 139.74539,
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
  return marker.getLatLng().lng.toFixed(5);
}

function getLat(marker) {
  return marker.getLatLng().lat.toFixed(5);
}

// функция создания списка меток
function createMarkers(announcements) {
  return announcements.map((announcement) => createMarker(announcement));
}

// функция создания одной метки
function createMarker(announcement) {
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
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
