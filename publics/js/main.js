// ANIMATION LOADING
$(document).ready(function () {
  $("#loading").addClass("hide");

  setTimeout(() => {
    loading.style.display = "none";
  }, 500);
});
// HEADER
function handleMenuMobile() {
  $("#btn-menu_mobile").toggleClass("active");
  $("#menu_mobile").toggleClass("active");
}
let isOpen = true;

const progressMap = ["0%","7.14%","21.43%","35.71%","50%","60%","72%","92%"];
document.querySelectorAll(".tab-1 .day-item").forEach(item => {
  item.addEventListener("click", () => {
    const day = +item.dataset.day;
    document.querySelectorAll(".tab-1 .day-item").forEach(el => el.classList.toggle("active", +el.dataset.day <= day));
    document.querySelector(".tab-1 .track-progress").style.width = progressMap[day];
  });
});
// CHỮ ÁP DỤNG TẠI ZGONE
 function letterBounceEffect() {
      const textZoneplay = document.querySelector(".text-zoneplay");
      const text = "Áp Dụng Khi Nạp Tại Zoneplay.vn";
      const highlightText = "Zoneplay.vn";

      textZoneplay.innerHTML = "";

      const highlightStartIndex = text.indexOf(highlightText);
      let delayCounter = 0;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          const spaceSpan = document.createElement("span");
          spaceSpan.innerHTML = "&nbsp;";
          spaceSpan.className = "letter";
          textZoneplay.appendChild(spaceSpan);
        } else {
          const span = document.createElement("span");
          span.textContent = text[i];
          span.className = "letter";

          if (
            i >= highlightStartIndex &&
            i < highlightStartIndex + highlightText.length
          ) {
            span.classList.add("highlight");
          }

          span.style.animationDelay = `${delayCounter * 0.1}s`;
          delayCounter++;
          textZoneplay.appendChild(span);
        }
      }
    }

    letterBounceEffect();
// ĐỒNG HỒ ĐẾM NGƯỢC

function updateCountdown() {
  const now = new Date();
  const targetDate = new Date("2026-06-20T23:59:59+07:00");
  if (now >= targetDate) {
    document.getElementById("countdown-text").innerHTML =
      "0 ngày 0 giờ 0 phút 0 giây";
    return;
  }

  const diff = targetDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("countdown-text").innerHTML =
    days + " ngày " + hours + " giờ " + minutes + " phút " + seconds + " giây";
}
// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// SLIDE MEMU
$("#btn-toggle-redirect").click(function () {
      let items = $(".layout-redirect .item");
      isOpen = !isOpen;

      $(this).find("img").toggleClass("hide");

      if (!isOpen) {
        $(items.get().reverse()).each(function (index) {
          setTimeout(() => $(this).addClass("hide-item"), index * 60);
        });
      } else {
        items.each(function (index) {
          setTimeout(() => $(this).removeClass("hide-item"), index * 60);
        });
      }
    });

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function scrollToTab2() {
      const element = document.querySelector(".tab2");
      element.scrollIntoView({
        behavior: "smooth",
      });
    }

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const dqItems = document.querySelectorAll(".tab-3 .dq-item");
  if (dqItems.length > 0) {
    gsap.set(dqItems, { opacity: 0, y: 60, scale: 0.8 });
    gsap.to(dqItems, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "back.out(1.7)",
      stagger: 0.12,
      scrollTrigger: {
        trigger: ".tab-3 .dq-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }
  const gifts = document.querySelectorAll(".tab-5 .list-gift .gift");

  if (gifts.length > 0) {
    gsap.set(gifts, { opacity: 0, y: 50, scale: 0.8 });

    gsap.to(gifts, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".tab-5 .list-gift", 
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  }

  const rewardItems = document.querySelectorAll("#list_item_reward .item");

  if (rewardItems.length > 0) {
    gsap.fromTo(
      rewardItems,
      { opacity: 0, scale: 0.5, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: "#list_item_reward",
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }

  ScrollTrigger.refresh();
});

document.querySelectorAll('#list_item_reward .btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    btn.closest('.item').classList.add('active'); 
  });
});

// POPUP
function openPopup(element, mess = null, mess2 = null, image = null) {
  closePopup();
  $("#popup").addClass("active");
  $("#backdrop").addClass("active");
  $("html").css("overflow", "hidden");
  $(`#${element}`).addClass("active");
  $("#popup_mess-noti").html(mess);
$(".list-btn-redirect").css("z-index", "1"); 
}

function closePopup() {
  $("html").css("overflow", "auto");
  $("#popup").removeClass("active");
  $(".item-popup").removeClass("active");
  $("#btn-xacnhan").html("");
  $("#popup_mess-noti").html("");
  $(".list-btn-redirect").css("z-index", "");
}
