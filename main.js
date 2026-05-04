

document.addEventListener("DOMContentLoaded", function () {
  initSwiper(".tab2Swiper", {
    delay: 2500,
    nextEl: ".tab2__arrow--next",
    prevEl: ".tab2__arrow--prev",
    dotsEl: ".tab2__dots",
    dotClass: "tab2__dot",
  });

  initTab2Detail();
  initTab3Sect();

  initSwiper(".tab4Swiper", {
    delay: 3000,
    nextEl: ".tab4__arrow--next",
    prevEl: ".tab4__arrow--prev",
    dotsEl: ".tab4__dots",
    dotClass: "tab4__dot",
  });
});


/* ================================
   SWIPER CHUNG CHO TAB 2 + TAB 4
================================ */

function initSwiper(selector, config) {
  if (typeof Swiper === "undefined") return;
  if (!document.querySelector(selector)) return;

  new Swiper(selector, {
    loop: true,
    speed: 700,

    autoplay: {
      delay: config.delay,
      disableOnInteraction: false,
    },

    navigation: {
      nextEl: config.nextEl,
      prevEl: config.prevEl,
    },

    pagination: {
      el: config.dotsEl,
      clickable: true,
      bulletClass: config.dotClass,
      bulletActiveClass: "is-active",
      renderBullet: function (index, className) {
        return '<span class="' + className + '"></span>';
      },
    },
  });
}


/* ================================
   TAB 2 - DETAIL TIN TỨC / SỰ KIỆN / THÔNG BÁO
================================ */

function initTab2Detail() {
  const landing = document.querySelector(".landing");
  const tab2 = document.getElementById("tab2");

  const openItems = document.querySelectorAll(".js-open-tab2-detail");
  const detailNavBtns = document.querySelectorAll(".tab2-detail__nav-btn");

  const detailTitle = document.getElementById("tab2DetailTitle");
  const detailContent = document.getElementById("tab2DetailContent");
  const homeLink = document.querySelector(".tab2-detail__home");

  if (!landing || !detailTitle || !detailContent) return;

  const detailTitleMap = {
    "tin-tuc": "Tin Tức",
    "su-kien": "Sự Kiện",
    "thong-bao": "Thông Báo",
  };

  function scrollToTab2() {
    const scrollTarget = tab2 || landing;

    scrollTarget.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function openTab2Detail(type) {
    const title = detailTitleMap[type];
    if (!title) return;

    landing.classList.add("is-detail-open");

    detailTitle.textContent = title;
    detailContent.textContent = "";

    detailNavBtns.forEach(function (btn) {
      btn.classList.toggle("is-active", btn.dataset.detail === type);
    });

    landing.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function closeTab2Detail() {
    landing.classList.remove("is-detail-open");
    scrollToTab2();
  }

  openItems.forEach(function (item) {
    item.addEventListener("click", function () {
      openTab2Detail(item.dataset.detail);
    });
  });

  detailNavBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      openTab2Detail(btn.dataset.detail);
    });
  });

  if (homeLink) {
    homeLink.addEventListener("click", function (e) {
      e.preventDefault();

      closeTab2Detail();

      if (history.pushState) {
        history.pushState(null, "", "trangchu.html#tab2");
      } else {
        window.location.hash = "tab2";
      }
    });
  }

  if (window.location.hash === "#tab2") {
    landing.classList.remove("is-detail-open");

    setTimeout(function () {
      scrollToTab2();
    }, 100);
  }
}


/* ================================
   TAB 3 - MÔN PHÁI
================================ */

