let map;
let marker;
let geocoder;
let responseDiv;
let response;
let myLocation = {};
let infoWindow;
function initMap() {
  const bounds = new google.maps.LatLngBounds();
  const markersArray = [];
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: { lat: 40.2085, lng: -3.713 },
    mapTypeControl: false,
  });
  infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });

  // CUSTOM MARKER
  let selectedCommunity = {
    community: "",
  };

  const svgMarker = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "#000000",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };

  const markers = (
    selectedCommunity.community != ""
      ? locations.filter(
          (place) => place.community === selectedCommunity.community
        )
      : locations
  ).map((place) => {
    const marker = new google.maps.Marker({
      position: place.location,
      icon: svgMarker,
      title: place.name,
    });

    // DROPDOWN

    let select = document.getElementById("dropdown");
    select.addEventListener("change", () => {
      let communityIndex = Number(select.value);
      selectedCommunity.community = comunidadesAutonomas[communityIndex];

      if (typeof communityIndex == "number") {
        const communityCoords = coordinates[communityIndex];

        const communityPolygon = new google.maps.Polygon({
          paths: communityCoords,
          strokeColor: "#bead8e",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0,
        });

        communityPolygon.setMap(map);
      }
    });

    marker.addListener("click", () => {
      infoWindow.setContent(place.name);
      infoWindow.open(map, marker);
    });
    return marker;
  });

  // CLUSTERER
  const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
  const locationButton = document.createElement("button");
  // MY LOCATION.
  locationButton.textContent = "My Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(locationButton);
  locationButton.addEventListener("click", findMe);
  geocoder = new google.maps.Geocoder();

  //INPUT
  const inputText = document.getElementById("geolocation-input");

  const defaultBounds = {
    north: map.center.lat + 0.1,
    south: map.center.lat - 0.1,
    east: map.center.lng + 0.1,
    west: map.center.lng - 0.1,
  };
  const options = {
    bounds: defaultBounds,
    componentRestrictions: { country: "es" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
    types: ["establishment"],
  };
  const autocomplete = new google.maps.places.Autocomplete(inputText, options);
  const infowindowContent = document.getElementById("infowindow-content");
  autocomplete.addListener("place_changed", () => {
    infowindow.close();
    marker.setVisible(false);

    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); // Why 17? Because it looks good.
    }

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    let address = "";

    if (place.address_components) {
      address = [
        (place.address_components[0] &&
          place.address_components[0].short_name) ||
          "",
        (place.address_components[1] &&
          place.address_components[1].short_name) ||
          "",
        (place.address_components[2] &&
          place.address_components[2].short_name) ||
          "",
      ].join(" ");
    }

    infowindowContent.children["place-icon"].src = place.icon;
    infowindowContent.children["place-name"].textContent = place.name;
    infowindowContent.children["place-address"].textContent = address;
    infowindow.open(map, marker);
  });

  // Sets a listener on a given radio button. The radio buttons specify
  // the countries used to restrict the autocomplete search.

  const submitButton = document.getElementById("search-location-button");

  const clearButton = document.getElementById("clear-location-button");

  response = document.createElement("pre");
  response.id = "response";
  response.innerText = "";
  responseDiv = document.createElement("div");
  responseDiv.id = "response-container";
  responseDiv.appendChild(response);

  const personIcon = {
    path: "M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z",
    fillColor: "#000000",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };
  marker = new google.maps.Marker({
    //icon: personIcon,
    map,
  });
  map.addListener("click", (e) => {
    myLocation.coords = e.latLng;
    geocode({ location: e.latLng });
  });
  submitButton.addEventListener("click", (e) => {
    geocode({ address: inputText.value });
  });
  clearButton.addEventListener("click", () => {
    clear();
  });
  clear();

  const nearButton = document.getElementById("find-near-location");

  nearButton.addEventListener("click", calculateDistance);
}

function findMe() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        myLocation.coords = pos;
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
}

function locationForCalculation() {
  navigator.geolocation.getCurrentPosition((position) => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    return pos;
  });
}

// DISTANCE MATRIX
function calculateDistance() {
  /*myLocation.coords = await locationForCalculation();*/
  const service = new google.maps.DistanceMatrixService();

  let myHotels = [];
  for (let i = 0; i < locations.length; i++) {
    myHotels.push(locations[i].location);
  }

  const request = {
    origins: [myLocation.coords],
    destinations: myHotels,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false,
  };

  service.getDistanceMatrix(request).then((response) => {
    const distancesArray = [];
    const indexArray = [];
    const sortedDistances = [];
    const sortedPlaces = [];
    for (let j = 0; j < response.rows[0].elements.length; j++) {
      distancesArray.push(response.rows[0].elements[j].distance.value);
      sortedDistances.push(response.rows[0].elements[j].distance.value);
    }
    sortedDistances.sort(function (a, b) {
      return a - b;
    });
    for (let k = 0; k < distancesArray.length; k++) {
      indexArray.push(distancesArray.indexOf(sortedDistances[k]));
    }
    for (let l = 0; l < response.destinationAddresses.length; l++) {
      sortedPlaces.push(response.destinationAddresses[indexArray[l]]);
    }
    document.getElementById("response").innerText = `${sortedPlaces.map(
      (place) =>
        place +
        " - " +
        sortedDistances[sortedPlaces.indexOf(place)] +
        "m" +
        "\n" +
        "\n"
    )}`;
  });
  const sidebar = document.getElementById("sidebar");
  sidebar.style.display = "block";
}

function clear() {
  marker.setMap(null);
  responseDiv.style.display = "none";
}

function geocode(request) {
  clear();
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;

      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);
      responseDiv.style.display = "block";
      response.innerText = JSON.stringify(result, null, 2);
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
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
  {
    name: "Hotel Miranda - Madrid",
    community: "Madrid, Comunidad de",
    location: { lat: 40.4165, lng: -3.70256 },
  },
  {
    name: "Hotel Miranda - Sevilla",
    community: "Andalucía",
    location: { lat: 37.38283, lng: -5.97317 },
  },
  {
    name: "Hotel Miranda - Barcelona",
    community: "Cataluña / Catalunya",
    location: { lat: 41.38879, lng: 2.15899 },
  },
  {
    name: "Hotel Miranda - Móstoles",
    community: "Madrid, Comunidad de",
    location: { lat: 40.32234, lng: -3.86496 },
  },
  {
    name: "Hotel Miranda - Santander",
    community: "Cantabria",
    location: { lat: 43.46472, lng: -3.80444 },
  },
  {
    name: "Hotel Miranda - Oviedo",
    community: "Asturias, Principado de",
    location: { lat: 43.36029, lng: -5.84476 },
  },
  {
    name: "Hotel Miranda - Ceuta",
    community: "Ceuta",
    location: { lat: 35.88933, lng: -5.31979 },
  },
  {
    name: "Hotel Miranda - Cuenca",
    community: "Castilla - La Mancha",
    location: { lat: 40.06667, lng: -2.13333 },
  },
];

const comunidadesAutonomas = [
  "Andalucía",
  "Aragón",
  "Asturias, Principado de",
  "Balears, Illes",
  "Canarias",
  "Cantabria",
  "Castilla y León",
  "Castilla - La Mancha",
  "Cataluña / Catalunya",
  "Comunitat Valenciana",
  "Extremadura",
  "Galicia",
  "Madrid, Comunidad de",
  "Murcia, Región de",
  "Navarra, Comunidad Foral de",
  "País Vasco / Euskadi",
  "Rioja, La",
  "Ceuta",
  "Melilla",
];
