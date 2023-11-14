function showMap() {
  var locationInput = document.getElementById("inputLocation").value;
  if (!locationInput) locationInput = "BCIT burnaby, canada";

  mapboxgl.accessToken =
    "pk.eyJ1IjoiYWRhbWNoZW4zIiwiYSI6ImNsMGZyNWRtZzB2angzanBjcHVkNTQ2YncifQ.fTdfEXaQ70WoIFLZ2QaRmQ";

  const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
  mapboxClient.geocoding
    .forwardGeocode({
      query: locationInput,
      autocomplete: false,
      limit: 1,
    })
    .send()
    .then((response) => {
      if (
        !response ||
        !response.body ||
        !response.body.features ||
        !response.body.features.length
      ) {
        console.error("Invalid response:");
        console.error(response);
        return;
      }
      const feature = response.body.features[0];

      const map = new mapboxgl.Map({
        container: "map",
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: "mapbox://styles/mapbox/streets-v12",
        center: feature.center,
        zoom: 14,
      });

      document.getElementById("latitude").value = feature.center[0];
      document.getElementById("longitude").value = feature.center[1];

      // Create a marker and add it to the map.
      new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
    });
}
showMap();
