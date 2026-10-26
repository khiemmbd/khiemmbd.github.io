/* Thiên Long Hoài Niệm – Home
   Sửa link, video, tin tức, mô tả môn phái trong CONFIG bên dưới. */
(function () {
  'use strict';

  var CONFIG = {
    // link thật – để '#' thì bấm sẽ hiện "Đang cập nhật"
    links: {
      fanpage: '#',
      groupFacebook: '#',
      groupZalo: '#',
      topup: '#',
      register: '#',
      login: '#',
      giftcode: '#',
      googlePlay: '#',
      appStore: '#',
      apk: '#',
      newsAll: '#',
      guideTopup: '#',
      guideNewbie: '#',
      guideCode: '#',
      about: '#',
      terms: '#',
      account: '#',
      support: '#',
      license: '#'
    },
    videoId: '',          // ID YouTube của video giới thiệu, vd 'dQw4w9WgXcQ'
    slideInterval: 5000,

    // tin tức mẫu – thay bằng dữ liệu thật / API
    news: [
      { cat: 'guide', tag: 'Hướng dẫn', title: 'Hướng dẫn tải và cài đặt Thiên Long Hoài Niệm', date: '20/10', url: '#' },
      { cat: 'event', tag: 'Sự kiện', title: 'Mừng ra mắt – Đăng nhập 7 ngày nhận Ngựa Tuyết', date: '19/10', url: '#' },
      { cat: 'news', tag: 'Tin tức', title: 'Thông báo mở máy chủ mới Lạc Dương', date: '18/10', url: '#' },
      { cat: 'event', tag: 'Sự kiện', title: 'Nạp thẻ lần đầu x2 KNB – nhận ngay Thần Binh', date: '17/10', url: '#' },
      { cat: 'guide', tag: 'Hướng dẫn', title: 'Cẩm nang chọn môn phái cho tân thủ', date: '16/10', url: '#' },
      { cat: 'news', tag: 'Tin tức', title: 'Cập nhật phiên bản 1.0.2 – tối ưu hiệu năng', date: '15/10', url: '#' },
      { cat: 'guide', tag: 'Hướng dẫn', title: 'Hướng dẫn nhập Giftcode trong game', date: '14/10', url: '#' },
      { cat: 'event', tag: 'Sự kiện', title: 'Võ Lâm Đại Hội – tranh tài nhận danh hiệu', date: '13/10', url: '#' },
      { cat: 'news', tag: 'Tin tức', title: 'Lịch bảo trì định kỳ hàng tuần', date: '12/10', url: '#' },
      { cat: 'guide', tag: 'Hướng dẫn', title: 'Hướng dẫn nạp thẻ an toàn, nhanh chóng', date: '11/10', url: '#' },
      { cat: 'news', tag: 'Tin tức', title: 'Ra mắt Fanpage & Group Zalo chính thức', date: '10/10', url: '#' },
      { cat: 'event', tag: 'Sự kiện', title: 'Đua top cấp độ – quà khủng cho 100 cao thủ', date: '09/10', url: '#' },
      { cat: 'news', tag: 'Tin tức', title: 'Mở đăng ký trước – nhận Gói Tân Thủ', date: '08/10', url: '#' },
      { cat: 'guide', tag: 'Hướng dẫn', title: 'Hướng dẫn liên kết tài khoản Gzone', date: '07/10', url: '#' }
    ],
    newsPerTab: 7,

    // ảnh đặc sắc
    slides: [
      'images/slide-1.png',
      'images/hero-keyart.png',
      'images/news-cover.png',
      'images/gameplay.png'
    ],

    // môn phái – chỉ mô tả Cái Bang lấy từ Figma, còn lại là nội dung mẫu
    defaultPhai: 'tieudao',
    phai: [
      { key: 'thienlong', name: 'Thiên Long', desc: 'Thiên Long Tự toạ lạc giữa núi non Đại Lý, là chốn tu hành của hoàng tộc họ Đoàn. Nhất Dương Chỉ và Lục Mạch Thần Kiếm uy chấn thiên hạ, vừa trị thương cứu người vừa có thể khắc chế cường địch.' },
      { key: 'vodang', name: 'Võ Đang', desc: 'Võ Đang lấy nhu khắc cương, dĩ tĩnh chế động. Thái Cực Quyền, Thái Cực Kiếm của Trương Tam Phong nhẹ như mây trôi mà ẩn chứa sức mạnh vô cùng, là một trong hai đại môn phái chính đạo.' },
      { key: 'minhgiao', name: 'Minh Giáo', desc: 'Minh Giáo khởi nguồn từ Ba Tư, thờ Thánh Hoả, giáo chúng trải khắp giang hồ. Càn Khôn Đại Na Di cùng hoả công bá đạo khiến kẻ địch khiếp vía, chính tà khó phân, hành sự tuỳ tâm.' },
      { key: 'tinhtuc', name: 'Tinh Túc', desc: 'Tinh Túc Phái ở vùng Tây Vực, tinh thông dụng độc. Hoá Công Đại Pháp cùng trăm loại kỳ độc khiến đối thủ khó lòng phòng bị, mỗi chiêu thức đều ẩn chứa hiểm nguy chết người.' },
      { key: 'thieulam', name: 'Thiếu Lâm', desc: 'Thiên hạ võ công xuất Thiếu Lâm. Bảy mươi hai tuyệt kỹ cùng Dịch Cân Kinh giúp đệ tử nhà Phật thân như kim cương, lấy từ bi làm gốc, là thành trì vững chắc của võ lâm chính phái.' },
      { key: 'caibang', name: 'Cái Bang', desc: 'Vào thời Tống giang hồ loạn lạc, Uông Kiếm Thông đã hiệu lệnh ăn mày khắp chốn, lập Phân Đà, tôn Trưởng Lão, Đả Cẩu Bổng vung lên nhất hô bách ứng. Mấy mươi năm thiên hạ, Cái Bang như một đạo binh hùng mạnh khiến vương triều Tống – Liêu chấn động.' },
      { key: 'tieudao', name: 'Tiêu Dao', desc: 'Tiêu Dao Phái ẩn mình nơi núi sâu, đệ tử thông hiểu cầm kỳ thi hoạ, y bốc tinh tường. Bắc Minh Thần Công, Lăng Ba Vi Bộ phiêu dật như tiên, ra tay khi thì cứu người, khi thì đoạt mạng trong nháy mắt.' },
      { key: 'ngami', name: 'Nga Mi', desc: 'Nga Mi do Quách Tương sáng lập trên núi Nga Mi đất Thục. Nữ đệ tử thanh tao mà kiên cường, kiếm pháp linh động cùng tâm pháp hồi phục giúp đồng đội trụ vững giữa chiến trường khốc liệt.' },
      { key: 'thienson', name: 'Thiên Sơn', desc: 'Thiên Sơn Phái nằm giữa băng tuyết Linh Thứu Cung, sở trường Sinh Tử Phù và Thiên Sơn Lục Dương Chưởng. Thân pháp nhanh như gió, xuất chiêu bất ngờ, đoạt mạng địch thủ trong chớp mắt.' }
    ]
  };

  // vùng cắt icon môn phái (lấy từ Figma). box = inset khung (top right bottom left), img = h/l/t/w
  var ICON = {
    thienlong: { box: '11.66% 3.33%', img: [106.49, -3.57, -4.35, 106.48] },
    vodang: { box: '14.15%', img: [113.92, -16.28, -6.98, 134.3] },
    minhgiao: { box: '8.33% 16.67% 10% 16.67%', img: [111.79, -15, -4.08, 126.38] },
    tinhtuc: { box: '8.33% 21.67% 10% 21.67%', img: [110.51, -11.76, -6.12, 152.36] },
    thieulam: { box: '6.67% 16.67% 8.33% 16.67%', img: [102.8, -22.5, -1.96, 131.07] },
    caibang: { box: '11.67% 10% 13.33% 23.33%', img: [103.29, -15, 0, 122.46] },
    tieudao: { box: '15% 6.67% 16.67% 5%', img: [109.93, 0, -2.44, 113.69] },
    ngami: { box: '6.67% 15% 6.67% 13.33%', img: [103.53, -2.33, -1.92, 107.37] },
    thienson: { box: '16.67% 6.67% 18.33% 6.67%', img: [105.54, 0, -2.56, 101.43] }
  };

  // vị trí cuộn tới các mục (toạ độ artboard)
  var ANCHORS = {
    desktop: { top: 0, news: 1000, monphai: 1960, dacsac: 2950 },
    mobile: { top: 0, news: 900, monphai: 2000, dacsac: 2780 }
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement;
  root.classList.add('js');

  /* ---------- scale ---------- */
  var mq = window.matchMedia('(max-width: 900px)');
  var k = 1;

  function fit() {
    var W = mq.matches ? 640 : 1920;
    k = root.clientWidth / W;
    root.style.setProperty('--k', k);
  }

  fit();
  window.addEventListener('resize', fit);

  /* ---------- toast ---------- */
  var toastEl = $('#toast');
  var toastT;

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2200);
  }

  /* ---------- link ---------- */
  $$('[data-link]').forEach(function (a) {
    var url = CONFIG.links[a.getAttribute('data-link')];
    if (url && url !== '#') {
      a.href = url;
    } else {
      a.removeAttribute('target');
      a.addEventListener('click', function (e) {
        e.preventDefault();
        toast('Tính năng đang được cập nhật, quay lại sau nhé!');
      });
    }
  });

  /* ---------- cuộn tới mục ---------- */
  function headerH() {
    return mq.matches ? 94 * k : 52 * k;
  }

  function goTo(id) {
    var map = mq.matches ? ANCHORS.mobile : ANCHORS.desktop;
    if (!(id in map)) return false;
    var y = id === 'top' ? 0 : map[id] * k - headerH();
    window.scrollTo({ top: y, behavior: 'smooth' });
    return true;
  }

  $$('a[href^="#"]').forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    if (!id) return;
    a.addEventListener('click', function (e) {
      if (goTo(id)) {
        e.preventDefault();
        history.replaceState(null, '', id === 'top' ? location.pathname : '#' + id);
      }
    });
  });

  window.addEventListener('load', function () {
    var id = location.hash.slice(1);
    if (id) setTimeout(function () { goTo(id); }, 60);
  });

  var nav = $('#nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ---------- menu mobile ---------- */
  var burger = $('#burger');
  var drawer = $('#drawer');

  function setDrawer(open) {
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
  }

  burger.addEventListener('click', function () {
    setDrawer(!drawer.classList.contains('is-open'));
  });
  $$('[data-close-drawer]').forEach(function (a) {
    a.addEventListener('click', function () { setDrawer(false); });
  });
  mq.addEventListener('change', function () { setDrawer(false); fit(); });

  /* ---------- video ---------- */
  var modal = $('#videoModal');
  var slot = $('#videoSlot');
  var lastFocus;

  function openVideo() {
    lastFocus = document.activeElement;
    slot.innerHTML = CONFIG.videoId
      ? '<iframe src="https://www.youtube.com/embed/' + encodeURIComponent(CONFIG.videoId) +
        '?autoplay=1&rel=0" title="Video giới thiệu" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>'
      : '<p>Video giới thiệu sẽ sớm ra mắt!</p>';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    $('[data-close]', modal).focus();
  }

  function closeVideo() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    slot.innerHTML = '';
    if (lastFocus) lastFocus.focus();
  }

  $$('[data-action="video"]').forEach(function (b) { b.addEventListener('click', openVideo); });
  modal.addEventListener('click', function (e) {
    if (e.target === modal || e.target.closest('[data-close]')) closeVideo();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (modal.classList.contains('is-open')) closeVideo();
    else if (drawer.classList.contains('is-open')) setDrawer(false);
  });

  /* ---------- tin tức ---------- */
  var list = $('#newsList');
  var tabs = $$('.ntab');

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function renderNews(cat) {
    var items = CONFIG.news.filter(function (n) { return cat === 'new' || n.cat === cat; })
      .slice(0, CONFIG.newsPerTab);
    list.innerHTML = items.map(function (n, i) {
      return '<li style="--i:' + i + '"><a href="' + esc(n.url) + '"><span><b>[' + esc(n.tag) + ']</b> ' +
        esc(n.title) + '</span><time>' + esc(n.date) + '</time></a></li>';
    }).join('');
    $$('a', list).forEach(function (a) {
      if (a.getAttribute('href') === '#') {
        a.addEventListener('click', function (e) { e.preventDefault(); toast('Bài viết đang được cập nhật.'); });
      }
    });
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) {
        var on = x === t;
        x.classList.toggle('is-active', on);
        x.setAttribute('aria-selected', String(on));
      });
      renderNews(t.getAttribute('data-tab'));
    });
  });
  renderNews('new');

  /* ---------- môn phái ---------- */
  function iconHTML(key) {
    var c = ICON[key];
    var m = c.img;
    return '<span style="inset:' + c.box + '"><img src="images/phai-ic/' + key + '.png" alt="" style="height:' + m[0] +
      '%;left:' + m[1] + '%;top:' + m[2] + '%;width:' + m[3] + '%"></span>';
  }

  var sel = $('#mpSel');
  var art = $('#mpArt');
  var charImg = $('#mpChar');
  var cur = -1;

  sel.innerHTML = CONFIG.phai.map(function (p, i) {
    return '<button class="msel" type="button" role="tab" aria-selected="false" data-i="' + i + '">' +
      '<img class="msel__bg" src="images/sel-bg.png" alt="">' +
      '<img class="msel__bg msel__bg--on" src="images/sel-bg-on.png" alt="">' +
      '<span class="micon">' + iconHTML(p.key) + '</span>' +
      '<span class="msel__name">' + esc(p.name) + '</span></button>';
  }).join('');
  var sels = $$('.msel', sel);

  // tải trước ảnh nhân vật
  CONFIG.phai.forEach(function (p) { new Image().src = 'images/phai/' + p.key + '.png'; });

  function setPhai(i, instant) {
    i = (i + CONFIG.phai.length) % CONFIG.phai.length;
    if (i === cur) return;
    cur = i;
    var p = CONFIG.phai[i];

    sels.forEach(function (b, j) {
      b.classList.toggle('is-active', j === i);
      b.setAttribute('aria-selected', String(j === i));
    });
    var b = sels[i];
    sel.scrollTo({ left: b.offsetLeft - (sel.clientWidth - b.offsetWidth) / 2, behavior: instant ? 'auto' : 'smooth' });

    $('#mpName').textContent = p.name;
    $('#mpDesc').textContent = p.desc;
    var ic = $('#mpIcon');
    ic.setAttribute('data-p', p.key);
    ic.innerHTML = iconHTML(p.key);

    function swap() {
      charImg.src = 'images/phai/' + p.key + '.png';
      charImg.alt = p.name;
      charImg.style.objectFit = p.key === 'tieudao' ? 'cover' : 'contain';
      art.classList.remove('is-changing');
    }

    if (instant) {
      swap();
    } else {
      art.classList.add('is-changing');
      setTimeout(swap, 300);
    }
  }

  sel.addEventListener('click', function (e) {
    var b = e.target.closest('.msel');
    if (b) setPhai(+b.getAttribute('data-i'));
  });
  $$('[data-sel]').forEach(function (b) {
    b.addEventListener('click', function () { setPhai(cur + +b.getAttribute('data-sel')); });
  });
  sel.addEventListener('keydown', function (e) {
    var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    setPhai(cur + d);
    sels[cur].focus();
  });

  var defIdx = CONFIG.phai.findIndex(function (p) { return p.key === CONFIG.defaultPhai; });
  setPhai(defIdx < 0 ? 0 : defIdx, true);

  /* ---------- slider đặc sắc ---------- */
  var slides = CONFIG.slides;
  var slider = $('#slider');
  var mainImg = $('.slider__img', slider);
  var prevImg = $('.slider__side--prev img', slider);
  var nextImg = $('.slider__side--next img', slider);
  var dotsEl = $('#dots');
  var si = 0;
  var timer;

  dotsEl.innerHTML = slides.map(function (_, i) {
    return '<button class="dot" type="button" role="tab" aria-label="Ảnh ' + (i + 1) + '" data-i="' + i + '"></button>';
  }).join('');
  var dots = $$('.dot', dotsEl);
  slides.forEach(function (s) { new Image().src = s; });

  function show(i, instant) {
    var n = slides.length;
    si = (i + n) % n;
    function apply() {
      mainImg.src = slides[si];
      prevImg.src = slides[(si - 1 + n) % n];
      nextImg.src = slides[(si + 1) % n];
      mainImg.classList.remove('is-fading');
    }
    if (instant) {
      apply();
    } else {
      mainImg.classList.add('is-fading');
      setTimeout(apply, 250);
    }
    dots.forEach(function (d, j) {
      d.classList.toggle('is-active', j === si);
      d.setAttribute('aria-selected', String(j === si));
    });
  }

  function play() {
    clearInterval(timer);
    timer = setInterval(function () { show(si + 1); }, CONFIG.slideInterval);
  }

  dotsEl.addEventListener('click', function (e) {
    var d = e.target.closest('.dot');
    if (d) { show(+d.getAttribute('data-i')); play(); }
  });
  $$('[data-slide]', slider).forEach(function (b) {
    b.addEventListener('click', function () { show(si + +b.getAttribute('data-slide')); play(); });
  });
  slider.addEventListener('mouseenter', function () { clearInterval(timer); });
  slider.addEventListener('mouseleave', play);

  // vuốt trên mobile
  var sx = null;
  var main = $('.slider__main', slider);
  main.addEventListener('pointerdown', function (e) { sx = e.clientX; });
  main.addEventListener('pointerup', function (e) {
    if (sx === null) return;
    var dx = e.clientX - sx;
    sx = null;
    if (Math.abs(dx) > 40) { show(si + (dx < 0 ? 1 : -1)); play(); }
  });
  main.addEventListener('pointercancel', function () { sx = null; });

  show(0, true);
  play();

  /* ---------- hiện dần khi cuộn ---------- */
  var reveal = $$('.stitle, .ncover, .npanel, .guides, .mp-name, .mp-desc, .mp-shot, .mp-sel, .slider');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveal.forEach(function (el) {
      el.setAttribute('data-reveal', '');
      io.observe(el);
    });
  }
})();
