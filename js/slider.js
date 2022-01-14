
const singleBed = [
  "Images/pexels-max-vakhtbovych-6394711.jpg",
  "Images/pexels-max-vakhtbovych-6434631.jpg",
  "Images/pexels-quark-studio-2507014.jpg",
  "https://media-cdn.tripadvisor.com/media/photo-s/0e/cc/fa/fc/habitacion-con-jacuzzi.jpg",
  "https://media-cdn.tripadvisor.com/media/photo-s/13/d8/ea/1b/a-room-at-the-beach.jpg",
  "https://www.hotelfariones.es/backoffice/images/1402-df7b4d7a-e54c-45df-8878-544f85a35d79.jpg",
];

const doubleBed = [
  "Images/pexels-max-vakhtbovych-6394711.jpg",
  "Images/pexels-max-vakhtbovych-6434631.jpg",
  "Images/pexels-quark-studio-2507014.jpg",
  "https://media-cdn.tripadvisor.com/media/photo-s/0e/cc/fa/fc/habitacion-con-jacuzzi.jpg",
  "https://media-cdn.tripadvisor.com/media/photo-s/13/d8/ea/1b/a-room-at-the-beach.jpg",
  "https://www.hotelfariones.es/backoffice/images/1402-df7b4d7a-e54c-45df-8878-544f85a35d79.jpg",
];

const doubleSuperior = [
  "Images/pexels-max-vakhtbovych-6394711.jpg",
  "Images/pexels-max-vakhtbovych-6434631.jpg",
  "Images/pexels-quark-studio-2507014.jpg",
  "https://media-cdn.tripadvisor.com/media/photo-s/0e/cc/fa/fc/habitacion-con-jacuzzi.jpg",
  "https://media-cdn.tripadvisor.com/media/photo-s/13/d8/ea/1b/a-room-at-the-beach.jpg",
  "https://www.hotelfariones.es/backoffice/images/1402-df7b4d7a-e54c-45df-8878-544f85a35d79.jpg",
];

const suite = [
  "Images/pexels-max-vakhtbovych-6394711.jpg",
  "Images/pexels-max-vakhtbovych-6434631.jpg",
  "Images/pexels-quark-studio-2507014.jpg",
  "https://media-cdn.tripadvisor.com/media/photo-s/0e/cc/fa/fc/habitacion-con-jacuzzi.jpg",
  "https://media-cdn.tripadvisor.com/media/photo-s/13/d8/ea/1b/a-room-at-the-beach.jpg",
  "https://www.hotelfariones.es/backoffice/images/1402-df7b4d7a-e54c-45df-8878-544f85a35d79.jpg",
];

let image_counter = document.getElementById("carousel-detail-box-counter");
const splider_array = document.getElementById("splide__list");

function execute_slider() {
  for (let i = 0; i < suite.length; i++) {
    splider_container = document.createElement("li");
    splider_container.classList.add("splide__slide");
    splider_image = document.createElement("img");
    splider_image.classList.add("carousel-image");
    splider_image.src = suite[i];
    splider_container.appendChild(splider_image);
    splider_array.appendChild(splider_container);
  }
  var splide = new Splide(".splide", {
    type: "loop",
    perPage: 4,
    autoplay: true,
    perMove: 1,
    rewindSpeed: 2000,
    speed: 400,
    focus: 'center',
    start: 0
  });
  splide.on("mounted", function() {
    image_counter.innerText = `${1}/${suite.length}`;
  })
  splide.mount();
  splide.on("move", function () {
    let slides = document.getElementsByClassName("splide__slide");
    for (let j = 0; j < suite.length+1; j++) {
      if (slides[j].classList.contains("is-active")) {
        image_counter.innerText = `${j}/${suite.length}`;
      }
    }
  });
}
