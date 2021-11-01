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
  
  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  
  const mainPinMarker = L.marker(
    {
      lat: 35.65862,
      lng: 139.74539,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
    
  mainPinMarker.addTo(map);
  
  mainPinMarker.on('moveend', (evt) => {
    console.log(evt.target.getLatLng());
  });
}


export {
  initMap
};