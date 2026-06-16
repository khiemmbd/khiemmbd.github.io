// ANIMATION LOADING
$(document).ready(function () {
  $("#loading").addClass("hide");
  $("#content").addClass("visibility");
  setTimeout(() => {
    loading.style.display = "none";
  }, 500);

  // FIX PLAY BUTTON POSITION
  const $elements = $('.tab-1 .play, .tab-1 .download, .tab-1 .download-pc, .tab-1 .logo, .tab-1 .desk-fixed');
  $elements.css('visibility', 'hidden');

  $('.tab-1 video').on('canplay', function () {
    $elements.css('visibility', 'visible');
  });

  setTimeout(() => {
    $elements.css('visibility', 'visible');
  }, 1000);

  // INIT SLIDESHOW
  initSlideshow();
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
  element.scrollIntoView({ behavior: "smooth" });
}

function switchTab(tab) {
  $('.news-tab').removeClass('active');
  $(event.target).addClass('active');

  if (tab === 'event') {
    $('#news-img').attr('src', 'publics/images/tab-2/slide2.webp');
    $('#news-title').text('EVENT');
    $('#news-date').text('05-30 2022');
  } else {
    $('#news-img').attr('src', 'publics/images/tab-2/slide1.webp');
    $('#news-title').text('LATEST NEWS');
    $('#news-date').text('05-30 2022');
  }
}

const slides = [
  "publics/images/tab-2/slide1.webp",
  "publics/images/tab-2/slide2.webp"
];
let currentSlide = 0;
let slideInterval;

function initSlideshow() {
  const $imageCol = $('.news-image-col');

  $imageCol.find('img').eq(1).remove();

  const $dotsContainer = $('<div class="slide-dots"></div>');
  slides.forEach((_, i) => {
    const $dot = $(`<span class="slide-dot ${i === 0 ? 'active' : ''}"></span>`);
    $dot.on('click', () => goToSlide(i));
    $dotsContainer.append($dot);
  });
  $imageCol.append($dotsContainer);

  slideInterval = setInterval(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, 3000);
}

function goToSlide(index) {
  const $imgEl = $('#news-img');

  $imgEl.css('opacity', '0');
  setTimeout(() => {
    currentSlide = index;
    $imgEl.attr('src', slides[currentSlide]).css('opacity', '1');
  }, 300);

  $('.slide-dot').each(function (i) {
    $(this).toggleClass('active', i === index);
  });
}

function openPopup(element, mess = null, mess2 = null, image = null) {
  closePopup();

  $("#popup").addClass("active");
  $("html").css("overflow", "hidden");
  $(`#${element}`).addClass("active");
  $("#popup_mess-noti").html(mess);
  $("#popup_mess-noti2").html(mess2);

  const video = document.querySelector(`#${element} video`);
  if (video) {
    video.currentTime = 0;
    video.play();
  }
}

function closePopup() {
  $("html").css("overflow", "auto");
  $("#popup").removeClass("active");
  $(".item-popup").removeClass("active");
  $("#popup_mess-noti").html("");

  $('video').each(function () {
    this.pause();
    this.currentTime = 0;
  });
}

function copyGiftCode() {
  const code = "TKUR5RWC";
  navigator.clipboard.writeText(code).then(() => {
    alert("Đã sao chép: " + code);
  });
}