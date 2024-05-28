(function () {
    "use strict";
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        if (all) {
            select(el, all).forEach(e => e.addEventListener(type, listener))
        } else {
            select(el, all).addEventListener(type, listener)
        }
    }

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }
})();

(function () {
    'use strict';
    window.addEventListener('load', function () {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

(function ($) {
    $.fn.pandappSlider = function (options) {
        return this.each(function () {
            const slider = new PandappSlider(this, options);
            slider.init();
        });
    };

    class PandappSlider {
        constructor(element, options) {
            this.sliderContainer = $(element);
            this.slidesWrapper = this.sliderContainer.find(".pandapp-wrapper");
            this.slides = this.slidesWrapper.find(".pandapp-slide");
            this.totalSlides = this.slides.length;
            this.currentSlide = 0;
            this.autoPlayInterval = null;
            this.pagination = null;
            this.prevButton = null;
            this.nextButton = null;

            this.options = $.extend({
                autoPlay: false,
                autoPlayInterval: 5000,
                resolutions: [{width: 0, slidesToShow: 1}],
                transitionEffect: "slide",
                paginationEnabled: true,
                navigationEnabled: true,
                paginationCustomHTML: null,
                navigationCustomHTML: null
            }, options);
        }

        init() {
            if (this.options.paginationEnabled && !this.sliderContainer.find(".pandapp-pagination").length) {
                this.addPagination();
            }

            if (this.options.navigationEnabled && !this.sliderContainer.find(".pandapp-button-prev").length && !this.sliderContainer.find(".pandapp-button-next").length) {
                this.addNavigation();
            }

            if (this.options.autoPlay) {
                this.startAutoPlay();
                this.sliderContainer.on("mouseenter", this.pauseAutoPlay.bind(this));
                this.sliderContainer.on("mouseleave", this.startAutoPlay.bind(this));
            }

            this.handleResponsive();
            $(window).on("resize", this.handleResponsive.bind(this));
        }

        addNavigation() {
            if (this.options.navigationCustomHTML) {
                this.sliderContainer.append(this.options.navigationCustomHTML);
            } else {
                this.prevButton = $("<div class='pandapp-button-prev'>&#10094;</div>");
                this.prevButton.on("click", () => this.prevSlide());
                this.sliderContainer.append(this.prevButton);

                this.nextButton = $("<div class='pandapp-button-next'>&#10095;</div>");
                this.nextButton.on("click", () => this.nextSlide());
                this.sliderContainer.append(this.nextButton);
            }
        }

        addPagination() {
            if (this.options.paginationCustomHTML) {
                this.sliderContainer.append(this.options.paginationCustomHTML);
            } else {
                this.pagination = $("<div class='pandapp-pagination'></div>");
                for (let i = 0; i < this.totalSlides; i++) {
                    const bullet = $("<div class='pandapp-pagination-bullet'></div>");
                    bullet.on("click", () => this.goToSlide(i));
                    this.pagination.append(bullet);
                }
                this.sliderContainer.append(this.pagination);
                this.updatePagination();
            }
        }

        updatePagination() {
            if (this.pagination) {
                const bullets = this.pagination.find(".pandapp-pagination-bullet");
                bullets.each((index, bullet) => {
                    if (index === this.currentSlide) {
                        $(bullet).addClass("pandapp-pagination-bullet-active");
                    } else {
                        $(bullet).removeClass("pandapp-pagination-bullet-active");
                    }
                });
            }
        }

        goToSlide(slideIndex) {
            this.currentSlide = slideIndex;
            this.showSlide();
        }

        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
            this.showSlide();
        }

        prevSlide() {
            this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
            this.showSlide();
        }

        showSlide() {
            switch (this.options.transitionEffect) {
                case "fade":
                    this.slides
                        .removeClass("pandapp-slide-active")
                        .eq(this.currentSlide)
                        .addClass("pandapp-slide-active");
                    break;
                case "slide":
                    this.slidesWrapper.css("transform", `translateX(-${this.currentSlide * 100}%)`);
                    break;
            }
            this.updatePagination();
        }

        startAutoPlay() {
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, this.options.autoPlayInterval);
        }

        pauseAutoPlay() {
            clearInterval(this.autoPlayInterval);
        }

        handleResponsive() {
            const screenWidth = $(window).width();
            let slidesToShow = 1;

            for (const resolution of this.options.resolutions) {
                if (screenWidth >= resolution.width) {
                    slidesToShow = resolution.slidesToShow;
                } else {
                    break;
                }
            }

            this.slidesWrapper.css("grid-template-columns", `repeat(${slidesToShow}, 1fr)`);
        }
    }
})(jQuery);

$(document).ready(function () {
    $("#mySlider").pandappSlider({
        autoPlay: true,
        autoPlayInterval: 3000,
        resolutions: [{width: 0, slidesToShow: 1}],
        paginationEnabled: true,
        navigationEnabled: true
    });
});

const countDownDate = new Date("May 25, 2024 15:37:25").getTime();
if (document.querySelector('.countdown')) {
    const countdown = document.querySelector('.countdown');
    const dayscontainer = countdown.querySelector('.js-days .time_day');
    const hourscontainer = countdown.querySelector('.js-hours .time_hours');
    const minutescontainer = countdown.querySelector('.js-minutes .time_minutes');
    const secondscontainer = countdown.querySelector('.js-seconds .time_seconds');


    const startCountdown = () => {
        const timer = setInterval(function () {
            let now = new Date().getTime();

            let distance = countDownDate - now;

            if (distance < 0) {
                countdown.remove()
                clearInterval(timer);
            }

            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (days < 10) {
                days = 0 + String(days);
            }

            if (hours < 10) {
                hours = 0 + String(hours);
            }

            if (minutes < 10) {
                minutes = 0 + String(minutes);
            }

            if (seconds < 10) {
                seconds = 0 + String(seconds);
            }
            dayscontainer.innerHTML = days;
            hourscontainer.innerHTML = hours;
            minutescontainer.innerHTML = minutes;
            secondscontainer.innerHTML = seconds;

        }, 1000);
    }


    startCountdown();
}

const countDownDate2 = new Date("May 15, 2024 15:37:25").getTime();
if (document.querySelector('.main_sup_countdown')) {
    const countdown = document.querySelector('.main_sup_countdown');
    const dayscontainer = countdown.querySelector('.js-sup-days .time_day');
    const hourscontainer = countdown.querySelector('.js-sup-hours .time_hours');
    const minutescontainer = countdown.querySelector('.js-sup-minutes .time_minutes');
    const secondscontainer = countdown.querySelector('.js-sup-seconds .time_seconds');


    const startCountdown2 = () => {
        const timer = setInterval(function () {
            let now = new Date().getTime();

            let distance = countDownDate2 - now;

            if (distance < 0) {
                countdown.remove()
                clearInterval(timer);
            }

            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (days < 10) {
                days = 0 + String(days);
            }

            if (hours < 10) {
                hours = 0 + String(hours);
            }

            if (minutes < 10) {
                minutes = 0 + String(minutes);
            }

            if (seconds < 10) {
                seconds = 0 + String(seconds);
            }
            dayscontainer.innerHTML = days;
            hourscontainer.innerHTML = hours;
            minutescontainer.innerHTML = minutes;
            secondscontainer.innerHTML = seconds;

        }, 1000);
    }


    startCountdown2();
}

document.addEventListener("DOMContentLoaded", function () {
    const restaurantContainer = document.querySelector(".card-slider");
    const leftRButton = document.querySelector(".restaurant-arrow-left");
    const rightRButton = document.querySelector(".restaurant-arrow-right");

    function updateButtonState() {
        leftRButton.disabled = restaurantContainer.scrollLeft <= 0;
        rightRButton.disabled =
            restaurantContainer.scrollLeft + restaurantContainer.offsetWidth >=
            restaurantContainer.scrollWidth;
    }

    leftRButton.onclick = function () {
        restaurantContainer.scrollBy({
            left: -restaurantContainer.offsetWidth / 2,
            behavior: "smooth",
        });
    };

    rightRButton.onclick = function () {
        restaurantContainer.scrollBy({
            left: restaurantContainer.offsetWidth / 2,
            behavior: "smooth",
        });
    };

    restaurantContainer.addEventListener("scroll", updateButtonState);
    updateButtonState();
});

document.addEventListener("DOMContentLoaded", function () {
    const categoryContainer = document.querySelector(".category-slider");
    const leftRButton = document.querySelector(".category-arrow-left");
    const rightRButton = document.querySelector(".category-arrow-right");

    function updateButtonState() {
        leftRButton.disabled = categoryContainer.scrollLeft <= 0;
        rightRButton.disabled =
            categoryContainer.scrollLeft + categoryContainer.offsetWidth >=
            categoryContainer.scrollWidth;
    }

    leftRButton.onclick = function () {
        categoryContainer.scrollBy({
            left: -categoryContainer.offsetWidth / 2,
            behavior: "smooth",
        });
    };

    rightRButton.onclick = function () {
        categoryContainer.scrollBy({
            left: categoryContainer.offsetWidth / 2,
            behavior: "smooth",
        });
    };

    categoryContainer.addEventListener("scroll", updateButtonState);
    updateButtonState();
});

document.addEventListener("DOMContentLoaded", function () {
    const categoryContainer = document.querySelector(".product-slider");
    const leftRButton = document.querySelector(".product-arrow-left");
    const rightRButton = document.querySelector(".product-arrow-right");

    function updateButtonState() {
        leftRButton.disabled = categoryContainer.scrollLeft <= 0;
        rightRButton.disabled =
            categoryContainer.scrollLeft + categoryContainer.offsetWidth >=
            categoryContainer.scrollWidth;
    }

    leftRButton.onclick = function () {
        categoryContainer.scrollBy({
            left: -categoryContainer.offsetWidth / 2,
            behavior: "smooth",
        });
    };

    rightRButton.onclick = function () {
        categoryContainer.scrollBy({
            left: categoryContainer.offsetWidth / 2,
            behavior: "smooth",
        });
    };

    categoryContainer.addEventListener("scroll", updateButtonState);
    updateButtonState();
});