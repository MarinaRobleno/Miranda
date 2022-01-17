let selectedRoom = {selected: "singleBed"};
let selectedRoomTitle = document.getElementById("carousel-detail-box-title");
const navButton1 = document.getElementById("nav-room-1");
const navButton2 = document.getElementById("nav-room-2");
const navButton3 = document.getElementById("nav-room-3");
const navButton4 = document.getElementById("nav-room-4");
let splide1 = document.getElementById("splide-1")
let splide2 = document.getElementById("splide-2")
let splide3 = document.getElementById("splide-3")
let splide4 = document.getElementById("splide-4")
let image_counter1 = document.getElementById("carousel-detail-box-counter-1")
let image_counter2 = document.getElementById("carousel-detail-box-counter-2")
let image_counter3 = document.getElementById("carousel-detail-box-counter-3")
let image_counter4 = document.getElementById("carousel-detail-box-counter-4")

function execute_slider() {
  for (let l = 0; l<4; l++){
    let image_counter = document.getElementById(`carousel-detail-box-counter-${l+1}`);
    var splide = new Splide(`#splide-${l+1}`, {
      type: "loop",
      perPage: 4,
      autoplay: true,
      perMove: 1,
      speed: 4000,
      start: 0,
      pagination: false,
      arrows: false
    });
    splide.on("mounted", function () {
      image_counter.innerText = `1/6`;
    });
    splide.mount();
    splide.on("move", function () {
      let slides = document.getElementsByClassName(`splide_slider_${l+1}`);
      for (let j = 0; j < 6 + 1; j++) {
        if (slides[j].classList.contains("is-active")) {
          image_counter.innerText = `${j}/6`;
        }
      }
    });
  }
}

function selectSingle() {
  if (selectedRoom.selected != "singleBed") {
    selectedRoom.selected = "singleBed";
    selectedRoomTitle.innerText = "Single Bed";
    splide2.classList.add("hidden")
    splide3.classList.add("hidden")
    splide4.classList.add("hidden")
    splide1.classList.remove("hidden");
    image_counter1.classList.remove("hidden")
    image_counter2.classList.add("hidden")
    image_counter3.classList.add("hidden")
    image_counter4.classList.add("hidden")
    navButton1.classList.add("selected");
    navButton2.classList.remove("selected");
    navButton3.classList.remove("selected");
    navButton4.classList.remove("selected");
  }
}

function selectDoubleBed() {
  if (selectedRoom.selected != "doubleBed") {
    selectedRoom.selected = "doubleBed";
    selectedRoomTitle.innerText = "Double Bed";
    splide1.classList.add("hidden")
    splide3.classList.add("hidden")
    splide4.classList.add("hidden")
    splide2.classList.remove("hidden");
    image_counter2.classList.remove("hidden")
    image_counter1.classList.add("hidden")
    image_counter3.classList.add("hidden")
    image_counter4.classList.add("hidden")
    navButton1.classList.remove("selected");
    navButton2.classList.add("selected");
    navButton3.classList.remove("selected");
    navButton4.classList.remove("selected");
  }
}

function selectDoubleSuperior() {
  if (selectedRoom.selected != "doubleSuperior") {
    selectedRoom.selected = "doubleSuperior";
    selectedRoomTitle.innerText = "Double Superior";
    splide1.classList.add("hidden")
    splide2.classList.add("hidden")
    splide4.classList.add("hidden")
    splide3.classList.remove("hidden");
    navButton1.classList.remove("selected");
    navButton2.classList.remove("selected");
    navButton3.classList.add("selected");
    navButton4.classList.remove("selected");
  }
}

function selectSuite() {
  if (selectedRoom.selected != "suite") {
    selectedRoom.selected = "suite";
    selectedRoomTitle.innerText = "Suite";
    splide1.classList.add("hidden")
    splide3.classList.add("hidden")
    splide2.classList.add("hidden")
    splide4.classList.remove("hidden");
    navButton1.classList.remove("selected");
    navButton2.classList.remove("selected");
    navButton3.classList.remove("selected");
    navButton4.classList.add("selected");
  }
}

navButton1.addEventListener("click", selectSingle);
navButton2.addEventListener("click", selectDoubleBed);
navButton3.addEventListener("click", selectDoubleSuperior);
navButton4.addEventListener("click", selectSuite);

