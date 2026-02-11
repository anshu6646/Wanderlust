const lng = listingCoords[0];
const lat = listingCoords[1];

const map = L.map('map').setView([lat, lng], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([lat, lng])
  .addTo(map)
  .bindPopup(listingLocation)
  .openPopup();
