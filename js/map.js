import { renderAnnouncementCard } from './template.js';

const MAIN_PIN_SIZE = 52;
const USER_PIN_SIZE = 40;
const LOCATION_ACCURACY = 5;
const DEFAULT_ZOOM = 14;
const DEFAULT_LOCATION = {
  lat: 35.68172,
  lng: 139.75392,
};

let addressSetListener = () => null;
let loadListener = () => null;
const map = createLeafletMap();
const tileLayer = createTileLayer();
const mainMarker = createMainMarker();
const markerGroup = createMarkerGroup();

markerGroup.addTo(map);
tileLayer.addTo(map);
mainMarker.addTo(map);

function createLeafletMap() {
  const leafletMap = L.map('map-canvas');
  leafletMap.on('load', onLeafletMapLoaded);
  leafletMap.setView({
    lat: DEFAULT_LOCATION.lat,
    lng: DEFAULT_LOCATION.lng,
  }, DEFAULT_ZOOM);
  return leafletMap;
}

function onLeafletMapLoaded() {
  setTimeout(() => loadListener());
}

function createMarkerGroup() {
  return L.layerGroup();
}

function createMarkers(announcements) {
  return announcements.map((announcement) => {
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
  });
}

function createTileLayer() {
  return L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });
}

function createMainMarker() {
  const icon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
    iconAnchor: [MAIN_PIN_SIZE / 2, MAIN_PIN_SIZE],
  });

  const marker = L.marker({
    lat: DEFAULT_LOCATION.lat,
    lng: DEFAULT_LOCATION.lng,
  }, {
    draggable: true,
    icon: icon,
  });

  addressSetListener(getLat(marker), getLng(marker));

  marker.on('moveend', (evt) => {
    addressSetListener(getLat(evt.target), getLng(evt.target));
  });

  return marker;
}

function getLng(marker) {
  return marker.getLatLng().lng.toFixed(LOCATION_ACCURACY);
}

function getLat(marker) {
  return marker.getLatLng().lat.toFixed(LOCATION_ACCURACY);
}

function showAnnouncements(announcements) {
  const markers = createMarkers(announcements);
  markerGroup.clearLayers();
  markers.forEach((marker) => marker.addTo(markerGroup));
}

function reset() {
  map.closePopup();
  markerGroup.clearLayers();
  mainMarker.setLatLng({
    lat: DEFAULT_LOCATION.lat,
    lng: DEFAULT_LOCATION.lng,
  });
  map.setView({
    lat: DEFAULT_LOCATION.lat,
    lng: DEFAULT_LOCATION.lng,
  }, DEFAULT_ZOOM);
}

function setAddressSetListener(callback) {
  addressSetListener = callback;
}

function setLoadListener(callback) {
  loadListener = callback;
}

const mapComponent = {
  showAnnouncements,
  reset,
  setAddressSetListener,
  setLoadListener
};

export { mapComponent };
