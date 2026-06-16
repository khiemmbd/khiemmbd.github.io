// ANIMATION LOADING
$(document).ready(function () {
  $("#loading").addClass("hide");
  $("#content").addClass("visibility");
  setTimeout(() => {
    loading.style.display = "none";
  }, 500);
});
function handleMenuMobile() {
      $("#btn-menu_mobile").toggleClass("active");
      $("#menu_mobile").toggleClass("active");
    }

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function scrollToTab2() {
      const element = document.querySelector(".tab2");
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
function switchTab(tab) {
    document.querySelectorAll('.news-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');

    if (tab === 'event') {
        document.getElementById('news-img').src = 'publics/images/tab-2/slide2.webp';
        document.getElementById('news-title').innerText = 'EVENT';
        document.getElementById('news-date').innerText = '05-30 2022';
    } else {
        document.getElementById('news-img').src = 'publics/images/tab-2/slide1.webp';
        document.getElementById('news-title').innerText = 'LATEST NEWS';
        document.getElementById('news-date').innerText = '05-30 2022';
    }
}
const slides = [
    "publics/images/tab-2/slide1.webp",
    "publics/images/tab-2/slide2.webp"
];
let currentSlide = 0;
let slideInterval;

function initSlideshow() {
    const imgEl = document.getElementById('news-img');
    const imageCol = document.querySelector('.news-image-col');

    const extraImg = imageCol.querySelectorAll('img')[1];
    if (extraImg) extraImg.remove();

    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slide-dots';

    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    });
    imageCol.appendChild(dotsContainer);
    slideInterval = setInterval(() => {
        goToSlide((currentSlide + 1) % slides.length);
    }, 3000);
}

function goToSlide(index) {
    const imgEl = document.getElementById('news-img');
    const dots = document.querySelectorAll('.slide-dot');

    imgEl.style.opacity = '0';
    setTimeout(() => {
        currentSlide = index;
        imgEl.src = slides[currentSlide];
        imgEl.style.opacity = '1';
    }, 300);
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
}
document.addEventListener('DOMContentLoaded', initSlideshow);

function openPopup(element, mess = null, mess2 = null, image = null) {

  closePopup();

  $("#popup").addClass("active");
  $("html").css("overflow", "hidden");

  $(`#${element}`).addClass("active");

  $("#popup_mess-noti").html(mess);
  $("#popup_mess-noti2").html(mess2);

  const video = document.querySelector(`#${element} video`);

  if(video){
      video.currentTime = 0;
      video.play();
  }
}

function closePopup() {

  $("html").css("overflow", "auto");
  $("#popup").removeClass("active");
  $(".item-popup").removeClass("active");

  $("#popup_mess-noti").html("");

  document.querySelectorAll("video").forEach(video => {
      video.pause();
      video.currentTime = 0;
  });
}
function copyGiftCode() {
    const code = "TKUR5RWC";

    navigator.clipboard.writeText(code)
        .then(() => {
            alert("Đã sao chép: " + code);
        });
}