document.addEventListener('DOMContentLoaded', function () {
    var splide = new Splide('.splide', {
        type: 'loop',
        gap: ".5rem",
        padding: "2rem",
        arrows: false,
        classes: {
            pagination: 'splide__pagination splide-pagination',
            arrows: 'splide__arrows splide-arrows',
            arrow: 'splide__arrow splide-arrow',
            prev: 'splide__arrow--prev splide-prev',
            next: 'splide__arrow--next splide-next',
        },
    });
    splide.mount();
});

let slideIndex = 0;
showSlides();

function plusSlides(n) {
    slideIndex += n;
    showSlides();
}
function newIndex(n) {
    slideIndex = Number(n);
    showSlides()
}

function showSlides() {
    console.log(slideIndex)
    let i;
    let slides = document.getElementsByClassName("slides");
    if (slideIndex === 0) { document.querySelector('.prev').disabled = true }
    if (slideIndex > 0) { document.querySelector('.prev').disabled = false }
    if (slideIndex === slides.length - 1) { document.querySelector('.next').disabled = true }
    if (slideIndex < slides.length - 1) { document.querySelector('.next').disabled = false }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex].style.display = "block";
}