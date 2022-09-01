const indicators = document.querySelectorAll(".indicator");
const sliderLine = document.querySelector(".slider-line");
let firstSlide = document.querySelector(".first-slide");
let copy = firstSlide.cloneNode(true);
sliderLine.appendChild(copy);
const btnNext = document.querySelector(".btn-next");
const btnPrev = document.querySelector(".btn-prev");
const slides = document.querySelectorAll(".slide");
const itemWidth = document.querySelector(".slide").offsetWidth;
const slideCount = slides.length;
let position = 0;
let indicatorIndex = 0;
let animationRun = false;

//--------------Buttons-Settings--------------
const nextSlide = () => {
  if (animationRun) return false;

  if (position == (1 - slideCount) * itemWidth) {
    position = -itemWidth;
  } else {
    position -= itemWidth;
  }
  indicators[indicatorIndex].className = indicators[
    indicatorIndex
  ].className.replace(" active", "");
  if (indicatorIndex == indicators.length - 1) {
    indicatorIndex = 0;
  } else {
    indicatorIndex++;
  }
  indicators[indicatorIndex].classList.add("active");

  setPosition(position + itemWidth, position);
};

const prevSlide = () => {
  if (animationRun) return false;

  if (position == 0) {
    position = (2 - slideCount) * itemWidth;
  } else {
    position += itemWidth;
  }

  indicators[indicatorIndex].className = indicators[
    indicatorIndex
  ].className.replace(" active", "");

  if (indicatorIndex == 0) {
    indicatorIndex = indicators.length - 1;
  } else {
    indicatorIndex--;
  }
  indicators[indicatorIndex].classList.add("active");

  setPosition(position - itemWidth, position);
};

//--------------Buttons-Activate--------------------

btnNext.addEventListener("click", nextSlide);
btnPrev.addEventListener("click", prevSlide);

// ------------Indicator-Settings--------------------------

const activateIndicator = (index) => {
  if (animationRun) return false;

  if (index == 0 && position == -1 * (slideCount - 1) * itemWidth) {
    index += 1;
  }

  indicators[indicatorIndex].className = indicators[
    indicatorIndex
  ].className.replace(" active", "");
  indicatorIndex = index;
  indicators[indicatorIndex].classList.add("active");

  setPosition(position, -itemWidth * index);
  position = -itemWidth * index;
};

// -----------Animation-settings--------------------
const setPosition = (startPosition, endPosition) => {
  animationRun = true;
  let fps = itemWidth / 10;
  let time = 1000;
  let frames = 1000 / fps;
  let steps = time / frames;
  let posintime = (endPosition - startPosition) / steps;

  const timer = setInterval(function () {
    startPosition += posintime;
    sliderLine.style.left = startPosition + "px";
    steps--;

    if (steps <= 0) {
      clearInterval(timer);
      animationRun = false;
    }
  }, frames);
};

//-----------Auto-slide-show--------

// setInterval(() => {
//   nextSlide();
// }, 6000);
