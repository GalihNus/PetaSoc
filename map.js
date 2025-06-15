const imageWidth = 1958;
const imageHeight = 768;

// Inisialisasi peta
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2,
  maxZoom: 4,
  zoomSnap: 0.1,
  zoomDelta: 0.5
});

const bounds = [[0, 0], [imageHeight, imageWidth]];

// Menampilkan gambar denah
const image = L.imageOverlay('assets/LT.1Polos.jpg', bounds).addTo(map);
map.fitBounds(bounds);

// Marker lokasi pengguna dan rute
let userMarker = null;
let routeLine = null;

// Daftar tujuan (contoh, koordinat perlu disesuaikan manual)
const destinations = {
  toilet: [700, 1850],
  gate: [400, 1200],
  lounge: [250, 500]
};

function showMyLocation() {
  const x = Math.random() * imageWidth;
  const y = Math.random() * imageHeight;

  if (userMarker) map.removeLayer(userMarker);
  userMarker = L.circleMarker([y, x], {
    radius: 8,
    color: 'red'
  }).addTo(map).bindPopup("Lokasi Anda");

  map.setView([y, x], 1);
}

function showRoute() {
  const selected = document.getElementById("destinationSelect").value;
  if (!selected || !destinations[selected]) {
    alert("Pilih tujuan terlebih dahulu.");
    return;
  }

  if (!userMarker) {
    alert("Tampilkan lokasi Anda terlebih dahulu.");
    return;
  }

  const userLatLng = userMarker.getLatLng();
  const target = destinations[selected];

  if (routeLine) map.removeLayer(routeLine);
  routeLine = L.polyline([userLatLng, target], {
    color: 'blue',
    dashArray: '10, 10'
  }).addTo(map);
}
