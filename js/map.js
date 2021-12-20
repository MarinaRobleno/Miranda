function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: { lat: 40.2085, lng: -3.713 },
  });
  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });
  // Create an array of alphabetical characters used to label the markers.
  // Add some markers to the map.
  const svgMarker = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "#bead8e",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };
  const markers = locations.map((place) => {
    const marker = new google.maps.Marker({
      position: place.location,
      icon: svgMarker,
      title: place.name
    });

    // markers can only be keyboard focusable when they have click listeners
    // open info window when marker is clicked
    marker.addListener("click", () => {
      infoWindow.setContent(place.name);
      infoWindow.open(map, marker);
    });
    return marker;
  });

  // Add a marker clusterer to manage the markers.
  const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
  const locationButton = document.createElement("button");

  locationButton.textContent = "My Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

const locations = [
  {name: 'Madrid', location: {lat:40.4165, lng:  -3.70256}},
  {name: 'Sevilla', location: {lat:37.38283 , lng: -5.97317}},
  {name: 'Barcelona', location: {lat:41.38879, lng:  2.15899}},
  {name: 'Móstoles', location: {lat:40.32234 , lng:-3.86496 }},
  {name: 'Leganés', location: {lat:40.32718 , lng: -3.7635}},
  {name: 'Santander', location: {lat:43.46472, lng:  -3.80444}},
  {name: 'Oviedo', location: {lat:43.36029 , lng:-5.84476 }},
  {name: 'Logroño', location: {lat:42.46667 , lng: -2.45}},
  {name: 'Cáceres', location: {lat:39.47649 , lng: -6.37224}},
  {name: 'Ceuta', location: {lat:35.88933 , lng:-5.31979 }},
  {name: 'Cuenca', location: {lat:40.06667 , lng:-2.13333 }}
];