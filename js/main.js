const openButton = document.getElementById("hamburger-button");
let dropdownContent = document.getElementById("drop-down-box");

//Hamburger menu function
function openDropdown() {
  dropdownContent.classList.toggle("drop-down-box--visible");
}
openButton.addEventListener("click", openDropdown);

$(".arrow-down-section").click(function () {
  var $target = $(".scroll-section.active").next(".scroll-section");
  if ($target.length == 0) $target = $(".scroll-section:first");

  $("html, body").animate(
    {
      scrollTop: $target.offset().top,
    },
    "slow"
  );

  $(".active").removeClass("active");
  $target.addClass("active");
});
