const roomType1 = [
  "Images/pexels-max-vakhtbovych-6394711.jpg",
  "Images/pexels-max-vakhtbovych-6434631.jpg",
  "Images/pexels-quark-studio-2507014.jpg",
  "https://media-cdn.tripadvisor.com/media/photo-s/0e/cc/fa/fc/habitacion-con-jacuzzi.jpg",
  "https://media-cdn.tripadvisor.com/media/photo-s/13/d8/ea/1b/a-room-at-the-beach.jpg",
  "https://www.hotelfariones.es/backoffice/images/1402-df7b4d7a-e54c-45df-8878-544f85a35d79.jpg",
];

const splider_array = document.getElementById("splide__list");

for (let i = 0; i < roomType1.length; i++) {
  splider_container = document.createElement("li");
  splider_container.classList.add("splide__slide");
  splider_image = document.createElement("img");
  splider_image.classList.add("carousel-image");
  splider_image.src = roomType1[i];
  splider_container.appendChild(splider_image);
  splider_array.appendChild(splider_container);
  image_counter = document.getElementById("carousel-detail-box-counter");
  //image_counter.innerText = `${i+1}/${roomType1.length}`;
}

function execute_slider() {
  var splide = new Splide(".splide", {
    type: "loop",
    perPage: 4,
    autoplay: true,
    perMove: 1,
    rewindSpeed: 8000,
    focus: "center",
    speed: 400,
  });

  splide.mount();
}
