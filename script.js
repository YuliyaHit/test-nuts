'use strict'

let btns = document.querySelectorAll('.slider__btn'),
    news = document.querySelector('.news'),
    sliderItem = document.querySelectorAll('.news__item');

btns.forEach(item => item.addEventListener('mousedown', function () {
    item.style.background = '#C8D9FB';
}));

btns.forEach(item => item.addEventListener('click', function (event) {
    let target = event.target,
        newsItem = document.querySelector('.active');

    if (target==btns[1]) {
        newsItem.classList.toggle('active');
        (newsItem.nextElementSibling) ? newsItem.nextElementSibling.classList.toggle('active'): sliderItem[0].classList.toggle('active');
        moveProgressbar(getIndex());
        moveSlider();

    } else {
        newsItem.classList.toggle('active');
        (newsItem.previousElementSibling) ? newsItem.previousElementSibling.classList.toggle('active'): sliderItem[sliderItem.length-1].classList.toggle('active');
        moveProgressbar(getIndex());
        moveSlider();
    }
}));

btns.forEach(item => item.addEventListener('mouseup', function () {
    item.style.background = 'transparent';
}));

sliderItem.forEach(item => item.addEventListener('click', function (event) {
    sliderItem.forEach(item => item.classList.remove('active'));
    this.classList.toggle('active');
    moveProgressbar(getIndex());
}))

let isDown = false,
    startX,
    scrollLeft;

const end = () => {
    isDown = false;
}

const start = (e) => {
    isDown = true;
    startX = e.pageX || e.touches[0].pageX;
    scrollLeft = news.scrollLeft;
}

const move = (e) => {
    if(!isDown) return;

    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX;
    const dist = (x - startX);
    news.scrollLeft = scrollLeft - dist;
}

(() => {
    news.addEventListener('mousedown', start);
    news.addEventListener('touchstart', start);

    news.addEventListener('mousemove', move);
    news.addEventListener('touchmove', move);

    news.addEventListener('mouseleave', end);
    news.addEventListener('mouseup', end);
    news.addEventListener('touchend', end);
})();

let progressbar = document.querySelector('.slider__progressbar'),
    progressLine = progressbar.querySelector('.slider-line');

function moveProgressbar(index) {
    let dist  = (progressbar.clientWidth - progressLine.clientWidth)/(sliderItem.length-1);
    progressLine.style.left =  dist*index + 'px';
}

const getIndex = () => {
    for (let i = 0; i < sliderItem.length; i++) {
        if (sliderItem[i].classList.contains('active')) {
            return  i;
        }
    }
}

const moveSlider = () => {
    let activeItem = document.querySelector('.active');
    news.scrollLeft +=  (activeItem.getBoundingClientRect().right-news.getBoundingClientRect().right)+1;
}