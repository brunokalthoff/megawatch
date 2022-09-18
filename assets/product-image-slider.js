let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let theslides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("demo");
  if (n > theslides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = theslides.length }
  for (i = 0; i < theslides.length; i++) {
    theslides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  theslides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}


const slider = document.querySelector('.mobile-slider-inner'),
  slides = Array.from(document.querySelectorAll('.slide')),
  dots = Array.from(document.querySelectorAll('.dot'))

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID,
  currentIndex = 0

slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('.mobile-img')

  // disable default image drag
  slideImage.addEventListener('dragstart', (e) => e.preventDefault())
  // touch events
  slide.addEventListener('touchstart', touchStart(index))
  slide.addEventListener('touchend', touchEnd)
  slide.addEventListener('touchmove', touchMove)
  // mouse events
  slide.addEventListener('mousedown', touchStart(index))
  slide.addEventListener('mouseup', touchEnd)
  slide.addEventListener('mousemove', touchMove)
  slide.addEventListener('mouseleave', touchEnd)
})

// make responsive to viewport changes
window.addEventListener('resize', setPositionByIndex)

// prevent menu popup on long press
window.oncontextmenu = function (event) {
  event.preventDefault()
  event.stopPropagation()
  return false
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

function touchStart(index) {
  return function (event) {
    currentIndex = index
    console.log(currentIndex)
    startPos = getPositionX(event)
    isDragging = true
    animationID = requestAnimationFrame(animation)
    slider.classList.add('grabbing')
  }
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event)
    currentTranslate = prevTranslate + currentPosition - startPos
  }
}

function touchEnd() {
  cancelAnimationFrame(animationID)
  isDragging = false
  const movedBy = currentTranslate - prevTranslate

  // if moved enough negative then snap to next slide if there is one
  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1

  // if moved enough positive then snap to previous slide if there is one
  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1

  setPositionByIndex()
  slider.classList.remove('grabbing')
}

function animation() {
  setSliderPosition()
  if (isDragging) requestAnimationFrame(animation)
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth
  prevTranslate = currentTranslate
  setSliderPosition()
  updateDot()
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`
}

const setByDot = index => {
  currentIndex = index;
  setPositionByIndex();
}

const updateDot = () => {
  dots.forEach(dot => dot.style.background = "#e8e8e8")
  dots[currentIndex].style.background = "grey";
}
