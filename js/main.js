(function () {
  'use strict';
  var C = window.CONFIG;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* ---------- Links từ CONFIG ---------- */
  $$('[data-link]').forEach(function (a) {
    var url = C.links[a.getAttribute('data-link')];
    if (url) a.setAttribute('href', url);
  });

  /* ---------- Header ---------- */
  var header = $('#siteHeader');
  var burger = $('#burger');
  var nav = $('#headerNav');
  burger.addEventListener('click', function () {
    var open = header.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', open);
  });
  $$('a', nav).forEach(function (a) {
    a.addEventListener('click', function () {
      header.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
  var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 40); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Trailer YouTube ---------- */
  var modal = $('#videoModal');
  var frame = $('#videoFrame');
  function ytId(url) {
    var m = String(url).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : url;
  }
  function closeVideo() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    frame.innerHTML = '';
    document.body.style.overflow = '';
  }
  $('#trailerBtn').addEventListener('click', function () {
    frame.innerHTML = '<iframe src="https://www.youtube.com/embed/' + ytId(C.trailer) +
      '?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="Trailer"></iframe>';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
  $('#videoClose').addEventListener('click', closeVideo);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeVideo(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('open')) closeVideo(); });

  /* ---------- Sidebar (thanh chạy) ---------- */
  $('#sidebarToggle').addEventListener('click', function () {
    $('#sidebar').classList.toggle('collapsed');
  });

  /* ---------- Tin tức ---------- */
  var NEWS_ROWS = 7; // số dòng cố định để khung tin cao bằng slider
  var CAT_LABEL = { news: 'Tin Tức', event: 'Sự Kiện', guide: 'Hướng Dẫn' };

  $('#newsSlider .swiper-wrapper').innerHTML = C.newsSlides.map(function (s) {
    return '<a class="swiper-slide" href="' + esc(s.link) + '"><img src="' + esc(s.img) + '" alt="' + esc(s.title) + '" loading="lazy" /></a>';
  }).join('');

  new Swiper('#newsSlider', {
    loop: C.newsSlides.length > 1,
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: { el: '#newsSlider .swiper-pagination', clickable: true },
  });

  function renderNews(cat) {
    var items = C.news.filter(function (n) { return cat === 'all' || n.cat === cat; }).slice(0, NEWS_ROWS);
    $('#newsList').innerHTML = items.map(function (n) {
      return '<li><a href="' + esc(n.link) + '">' +
        '<span class="tag tag-' + n.cat + '">【' + CAT_LABEL[n.cat] + '】</span>' +
        '<span class="title">' + esc(n.title) + '</span>' +
        '<time>' + esc(n.date) + '</time></a></li>';
    }).join('') || '<li class="empty">Chưa có bài viết.</li>';
  }
  $$('.news-tabs button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      $$('.news-tabs button').forEach(function (b) { b.classList.toggle('active', b === btn); });
      renderNews(btn.getAttribute('data-cat'));
    });
  });
  renderNews('all');

  $('#newsCards').innerHTML = C.newsCards.map(function (c) {
    var href = c.link || (C.links.newsList + (c.cat && c.cat !== 'all' ? '?cat=' + c.cat : ''));
    return '<a class="news-card" href="' + esc(href) + '"' + (c.link ? ' target="_blank"' : '') + '>' +
      '<img src="' + esc(c.img) + '" alt="" loading="lazy" /><span>' + esc(c.label) + '</span></a>';
  }).join('');

  $('#guides').innerHTML = C.guides.map(function (g) {
    return '<a class="guide panel" href="' + esc(g.link) + '">' +
      '<div class="guide-text"><b>' + esc(g.line1) + '<br />' + esc(g.line2) + '</b><span class="guide-more">Xem thêm +</span></div>' +
      '<img src="' + esc(g.img) + '" alt="" loading="lazy" /></a>';
  }).join('');

  /* ---------- Môn phái ---------- */
  var tabs = $('#sectTabs');
  tabs.innerHTML = C.sects.map(function (s, i) {
    return '<button class="sect-tab" data-i="' + i + '"><i><img src="' + esc(s.icon) + '" alt="" /></i><span>' + esc(s.name) + '</span></button>';
  }).join('');

  var stage = $('#sectStage');
  function showSect(i) {
    var s = C.sects[i];
    $$('.sect-tab', tabs).forEach(function (b, j) { b.classList.toggle('active', i === j); });
    stage.classList.remove('show');
    void stage.offsetWidth; // restart animation
    $('#sectName').textContent = s.name;
    $('#sectRole').textContent = s.role;
    $('#sectDesc').textContent = s.desc;
    $('#sectChar').src = s.char;
    $('#sectChar').alt = s.name;
    $('#sectPreview').innerHTML = s.video
      ? '<video src="' + esc(s.video) + '" autoplay muted loop playsinline poster="' + esc(s.preview) + '"></video>'
      : '<img src="' + esc(s.preview) + '" alt="" />';
    stage.classList.add('show');
    var active = $('.sect-tab.active', tabs);
    if (active && tabs.scrollWidth > tabs.clientWidth) {
      tabs.scrollTo({ left: active.offsetLeft - tabs.clientWidth / 2 + active.clientWidth / 2, behavior: 'smooth' });
    }
  }
  tabs.addEventListener('click', function (e) {
    var b = e.target.closest('.sect-tab');
    if (b) showSect(+b.getAttribute('data-i'));
  });
  showSect(5); // Cái Bang như FigJam

  /* ---------- Bảng xếp hạng ---------- */
  var selServer = $('#rankServer');
  var selType = $('#rankType');
  selServer.innerHTML = C.servers.map(function (s) { return '<option value="' + esc(s.id) + '">' + esc(s.name) + '</option>'; }).join('');
  selType.innerHTML = C.rankTypes.map(function (t) { return '<option value="' + esc(t.id) + '">' + esc(t.name) + '</option>'; }).join('');

  // TODO API: thay hàm này bằng fetch tới API xếp hạng, trả về [{name, server, value}]
  function loadRanking(serverId, typeId) {
    var names = ['KiếmTiênVôSong', 'BạchY丶Khách', 'LãnhNguyệt', 'ThiênHạĐệNhất', 'PhongVânKiếm', 'TiểuLongNữ', 'VôDanhHiệp', 'HànSơnTuyết', 'ĐộcCôCầuBại', 'LăngBaVi'];
    var srv = C.servers.filter(function (s) { return s.id === serverId; })[0];
    var seed = serverId.length * 7 + typeId.length * 13 + serverId.charCodeAt(1);
    return Promise.resolve(names.map(function (n, i) {
      var base = typeId === 'level' ? 120 - i * 2 : typeId === 'power' ? 985000 - i * 41000 : 52000 - i * 3100;
      return { name: names[(i + seed) % names.length], server: srv ? srv.name.split(' - ')[0] : '', value: base };
    }));
  }

  function renderRanking() {
    var type = C.rankTypes.filter(function (t) { return t.id === selType.value; })[0];
    $('#rankCol').textContent = type ? type.col : 'Level';
    loadRanking(selServer.value, selType.value).then(function (rows) {
      $('#rankBody').innerHTML = rows.map(function (r, i) {
        var rank = i + 1;
        return '<tr class="' + (rank <= 3 ? 'top top-' + rank : '') + '">' +
          '<td><span class="rank-no">' + rank + '</span></td>' +
          '<td class="name">' + esc(r.name) + '</td>' +
          '<td>' + esc(r.server) + '</td>' +
          '<td>' + Number(r.value).toLocaleString('vi-VN') + '</td></tr>';
      }).join('');
    });
  }
  selServer.addEventListener('change', renderRanking);
  selType.addEventListener('change', renderRanking);
  renderRanking();

  /* ---------- Gameplay ---------- */
  // Nhân đôi slide để loop coverflow mượt khi chỉ có 5 ảnh
  var gpItems = C.gameplay.concat(C.gameplay);
  $('#gpSlider .swiper-wrapper').innerHTML = gpItems.map(function (g) {
    return '<div class="swiper-slide"><div class="gp-frame"><img src="' + esc(g.img) + '" alt="' + esc(g.title) + '" loading="lazy" /><span>' + esc(g.title) + '</span></div></div>';
  }).join('');

  var dots = $('.gp-pagination');
  dots.innerHTML = C.gameplay.map(function (_, i) { return '<button aria-label="Ảnh ' + (i + 1) + '"></button>'; }).join('');
  var syncDots = function (sw) {
    var real = sw.realIndex % C.gameplay.length;
    $$('button', dots).forEach(function (b, j) { b.classList.toggle('is-on', j === real); });
  };

  var gp = new Swiper('#gpSlider', {
    loop: true,
    centeredSlides: true,
    slidesPerView: 1.15,
    spaceBetween: 12,
    speed: 700,
    autoplay: { delay: 3500, disableOnInteraction: false },
    effect: 'coverflow',
    coverflowEffect: { rotate: 0, depth: 160, stretch: 0, modifier: 1, slideShadows: false },
    navigation: { prevEl: '.gp-prev', nextEl: '.gp-next' },
    on: { init: syncDots, slideChange: syncDots },
    breakpoints: {
      768: { slidesPerView: 1.6, spaceBetween: 30 },
    },
  });
  dots.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (b) gp.slideToLoop($$('button', dots).indexOf(b));
  });
})();
