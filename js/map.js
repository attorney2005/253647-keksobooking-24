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
  return L.map("map-canvas")
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
// координаты главной метки по умолчанию
  const coordinates = Object.values(marker.getLatLng());
  const lat = coordinates[0].toFixed(5);
  const lng = coordinates[1].toFixed(5);
  onAddressSet(lat, lng);

  // координаты главной метки при переносе главной метки
  marker.on('moveend', (evt) => {
    const coordinates = Object.values(evt.target.getLatLng());
    const lat = coordinates[0].toFixed(5);
    const lng = coordinates[1].toFixed(5);
    onAddressSet(lat, lng);
  });

  return marker;
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

  marker.bindPopup(announcement.offer.title);

  return marker;
}


export {
  initMap
};