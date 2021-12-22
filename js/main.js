const openButton = document.getElementById("hamburger-button");
let dropdownContent = document.getElementById("drop-down-box");

//Hamburger menu function
function openDropdown() {
  dropdownContent.classList.toggle("drop-down-box--visible");
}
openButton.addEventListener("click", openDropdown);


