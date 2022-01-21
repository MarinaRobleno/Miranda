let map;
let marker;
let markers;
let markerCluster;
let geocoder;
let responseDiv;
let response;
let myLocation = {};
let infoWindow;
let place;
let svgMarker;
const findNear = document.getElementById("find-near-location");
let select = document.getElementById("dropdown");
let selectedCommunity = {
  community: "",
};
let communityPolygon;

//INITIALIZE MAP
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
  svgMarker = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "#000000",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };
  
  //DECLARE INITIAL MARKERS
  markers = locations.map((place) => {
    const marker = new google.maps.Marker({
      position: place.location,
      icon: svgMarker,
      title: place.name,
    });
    marker.addListener("click", () => {
      infoWindow.setContent(place.name);
      infoWindow.open(map, marker);
    });
    return marker;
  });

  //COMUNITY DROPDOWN EVENT LISTENER
  select.addEventListener("change", selectCommunity);

  // CLUSTERER
  markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
  const locationButton = document.createElement("button");

  // MY LOCATION.
  locationButton.textContent = "My Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(locationButton);
  locationButton.addEventListener("click", findMe);
  geocoder = new google.maps.Geocoder();

  //INPUT LOCATION
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

    place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
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

  const submitButton = document.getElementById("search-location-button");

  const clearButton = document.getElementById("clear-location-button");

  response = document.createElement("pre");
  response.id = "response";
  response.innerText = "";
  responseDiv = document.createElement("div");
  responseDiv.id = "response-container";
  responseDiv.appendChild(response);

  const personIcon = {
    path: "M10,0.186c-3.427,0-6.204,2.778-6.204,6.204c0,5.471,6.204,6.806,6.204,13.424c0-6.618,6.204-7.953,6.204-13.424C16.204,2.964,13.427,0.186,10,0.186z M10,14.453c-0.66-1.125-1.462-2.076-2.219-2.974C6.36,9.797,5.239,8.469,5.239,6.39C5.239,3.764,7.374,1.63,10,1.63c2.625,0,4.761,2.135,4.761,4.761c0,2.078-1.121,3.407-2.541,5.089C11.462,12.377,10.66,13.328,10,14.453z",
    fillColor: "#bead8e",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };
  marker = new google.maps.Marker({
    icon: personIcon,
    map,
  });

  //CLICK ON MAP MARKER
  map.addListener("click", (e) => {
    myLocation.coords = e.latLng;
    geocode({ location: e.latLng });
    findNear.style.display = "block";
  });

  //SEARCH AND CLEAR LOCATION SEARCH
  submitButton.addEventListener("click", () => {
    geocode({ address: inputText.value });
  });
  clearButton.addEventListener("click", () => {
    clear();
  });
  clear();

  const nearButton = document.getElementById("find-near-location");

  nearButton.addEventListener("click", calculateDistance);
}

//GENERIC FUNCTION TO ITERATE AN CREATE MARKERS
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

//CLEAR CLUSTERS FUNCTION
function clearClusters() {
  markerCluster.clearMarkers();
}

//ERASE OLD MARKERS, GET NEW MARKERS, SET NEW MARKERS
function getMarkers(filteredLocations) {
  setMapOnAll(null);
  markers = [];
  markers = filteredLocations.map((place) => {
    const marker = new google.maps.Marker({
      position: place.location,
      icon: svgMarker,
      title: place.name,
    });
    marker.addListener("click", () => {
      infoWindow.setContent(place.name);
      infoWindow.open(map, marker);
    });
    return marker;
  });
  clearClusters();
  markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
  setMapOnAll(map);
}

//SELECT COMMUNITY FUNCTION
function selectCommunity() {
  if (communityPolygon) {
    communityPolygon.setMap(null);
  }
  let communityIndex = Number(select.value);
  selectedCommunity.community = comunidadesAutonomas[communityIndex];
  if (communityIndex != -1) {
    let filteredLocations = locations.filter(
      (place) => place.community === selectedCommunity.community
    );
    getMarkers(filteredLocations);
  } else {
    getMarkers(locations);
  }

  if (typeof communityIndex == "number") {
    const communityCoords = coordinates[communityIndex];

    communityPolygon = new google.maps.Polygon({
      paths: communityCoords,
      strokeColor: "#bead8e",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0,
    });

    communityPolygon.setMap(map);
  }
}

//SET MY LOCATION DATA FOR DISTANCE MATRIX
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
        infoWindow.setContent("Your location was found");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }

  findNear.style.display = "block";
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
    let responseList = document.getElementById("response");
    while (responseList.lastElementChild) {
      responseList.removeChild(responseList.lastElementChild);
    }
    for (let m = 0; m < sortedPlaces.length; m++) {
      let responseElement = document.createElement("div");
      responseList.appendChild(responseElement);
      responseElement.classList.add("map-response-element");
      responseElement.innerText = `${sortedPlaces[m]} - ${sortedDistances[m]} m`;
    }
  });
  const sidebar = document.getElementById("sidebar");
  sidebar.style.display = "flex";
}

//CLEAR
function clear() {
  marker.setMap(null);
  responseDiv.style.display = "none";
}

//GEOCODE
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

//ERROR HANDLING
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