function initTab3Sect() {
  const sectData = {
    "ba-dao": {
      name: "Bá Đao",
      nameImg: "public/tab3/text badao.webp",
      element: "Kim",
      hero: "public/tab3/nv-badao.webp",
      radar: "public/tab3/cs badao.webp",
      tag1: "Tử Dương",
      tag2: "Thiên La",
      desc:
        "Với Kỹ năng Thiên Ngoại Lưu Tinh tấn công phạm vi rộng từ khoảng cách xa, sát thương cộng dồn, chủ lực trong các cuộc hỗn chiến. Thêm vào một số bùa chú lợi hại, Thiên Nhẫn Đao là một vị trí không thể thiếu trong các cuộc chiến lớn.",
    },

    "co-mo": {
      name: "Cổ Mộ",
      nameImg: "public/tab3/text como.webp",
      element: "Mộc",
      hero: "public/tab3/nv-como.webp",
      radar: "public/tab3/cs como.webp",
      tag1: "Châm Mộ",
      tag2: "Kiếm Mộ",
      desc:
        "Tấn công tầm xa trong khoảng cách gần hệ nội công, phạm vi tấn công khá ngắn, xa hơn so với hệ phái cận chiến, chí mạng rất mạnh. Thời gian xung kích ngắn, cơ động, mạnh trong PK đơn, hội đồng khá tốt.",
    },

    "ngu-doc": {
      name: "Ngũ Độc",
      nameImg: "public/tab3/text ngudoc.webp",
      element: "Mộc",
      hero: "public/tab3/nv-ngudoc.webp",
      radar: "public/tab3/cs ngudoc.webp",
      tag1: "Đao Pháp",
      tag2: "Ngoại Công",
      desc:
        "Cưỡi ngựa tấn công phạm vi nhỏ phía trước, Vô Hình Độc của Ngũ Độc Đao khiến kẻ thù xung quanh nhiễm độc, giảm khả năng kháng độc đồng thời tăng thời gian trúng độc của địch.",
    },

    "cai-bang": {
      name: "Cái Bang",
      nameImg: "public/tab3/text caibang.webp",
      element: "Hỏa",
      hero: "public/tab3/nv-caibang.webp",
      radar: "public/tab3/cs caibang.webp",
      tag1: "Chưởng Pháp",
      tag2: "Bổng Pháp",
      desc:
        "Hội tụ đủ cả 2 khả năng tấn công từ xa một cá nhân hoặc trên một phạm vi rộng kèm theo khả năng truy kích, lấy tấn công làm thế mạnh của mình. Một trong các hệ phái được anh hùng ưa chuộng nhất dòng Kiếm Thế.",
    },

    "con-lon": {
      name: "Côn Lôn",
      nameImg: "public/tab3/text conlon.webp",
      element: "Thổ",
      hero: "public/tab3/nv-conlon.webp",
      radar: "public/tab3/cs conlon.webp",
      tag1: "Kiếm Pháp",
      tag2: "Đao Pháp",
      desc:
        "Tấn công nhiều mục tiêu, phạm vi cực rộng, hóa giải sát thương, hỗ trợ đồng đội tăng sức chiến đấu và tốc độ di chuyển. Khi sinh mệnh rơi vào trạng thái nguy cấp thì có thể kích hoạt năng lực né tránh hoàn toàn, tăng tốc độ di chuyển và hồi phục sinh mệnh.",
    },

    "doan-thi": {
      name: "Đoàn Thị",
      nameImg: "public/tab3/text doanthi.webp",
      element: "Thủy",
      hero: "public/tab3/nv-doanthi.webp",
      radar: "public/tab3/cs doanthi.webp",
      tag1: "Kiếm Đoàn",
      tag2: "Chỉ Đoàn",
      desc:
        "Có thể tấn công vùng rộng từ khoảng cách hoặc tấn công cá thể ở khoảng cách gần đều được, có hiệu quả truy sát. Với kỹ năng Bắc Minh Thần Công có thể giúp bản thân và đồng đội hóa giải một lượng sát thương nhất định.",
    },

    "duong-mon": {
      name: "Đường Môn",
      nameImg: "public/tab3/text duongmon.webp",
      element: "Mộc",
      hero: "public/tab3/nv-duongmon.webp",
      radar: "public/tab3/cs duongmon.webp",
      tag1: "Tụ Tiễn",
      tag2: "Hàm Tĩnh",
      desc:
        "Cưỡi ngựa tấn công kẻ địch cùng kỹ năng Bạo Vũ Lê Hoa cấp 90 làm mưa làm gió gây ra nhiều tổn hại liên tục. Tính cơ động và khả năng né tránh cao. Ngoài ra kỹ năng Tôi Độc Thuật của Đường Môn Tiễn có khả năng hỗ trợ đồng đội, tăng tốc độ di chuyển và hồi phục sinh mệnh.",
    },

    "minh-giao": {
      name: "Minh Giáo",
      nameImg: "public/tab3/text minhgiao.webp",
      element: "Hỏa",
      hero: "public/tab3/nv-minhgiao.webp",
      radar: "public/tab3/cs minh giao.webp",
      tag1: "Chùy",
      tag2: "Kiếm",
      desc:
        "Một chiến binh cận chiến trên lưng ngựa, tấn công đối thủ một cách nhanh chóng và cơ động. Nổi tiếng với Kim Qua Thiết Mã, có thể giúp đồng đội và bản thân gia tăng khả năng công kích tất sát.",
    },

    "nga-mi": {
      name: "Nga Mi",
      nameImg: "public/tab3/text ngamy.webp",
      element: "Thủy",
      hero: "public/tab3/nv-ngamy.webp",
      radar: "public/tab3/cs ngamy.webp",
      tag1: "Chưởng Pháp",
      tag2: "Kiếm Pháp",
      desc:
        "Tấn công từ xa, có hiệu quả truy sát, gây sát thương khá lớn trên một địch thủ, lại có khả năng hồi phục tương đối để hỗ trợ cho bản thân và cho đồng đội.",
    },

    "thien-nhan": {
      name: "Thiên Nhẫn",
      nameImg: "public/tab3/text thiennhan.webp",
      element: "Hỏa",
      hero: "public/tab3/nv-thiennhan.webp",
      radar: "public/tab3/cs thiennhan.webp",
      tag1: "Đao Pháp",
      tag2: "Thương Pháp",
      desc:
        "Với Kỹ năng Thiên Ngoại Lưu Tinh tấn công phạm vi rộng từ khoảng cách xa, sát thương cộng dồn, chủ lực trong các cuộc hỗn chiến. Thêm vào một số bùa chú lợi hại, Thiên Nhẫn Đao là một vị trí không thể thiếu trong các cuộc chiến lớn.",
    },

    "thien-vuong": {
      name: "Thiên Vương",
      nameImg: "public/tab3/text thienvuong.webp",
      element: "Kim",
      hero: "public/tab3/nv-thienvuong.webp",
      radar: "public/tab3/cs thienvuong.webp",
      tag1: "Thương Pháp",
      tag2: "Chùy Pháp",
      desc:
        "Lấy ngoại công làm trọng. Tấn công cận chiến, đơn lẻ, Thiên Vương Thương cùng với kỹ năng tên tuổi Truy Tinh Trục Nguyệt với tốc độ nhanh, sát thương lớn khiến kẻ địch bị tiêu diệt nhanh chóng.",
    },

    "thuy-yen": {
      name: "Thúy Yên",
      nameImg: "public/tab3/text thuyyen.webp",
      element: "Thủy",
      hero: "public/tab3/nv-thuyyen.webp",
      radar: "public/tab3/cs thuyyen.webp",
      tag1: "Kiếm Pháp",
      tag2: "Đao Pháp",
      desc:
        "Tấn công từ xa, sở trường tấn công nhiều người cùng lúc, có khả năng giảm đi những hiệu ứng bất lợi trên cơ thể.",
    },

    "vo-dang": {
      name: "Võ Đang",
      nameImg: "public/tab3/text vodang.webp",
      element: "Kim",
      hero: "public/tab3/nv-vodang.webp",
      radar: "public/tab3/cs vodanhg.webp",
      tag1: "Khí Pháp",
      tag2: "Kiếm Pháp",
      desc:
        "Tấn công phạm vi rộng từ xa, gây hiệu quả cộng dồn. Với kỹ năng Tọa Vọng làm nên tên tuổi Võ Đang, dùng nội lực hóa giải sát thương, có vai trò cực kì quan trọng trong các trận hỗn chiến và tăng tấn công nội công của đồng đội.",
    },

    "thieu-lam": {
      name: "Thiếu Lâm",
      nameImg: "public/tab3/text thieulam.webp",
      element: "Kim",
      hero: "public/tab3/nv-thieulam.webp",
      radar: "public/tab3/cs thieulam.webp",
      tag1: "Đao Pháp",
      tag2: "Bổng Pháp",
      desc:
        "Thiếu Lâm Đao nghiêng về tấn công trực diện, cộng với khả năng phòng thủ xuất sắc, linh hoạt trong chiến đấu và có thể phản đòn gây sát thương cho đối phương.",
    },
  };

  const sectButtons = document.querySelectorAll(".tab3__sect-btn");

  const heroImg = document.getElementById("tab3HeroImg");
  const radarImg = document.getElementById("tab3RadarImg");
  const nameImg = document.getElementById("tab3NameImg");
  const elementEl = document.getElementById("tab3Element");
  const tag1El = document.getElementById("tab3Tag1");
  const tag2El = document.getElementById("tab3Tag2");
  const descEl = document.getElementById("tab3Desc");

  if (
    !heroImg ||
    !radarImg ||
    !nameImg ||
    !elementEl ||
    !tag1El ||
    !tag2El ||
    !descEl ||
    sectButtons.length === 0
  ) {
    return;
  }

  function updateSect(key) {
    const data = sectData[key];
    if (!data) return;

    heroImg.src = data.hero;
    heroImg.alt = data.name;

    radarImg.src = data.radar;
    radarImg.alt = "Chỉ số " + data.name;

    nameImg.src = data.nameImg;
    nameImg.alt = data.name;

    elementEl.textContent = data.element;
    tag1El.textContent = data.tag1;
    tag2El.textContent = data.tag2;
    descEl.textContent = data.desc;

    sectButtons.forEach(function (button) {
      button.classList.toggle("is-active", button.dataset.sect === key);
    });
  }

  sectButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      updateSect(button.dataset.sect);
    });
  });

  updateSect("ba-dao");
}


/* ================================
   NAV RIGHT / COMMON FUNCTIONS
================================ */

function toggleNavRight() {
  const navRight = document.getElementById("navRight");
  if (!navRight) return;

  navRight.classList.toggle("is-collapsed");
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function openGameStore(type) {
  const storeLinks = {
    googleplay: "https://bit.ly/GGPlayVoKiemOrigin",
    appstore: "https://apps.apple.com/vn/app/id6476908221",
    android: "https://apkpure.com/vn/ki%E1%BA%BFm-t%C3%B4n-origin/skywave.kiemton.origin/download",
  };

  const link = storeLinks[type];
  if (!link) return;

  window.open(link, "_blank", "noopener,noreferrer");
}

function opennapthe() {
  window.open("https://pay.zoneplay.vn/", "_blank");
}