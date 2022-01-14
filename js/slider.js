const singleBed = [
  "Images/pexels-max-vakhtbovych-6394711.jpg",
  "Images/pexels-max-vakhtbovych-6434631.jpg",
  "Images/pexels-quark-studio-2507014.jpg",
  "https://media-cdn.tripadvisor.com/media/photo-s/0e/cc/fa/fc/habitacion-con-jacuzzi.jpg",
  "https://media-cdn.tripadvisor.com/media/photo-s/13/d8/ea/1b/a-room-at-the-beach.jpg",
  "https://www.hotelfariones.es/backoffice/images/1402-df7b4d7a-e54c-45df-8878-544f85a35d79.jpg",
];

const doubleBed = [
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/159050057.jpg?k=a7a1ca65bb5049ed4491a498cd74e6bd616a83c2228be3169dd3c094a5092aaa&o=&hp=1",
  "https://webbox.imgix.net/images/lpcsudkgpkcuocql/f2c62d1d-accb-4eec-b8fe-3648317f7baf.jpg?auto=format,compress&fit=crop&crop=entropy",
  "https://img1.cgtrader.com/items/1983961/b4032d72de/large/modern-luxury-hotel-double-bed-room-design-3d-model-max.jpg",
  "https://media-cdn.tripadvisor.com/media/photo-s/07/42/18/62/caption.jpg",
  "https://d1dzqwexhp5ztx.cloudfront.net/imageRepo/5/0/94/472/31/IL263_Double_Suite_S.jpg",
  "https://st.hzcdn.com/simgs/pictures/bedrooms/bay-view-grand-condo-in-cancun-jerry-jacobs-design-inc-img~00a1b6550a2ad9a7_4-2596-1-a414664.jpg",
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

let selectedRoom = singleBed;
let selectedRoomTitle = document.getElementById("carousel-detail-box-title");
const navButton1 = document.getElementById("nav-room-1");
const navButton2 = document.getElementById("nav-room-2");
const navButton3 = document.getElementById("nav-room-3");
const navButton4 = document.getElementById("nav-room-4");

function reset_splide() {
  let splide = document.querySelector(".splide");
  splide.classList.add("hidden");
  execute_slider();
  splide.classList.remove("hidden");
}

function selectSingle() {
  if (selectedRoom != singleBed) {
    selectedRoom = singleBed;
    selectedRoomTitle.innerText = "Single Bed";
    reset_splide();
  }
}

function selectDoubleBed() {
  if (selectedRoom != doubleBed) {
    selectedRoom = doubleBed;
    selectedRoomTitle.innerText = "Double Bed";
    reset_splide();
  }
}

function selectDoubleSuperior() {
  if (selectedRoom != doubleSuperior) {
    selectedRoom = doubleSuperior;
    selectedRoomTitle.innerText = "Double Superior";
    reset_splide();
  }
}

function selectSuite() {
  if (selectedRoom != suite) {
    selectedRoom = suite;
    selectedRoomTitle.innerText = "Suite";
    reset_splide();
  }
}

navButton1.addEventListener("click", selectSingle);
navButton2.addEventListener("click", selectDoubleBed);
navButton3.addEventListener("click", selectDoubleSuperior);
navButton4.addEventListener("click", selectSuite);

function execute_slider() {
  let image_counter = document.getElementById("carousel-detail-box-counter");
  const splider_array = document.getElementById("splide__list");
  for (let i = 0; i < selectedRoom.length; i++) {
    splider_container = document.createElement("li");
    splider_container.classList.add("splide__slide");
    splider_image = document.createElement("img");
    splider_image.classList.add("carousel-image");
    splider_image.src = selectedRoom[i];
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
    focus: "center",
    start: 0,
  });
  splide.on("mounted", function () {
    image_counter.innerText = `${1}/${selectedRoom.length}`;
  });
  splide.mount();
  splide.on("move", function () {
    let slides = document.getElementsByClassName("splide__slide");
    for (let j = 0; j < selectedRoom.length + 1; j++) {
      if (slides[j].classList.contains("is-active")) {
        image_counter.innerText = `${j}/${selectedRoom.length}`;
      }
    }
  });
}
