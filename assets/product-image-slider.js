document.addEventListener('DOMContentLoaded', function () {
    var splide = new Splide('.splide', {
        type: 'loop',
        gap: 7,
        padding: {left: 13, right: 13},
        focus: 'center',
        width: '100vw',
        drag: 'free',
        snap: true,
        arrows: false,
        classes: {
            pagination: 'splide__pagination splide-pagination',
        },
    });
    splide.mount();
});


var galleryThumbs = new Swiper(".gallery-thumbs", {
    direction: 'vertical',
    slidesPerView: 4,
});

var galleryMain = new Swiper(".gallery-main", {
    // preventInteractionOnTransition: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    thumbs: {
        swiper: galleryThumbs
    }
});

galleryMain.on('slideChangeTransitionStart', function () {
    galleryThumbs.slideTo(galleryMain.activeIndex);
});

galleryThumbs.on('transitionStart', function () {
    galleryMain.slideTo(galleryThumbs.activeIndex);
});
