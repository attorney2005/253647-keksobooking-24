function initMap(onLoad) {
  const map = L.map("map-canvas")
    .on('load', () => onLoad())
    .setView({
      lat: 35.68172,
      lng: 139.75392,
    }, 14);
    
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
}

export {
  initMap
};