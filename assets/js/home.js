document.addEventListener("DOMContentLoaded", function () {
    // Slider
    const slides = document.querySelectorAll(".mySlide");
    const btns = document.querySelectorAll(".btnDisplay");
    showSlide(0);
    function showSlide(index) {
        // Ẩn tất cả các slide
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[index].style.display = "block";
    }
    // Xác định sự kiện click cho các nút bấm
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            for (let j = 0; j < slides.length; j++) {
                slides[j].style.display = "none";
                btns[j].classList.remove("active");
            }
            showSlide(i);
            btns[i].classList.add("active");
        });
    }
    // Back to Top
    var button = document.getElementById("goTop");
    var btnTop = document.getElementById("btnTop");
    button.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            btnTop.style.display = "block";
        } else {
            btnTop.style.display = "none";
        }
    });

});

// Hàm format thời gian
function formatNumber(number) {
    return number < 10 ? "0" + number : number;
}
// Hàm đếm ngược 
function startCountdown(daysId, hoursId, minutesId, secondsId, daysCount) {
    var countDownDate = new Date().getTime() + (daysCount * 24 * 60 * 60 * 1000);
    var x = setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        days = formatNumber(days);
        hours = formatNumber(hours);
        minutes = formatNumber(minutes);
        seconds = formatNumber(seconds);
        document.getElementById(daysId).innerHTML = days;
        document.getElementById(hoursId).innerHTML = hours;
        document.getElementById(minutesId).innerHTML = minutes;
        document.getElementById(secondsId).innerHTML = seconds;
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "EXPIRED";
        }
    }, 1000);
}
startCountdown("Days", "Hours", "Minutes", "Seconds", 4);
startCountdown("Day", "Hour", "Minute", "Second", 6);

var button = document.getElementById("goTop");
var btnTop = document.getElementById("btnTop");
// Thêm sự kiện cho nút
button.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
// Thêm sự kiện cuộn trang
window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        btnTop.style.display = "block";
    } else {
        btnTop.style.display = "none";
    }
});

