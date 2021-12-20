const openButton = document.getElementById("hamburger-button");
let dropdownContent = document.getElementById("drop-down-box");

//Hamburger menu function
function openDropdown() {
  dropdownContent.classList.toggle("drop-down-box--visible");
}
openButton.addEventListener("click", openDropdown);

//Map
function initMap() {
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.036 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}
