async function geocodeLocation(place) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "wanderlust-app"
      }
    });

    const data = await response.json();

    if (!data.length) return null;

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon)
    };

  } catch (err) {
    console.error("Geocoding failed:", err.message);
    return null;
  }
}

module.exports = geocodeLocation;
