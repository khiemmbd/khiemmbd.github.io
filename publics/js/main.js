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

  
});

function handleMenuMobile() {
  $("#btn-menu_mobile").toggleClass("active");
  $("#menu_mobile").toggleClass("active");
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

