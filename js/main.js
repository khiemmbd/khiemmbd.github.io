/* Mỹ Nữ Onsen – Trang Chủ. Dữ liệu sửa trong js/data.js */
(function () {
  'use strict';

  var $ = App.$;
  var $$ = App.$$;
  var esc = App.esc;
  var pad = App.pad;
  var toast = App.toast;

  // vị trí các mục (toạ độ artboard)
  var ANCHORS = {
    desktop: { top: 0, sukien: 1080, bxh: 2104, mynu: 3184, dacsac: 4233 },
    mobile: { top: 0, sukien: 1407, bxh: 2724, mynu: 3718, dacsac: 5163 }
  };

  /* ---------- cuộn tới mục ---------- */
  function goTo(id) {
    var map = App.mq.matches ? ANCHORS.mobile : ANCHORS.desktop;
    if (!(id in map)) return false;
    var y = id === 'top' ? 0 : map[id] * App.k - (App.mq.matches ? 94 * App.k : 0);
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

  // "Trang Chủ" ở thanh bên: đang ở trang chủ thì lên đầu trang
  $$('[data-home]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  /* ---------- video + âm thanh trang 1 ---------- */
  var video = $('#heroVideo');
  var music = $('#music');
  if (CONFIG.heroVideo) {
    video.src = CONFIG.heroVideo;
    video.hidden = false;
    video.play().catch(function () {});
  }
  var soundOn = false;
  var heroSeen = true;

  function applySound() {
    video.muted = !(soundOn && heroSeen);
    music.setAttribute('aria-pressed', String(soundOn));
    music.setAttribute('aria-label', soundOn ? 'Tắt âm thanh' : 'Bật âm thanh');
  }

  music.addEventListener('click', function () {
    if (!CONFIG.heroVideo) {
      toast('Âm thanh sẽ sớm được cập nhật!');
      return;
    }
    soundOn = !soundOn;
    applySound();
    video.play().catch(function () {});
  });

  if (CONFIG.heroVideo && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      heroSeen = es[0].isIntersecting;
      applySound();
    }, { threshold: .25 }).observe($('.hero'));
  }

  // trailer
  $('[data-trailer]').addEventListener('click', function () {
    if (!CONFIG.trailer) {
      toast('Trailer sẽ sớm được cập nhật!');
      return;
    }
    var was = soundOn;
    soundOn = false;
    applySound();
    App.openPop({
      title: 'Trailer',
      html: '<iframe class="pop__video" src="' + esc(CONFIG.trailer) + (CONFIG.trailer.indexOf('?') < 0 ? '?' : '&') +
        'autoplay=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="Trailer Mỹ Nữ Onsen"></iframe>',
      onClose: function () { soundOn = was; applySound(); }
    });
  });

  // mã QR trong ô "Tải Game Ngay"
  if (CONFIG.qrImage) {
    var qr = $('#dlQr');
    qr.src = CONFIG.qrImage;
    qr.hidden = false;
  }

  /* ---------- banner slide trang 1 + banner sự kiện trang 2 ---------- */
  App.slider($('#bn'), $('#bnTrack'), $('#bnDots'), CONFIG.banners, CONFIG.bannerInterval);
  App.slider($('#evs'), $('#evsTrack'), $('#evsDots'), CONFIG.events, CONFIG.eventInterval);

  /* ---------- quà đăng nhập 8 ngày ---------- */
  $('#login8').innerHTML = CONFIG.login8.map(function (d, i) {
    var x = i < 4 ? 50 + i * 174 : 272 + (i - 4) * 174;
    var y = i < 4 ? 78 : 228;
    var on = d.on ? '-on' : '';
    var ill = d.item === 'heart'
      ? '<span class="itm"><img class="itm__f" src="publics/images/sk/it-frame.png" alt=""><img class="itm__c" src="publics/images/sk/it-crystal.png" alt="">' +
        '<span class="itm__m itm__m--heart"><img src="publics/images/sk/heart-captor.webp" alt=""></span><img class="itm__o" src="publics/images/sk/it-object.png" alt="">' +
        '<img class="itm__he itm__he--quang" src="publics/images/sk/ic-quang.svg" alt=""></span>'
      : '';
    return '<li class="day' + (d.on ? ' is-on' : '') + '" style="left:' + x + 'px;top:' + y + 'px"><span class="day__ring">' +
      '<img class="day__in" src="publics/images/sk/medal-in' + on + '.svg" alt=""><img class="day__badge" src="publics/images/sk/medal-badge' + on + '.svg" alt="">' +
      (d.img ? '<img class="day__ill" src="' + esc(d.img) + '" alt="">' : '') + '</span>' + ill +
      '<p class="day__txt"><small>' + esc(d.name) + '</small><b>' + esc(d.day) + '</b></p></li>';
  }).join('');

  /* ---------- tin tức ---------- */
  var newsList = $('#newsList');
  var newsMore = $('#newsMore');

  function renderNews(cat) {
    var list = NEWS.filter(function (n) { return cat === 'all' || n.cat === cat; }).slice(0, 4);
    newsList.innerHTML = list.length ? list.map(function (n) {
      return '<li><a href="chi-tiet.html?id=' + encodeURIComponent(n.id) + '"><span class="ncat">' + esc(NEWS_CATS[n.cat]) +
        '</span><span class="news__ttl">' + esc(n.title) + '</span><span class="news__date">' + esc(n.date) + '</span></a></li>';
    }).join('') : '<li class="news__empty">Chưa có bài viết.</li>';
    newsMore.href = 'tin-tuc.html' + (cat === 'all' ? '' : '?cat=' + cat);
  }

  $$('#newsTabs button').forEach(function (b, _, all) {
    b.addEventListener('click', function () {
      all.forEach(function (x) { x.setAttribute('aria-selected', String(x === b)); });
      renderNews(b.getAttribute('data-cat'));
    });
  });
  renderNews('all');

  /* ---------- bảng xếp hạng ---------- */
  var bxh = $('#bxhBox');
  var serverBtn = $('#serverBtn');
  var serverList = $('#serverList');
  var rank = { type: 'power', server: '' };
  var RANK_COL = { power: 'Lực Chiến', wealth: 'Tài Phú' };

  function renderRank() {
    if (!CONFIG.rankApi) {
      bxh.innerHTML = '<div class="bxh__soon"><b>Coming Soon</b><p>Bảng xếp hạng sẽ mở khi game chính thức ra mắt.</p></div>';
      return;
    }
    // TODO API: kiểm tra định dạng trả về khi có API thật
    var url = CONFIG.rankApi.replace('{type}', rank.type).replace('{server}', encodeURIComponent(rank.server));
    fetch(url).then(function (r) { return r.json(); }).then(function (rows) {
      bxh.innerHTML = '<table><thead><tr><th>Hạng</th><th>Tên Nhân Vật</th><th>Server</th><th>' + RANK_COL[rank.type] + '</th></tr></thead><tbody>' +
        rows.slice(0, 12).map(function (r, i) {
          return '<tr><td>' + (i < 3 ? '<img src="publics/images/rank-' + (i + 1) + '.png" alt="Hạng ' + (i + 1) + '">' : i + 1) + '</td><td>' + esc(r.name) +
            '</td><td>' + esc(r.server) + '</td><td>' + esc(Number(r.value).toLocaleString('vi-VN')) + '</td></tr>';
        }).join('') + '</tbody></table>';
    }).catch(function () {
      bxh.innerHTML = '<div class="bxh__soon"><p>Không tải được bảng xếp hạng, Chủ Nhân thử lại sau nhé.</p></div>';
    });
  }

  $$('[data-rank]').forEach(function (b, _, all) {
    b.addEventListener('click', function () {
      all.forEach(function (x) {
        x.classList.toggle('is-on', x === b);
        x.setAttribute('aria-selected', String(x === b));
      });
      rank.type = b.getAttribute('data-rank');
      renderRank();
    });
  });

  serverList.innerHTML = CONFIG.servers.map(function (s) {
    return '<li><button type="button" role="option" aria-selected="false">' + esc(s) + '</button></li>';
  }).join('');

  function setServerList(open) {
    serverList.hidden = !open;
    serverBtn.setAttribute('aria-expanded', String(open));
  }

  serverBtn.addEventListener('click', function () {
    if (!CONFIG.rankApi) {
      toast('Bảng xếp hạng sẽ mở khi game ra mắt!');
      return;
    }
    setServerList(serverList.hidden);
  });
  serverList.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    $$('button', serverList).forEach(function (x) { x.setAttribute('aria-selected', String(x === b)); });
    rank.server = b.textContent;
    serverBtn.textContent = b.textContent.split(' - ')[0];
    setServerList(false);
    renderRank();
  });
  document.addEventListener('click', function (e) {
    if (!serverList.hidden && !e.target.closest('.bxh-server')) setServerList(false);
  });
  renderRank();

  /* ---------- gặp gỡ mỹ nữ ---------- */
  var heroes = HEROES.map(function (h) {
    return { img: 'publics/images/cards/' + h[0] + '.webp', name: h[1], el: h[2], rar: h[3], voice: h[4] || '', quote: h[5] || '', role: h[6] || '' };
  });
  var RANK_ORDER = ['gr', 'lr', 'ur', 'ssr', 'hr', 'sr', 'r'];
  var mn = { el: CONFIG.elements[0].id, rar: 'all', page: 0, list: [], zoom: -1 };
  var PER = 3;
  var track = $('#mnTrack');
  var gal = $('#mnGal');
  var voice = $('#voice');
  var info = $('#heInfo');

  // nút phẩm chất
  var rarityEl = $('#rarity');
  rarityEl.innerHTML = '<button class="rbtn rbtn--all is-on" type="button" data-rar="all" aria-pressed="true">All</button>' +
    CONFIG.rarities.map(function (r) {
      return '<button class="rbtn" type="button" data-rar="' + r + '" aria-pressed="false"><img src="publics/images/r-' + r + '.png" alt="' + r.toUpperCase() + '"></button>';
    }).join('');
  rarityEl.addEventListener('click', function (e) {
    var b = e.target.closest('[data-rar]');
    if (!b) return;
    mn.rar = b.getAttribute('data-rar');
    $$('[data-rar]', rarityEl).forEach(function (x) {
      x.classList.toggle('is-on', x === b);
      x.setAttribute('aria-pressed', String(x === b));
    });
    rarityEl.classList.toggle('is-filtered', mn.rar !== 'all');
    renderCards(true);
  });

  // danh sách hệ
  $('#heList').innerHTML = CONFIG.elements.map(function (el) {
    return '<button class="he-btn" type="button" role="tab" data-el="' + el.id + '" style="--he:' + el.color + '" aria-selected="false">' +
      '<img class="off" src="publics/images/he-' + el.id + '.svg" alt=""><img class="on" src="publics/images/he-' + el.id + '-on.svg" alt="">' + esc(el.name) + '</button>';
  }).join('');
  $('#heList').addEventListener('click', function (e) {
    var b = e.target.closest('[data-el]');
    if (!b || b.getAttribute('data-el') === mn.el) return;
    mn.el = b.getAttribute('data-el');
    renderEl();
    renderCards(true);
  });

  function elOf(id) {
    return CONFIG.elements.filter(function (x) { return x.id === id; })[0];
  }

  // panel trái: thông tin hệ, hoặc lời thoại + chức năng của tướng đang phóng to
  function renderInfo() {
    var el = elOf(mn.el);
    var h = mn.zoom >= 0 ? mn.list[mn.zoom] : null;
    info.classList.add('is-swap');
    setTimeout(function () {
      info.style.setProperty('--he', el.color);
      $('#heBadge').src = 'publics/images/heb-' + el.id + '.svg';
      $('#heName').textContent = h ? h.name : el.name;
      $('#heDesc').textContent = h ? (h.quote || '“Lời thoại của ' + h.name + ' đang được cập nhật.”') : el.desc;
      $('#heSign').textContent = el.sign; // chức nghiệp của tướng hiển thị ở góc thẻ đang chọn, panel chỉ còn dòng hệ
      info.classList.toggle('is-hero', !!h);
      info.classList.remove('is-swap');
    }, 180);
  }

  function renderEl() {
    $$('.he-btn').forEach(function (b) { b.setAttribute('aria-selected', String(b.getAttribute('data-el') === mn.el)); });
    unzoom(true);
    renderInfo();
  }

  function pages() {
    return Math.max(1, Math.ceil(mn.list.length / PER));
  }

  function renderCards(reset) {
    unzoom(true);
    renderInfo(); // unzoom silent – phải tự reset panel (vd đang phóng to mà đổi lọc phẩm chất)
    mn.list = heroes.filter(function (h) {
      return h.el === mn.el && (mn.rar === 'all' || h.rar === mn.rar);
    }).sort(function (a, b) { return RANK_ORDER.indexOf(a.rar) - RANK_ORDER.indexOf(b.rar); });
    track.innerHTML = mn.list.map(function (h, i) {
      return '<button class="hcard" type="button" data-i="' + i + '" aria-label="' + esc(h.name) + ' – ' + h.rar.toUpperCase() +
        '"><img src="' + esc(h.img) + '" alt="" loading="lazy" width="416" height="720">' +
        '<span class="hcard__name"><i>Tên nhân vật</i><b>' + esc(h.name) + '</b></span>' +
        '<span class="hcard__role">' + (h.role ? esc('Chức Nghiệp: ' + h.role) : '') + '</span></button>';
    }).join('');
    $('#mnEmpty').hidden = mn.list.length > 0;
    if (reset) mn.page = 0;
    showPage(mn.page);
  }

  function showPage(p) {
    mn.page = Math.max(0, Math.min(pages() - 1, p));
    track.style.setProperty('--tx', (-mn.page * PER * (370 + parseFloat(getComputedStyle(track).columnGap))) + 'px');
    $('#mnCur').textContent = pad(mn.page + 1);
    $('#mnTotal').textContent = pad(pages());
    $('#mnBar').style.left = (pages() > 1 ? mn.page * (184 - 56) / (pages() - 1) : 0) + 'px';
    $('[data-mn="-1"]').disabled = mn.page === 0;
    $('[data-mn="1"]').disabled = mn.page >= pages() - 1;
  }

  $$('[data-mn]').forEach(function (b) {
    b.addEventListener('click', function () {
      unzoom(true);
      showPage(mn.page + +b.getAttribute('data-mn'));
      renderInfo();
    });
  });
  App.swipe(gal, function (dir) {
    unzoom(true);
    showPage(mn.page + dir);
    renderInfo();
  });

  // bấm thẻ: phóng to + phát voice + đổi lời thoại; bấm lại để thu nhỏ
  track.addEventListener('click', function (e) {
    var c = e.target.closest('.hcard');
    if (!c) return;
    var i = +c.getAttribute('data-i');
    if (i === mn.zoom) {
      unzoom();
      return;
    }
    unzoom(true);
    mn.zoom = i;
    c.classList.add('is-zoom');
    gal.classList.add('is-zoom');
    var h = mn.list[i];
    if (h.voice) {
      voice.src = h.voice;
      voice.currentTime = 0;
      voice.play().then(function () { c.classList.add('is-playing'); }).catch(function () {});
    }
    renderInfo();
  });

  voice.addEventListener('ended', function () {
    $$('.hcard.is-playing').forEach(function (c) { c.classList.remove('is-playing'); });
  });

  function unzoom(silent) {
    if (mn.zoom < 0) return false;
    mn.zoom = -1;
    voice.pause();
    $$('.hcard.is-zoom').forEach(function (c) { c.classList.remove('is-zoom', 'is-playing'); });
    gal.classList.remove('is-zoom');
    if (!silent) renderInfo();
    return true;
  }

  App.escHandlers.push(function () { return unzoom(); });
  document.addEventListener('click', function (e) {
    if (mn.zoom >= 0 && !e.target.closest('.hcard, .he-info, [data-mn]')) unzoom();
  });

  renderEl();
  renderCards(true);

  /* ---------- đặc sắc mỹ nữ onsen ---------- */
  var evs = CONFIG.gallery;
  var ev = $('#ev');
  var evImgs = $$('.ev__img', ev);
  var evMain = $('#evMain');
  var evBar = $('#evBar');
  var ei = 0;
  var evTimer;

  $('#evTotal').textContent = pad(evs.length);
  evs.forEach(function (e) { new Image().src = e.img; });

  function showEv(i, instant) {
    var n = evs.length;
    ei = (i + n) % n;
    var set = [evs[(ei - 1 + n) % n], evs[ei], evs[(ei + 1) % n]];
    function apply() {
      evImgs.forEach(function (img, j) {
        img.src = set[j].img;
        img.classList.remove('is-fading');
      });
    }
    if (instant) apply();
    else {
      evImgs.forEach(function (img) { img.classList.add('is-fading'); });
      setTimeout(apply, 220);
    }
    var url = evs[ei].link && evs[ei].link !== '#' ? evs[ei].link : '';
    evMain.href = url || '#';
    evMain.target = url ? '_blank' : '';
    $('#evCur').textContent = pad(ei + 1);
    evBar.style.left = (n > 1 ? ei * (184 - 56) / (n - 1) : 0) + 'px';
  }

  function playEv() {
    clearInterval(evTimer);
    evTimer = setInterval(function () { showEv(ei + 1); }, CONFIG.galleryInterval);
  }

  evMain.addEventListener('click', function (e) {
    if (evMain.getAttribute('href') === '#') {
      e.preventDefault();
      toast('Nội dung sẽ sớm được cập nhật!');
    }
  });
  $$('[data-ev]').forEach(function (b) {
    b.addEventListener('click', function () { showEv(ei + +b.getAttribute('data-ev')); playEv(); });
  });
  ev.addEventListener('mouseenter', function () { clearInterval(evTimer); });
  ev.addEventListener('mouseleave', playEv);
  App.swipe(ev, function (dir) { showEv(ei + dir); playEv(); });

  showEv(0, true);
  playEv();
})();
