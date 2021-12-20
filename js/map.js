function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: { lat: 40.2085, lng: -3.713 },
  });
  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });
  // Create an array of alphabetical characters used to label the markers.
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // Add some markers to the map.
  const markers = locations.map((position, i) => {
    const label = labels[i % labels.length];
    const marker = new google.maps.Marker({
      position,
      label,
    });

    // markers can only be keyboard focusable when they have click listeners
    // open info window when marker is clicked
    marker.addListener("click", () => {
      infoWindow.setContent(label);
      infoWindow.open(map, marker);
    });
    return marker;
  });

  // Add a marker clusterer to manage the markers.
  const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
}

const locations = [
  {lat:40.4165, lng:  -3.70256},
  {lat:37.38283 , lng: -5.97317},
  {lat:41.38879, lng:  2.15899},
  {lat:40.32234 , lng:-3.86496 },
  {lat:40.32718 , lng: -3.7635},
  {lat:43.46472, lng:  -3.80444},
  {lat:43.36029 , lng:-5.84476 },
  {lat:42.46667 , lng: -2.45},
  {lat:39.47649 , lng: -6.37224},
  {lat:35.88933 , lng:-5.31979 },
  {lat:40.06667 , lng:-2.13333 }
];