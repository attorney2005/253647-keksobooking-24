import { renderAnnouncementCard } from './template.js';

const LAT_TOKIO = 35.68172;
const LNG_TOKIO = 139.75392;
const MAIN_PIN_SIZE = 52;
const USER_PIN_SIZE = 40;
const FIXED_NUMBER = 5;

function createMap(loadMapListener) {
  let addressSetListener = () => null;
  const map = createLeafletMap();
  const tileLayer = createTileLayer();
  const mainMarker = createMainMarker();
  const markerGroup = createMarkerGroup();

  markerGroup.addTo(map);
  tileLayer.addTo(map);
  mainMarker.addTo(map);

  // Private methods
  function createLeafletMap() {
    const leafletMap = L.map('map-canvas');
    leafletMap.on('load', () => setTimeout(loadMapListener));
    leafletMap.setView({
      lat: LAT_TOKIO,
      lng: LNG_TOKIO,
    }, 14);
    return leafletMap;
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
      lat: LAT_TOKIO,
      lng: LNG_TOKIO,
    }, {
      draggable: true,
      icon: icon,
    });

    addressSetListener(getLat(marker), getLng(marker));

    // координаты главной метки при переносе главной метки
    marker.on('moveend', (evt) => {
      addressSetListener(getLat(evt.target), getLng(evt.target));
    });

    return marker;
  }

  function getLng(marker) {
    return marker.getLatLng().lng.toFixed(FIXED_NUMBER);
  }

  function getLat(marker) {
    return marker.getLatLng().lat.toFixed(FIXED_NUMBER);
  }

  // Public methods
  function showAnnouncements(announcements) {
    const markers = createMarkers(announcements);
    markers.forEach((marker) => marker.addTo(markerGroup));
  }

  function reset() {
    map.closePopup();
    markerGroup.clearLayers();
    mainMarker.setLatLng({
      lat: LAT_TOKIO,
      lng: LNG_TOKIO,
    });
    map.setView({
      lat: LAT_TOKIO,
      lng: LNG_TOKIO,
    }, 14);
  }

  function setAddressSetListener(callback) {
    addressSetListener = callback;
  }

  return {
    showAnnouncements: showAnnouncements,
    reset: reset,
    setAddressSetListener: setAddressSetListener,
  };
}

export { createMap };
