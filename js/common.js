/* Mỹ Nữ Onsen – phần dùng chung cho Trang Chủ + Tin Tức:
   scale artboard, toast, link, menu mobile, thanh bên, footer, popup Thông Báo. */
var App = (function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement;

  /* ---------- scale ---------- */
  var mq = window.matchMedia('(max-width: 900px)');
  var api = { $: $, $$: $$, mq: mq, k: 1 };

  function fit() {
    var W = mq.matches ? 640 : 1920;
    var vw = root.clientWidth;
    var vh = window.innerHeight;
    api.k = vw / W;
    root.style.setProperty('--k', api.k);
    var ps = mq.matches ? Math.min((vw - 16) / 660, (vh - 24) / 510) : Math.min(1, (vw - 24) / 1060, (vh - 24) / 510);
    root.style.setProperty('--ps', ps);
    root.style.setProperty('--ds', Math.min(1, (vw - 8) / 990, (vh - 8) / 1000));
  }

  fit();
  window.addEventListener('resize', fit);

  /* ---------- tiện ích ---------- */
  var toastEl = $('#toast');
  var toastT;

  api.toast = function (msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2600);
  };

  api.esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };

  api.pad = function (n) {
    return (n < 10 ? '0' : '') + n;
  };

  /* ---------- link ---------- */
  api.linkOf = function (key) {
    var url = CONFIG.links[key];
    return url && url !== '#' ? url : '';
  };

  // link '#' hoặc rỗng → báo "đang cập nhật"
  api.soon = function (a, msg) {
    a.removeAttribute('target');
    a.addEventListener('click', function (e) {
      if (a.getAttribute('href') !== '#') return;
      e.preventDefault();
      api.toast(msg || 'Tính năng đang được cập nhật, quay lại sau nhé!');
    });
  };

  api.bindLinks = function (scope) {
    $$('[data-link]', scope).forEach(function (a) {
      var url = api.linkOf(a.getAttribute('data-link'));
      if (url) a.href = url;
      else { a.setAttribute('href', '#'); api.soon(a); }
    });
  };

  /* ---------- footer (giống Landing) ---------- */
  $$('[data-footer]').forEach(function (el) {
    el.innerHTML =
      '<p><a href="#" data-link="about" target="_blank" rel="noopener">About Gzone</a> | <a href="#" data-link="terms" target="_blank" rel="noopener">Điều Khoản</a> | ' +
      '<a href="#" data-link="account" target="_blank" rel="noopener">Tài Khoản</a> | <a href="#" data-link="topup" target="_blank" rel="noopener">Nạp Thẻ</a> | ' +
      '<a href="#" data-link="support" target="_blank" rel="noopener">Hỗ trợ KH</a></p>' +
      '<p>Bản quyền © 2020 Gzone</p>' +
      '<p>Email: <a href="mailto:Hotro@Gzone.vn">Hotro@Gzone.vn</a> | Hotline: <a href="tel:1900088885">1900 088 885</a></p>' +
      '<p>Thời gian: 8:00 - 22:00 tất cả các ngày (GMT + 7)</p>' +
      '<p><a href="https://giayphep.abei.gov.vn/g1/132408" target="_blank" rel="noopener noreferrer">https://giayphep.abei.gov.vn/g1/132408</a></p>' +
      '<p>Giấy phép G1 số: 645/QĐ-PTTH&amp;TTĐT ngày 30/09/2026</p>' +
      '<p>Chơi quá 180 phút một ngày sẽ ảnh hưởng xấu đến sức khỏe</p>' +
      '<p>Chịu trách nhiệm nội dung: Ông Bùi Đức Hồng</p>';
  });

  api.bindLinks(document);

  /* ---------- thanh bên PC: ẩn/hiện + lên đầu trang ---------- */
  var side = $('#side');
  var sideToggle = $('#sideToggle');
  if (side) {
    sideToggle.addEventListener('click', function () {
      var hidden = side.classList.toggle('is-hidden');
      sideToggle.setAttribute('aria-expanded', String(!hidden));
      sideToggle.setAttribute('aria-label', hidden ? 'Hiện thanh bên' : 'Ẩn thanh bên');
    });
  }
  $$('[data-top]').forEach(function (b) {
    b.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  });

  /* ---------- menu mobile ---------- */
  var burger = $('#burger');
  var drawer = $('#drawer');

  api.setDrawer = function (open) {
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
  };

  burger.addEventListener('click', function () {
    api.setDrawer(!drawer.classList.contains('is-open'));
  });
  $$('[data-close-drawer]').forEach(function (a) {
    a.addEventListener('click', function () { api.setDrawer(false); });
  });
  mq.addEventListener('change', function () { api.setDrawer(false); fit(); });

  /* ---------- popup Thông Báo ---------- */
  var pop = $('#pop');
  var popTitle = $('#popTitle');
  var popBody = $('#popBody');
  var popOnClose = null;
  var popFocus;

  // opts: { title, html, onClose }
  api.openPop = function (opts) {
    if (!pop.classList.contains('is-open')) popFocus = document.activeElement;
    popTitle.textContent = opts.title || 'Thông Báo';
    popBody.innerHTML = opts.html;
    popBody.scrollTop = 0;
    popOnClose = opts.onClose || null;
    pop.classList.add('is-open');
    pop.setAttribute('aria-hidden', 'false');
    ($('button', popBody) || $('[data-close-pop]', pop)).focus();
  };

  api.closePop = function () {
    if (!pop.classList.contains('is-open')) return;
    pop.classList.remove('is-open');
    pop.setAttribute('aria-hidden', 'true');
    popBody.innerHTML = ''; // dừng video trailer
    var fn = popOnClose;
    popOnClose = null;
    if (popFocus) popFocus.focus();
    if (fn) fn();
  };

  pop.addEventListener('click', function (e) {
    if (e.target === pop || e.target.closest('[data-close-pop]')) api.closePop();
  });

  // các phím Esc: hàm đóng nào trả về true thì dừng
  api.escHandlers = [];
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (pop.classList.contains('is-open')) { api.closePop(); return; }
    for (var i = 0; i < api.escHandlers.length; i++) if (api.escHandlers[i]()) return;
    if (drawer.classList.contains('is-open')) api.setDrawer(false);
  });

  /* ---------- slide tự chạy (banner trang 1, banner sự kiện trang 2) ---------- */
  // box: khung (dừng khi trỏ chuột); track: dải ảnh; dots: chấm; items: [{img, link}]
  api.slider = function (box, track, dots, items, interval) {
    var i = 0;
    var timer;
    track.innerHTML = items.map(function (it) {
      return '<a href="' + api.esc(it.link || '#') + '"' + (it.link && it.link !== '#' ? ' target="_blank" rel="noopener"' : '') +
        '><img src="' + api.esc(it.img) + '" alt="" loading="lazy" draggable="false"></a>';
    }).join('');
    $$('a[href="#"]', track).forEach(function (a) { api.soon(a, 'Sự kiện sẽ sớm được cập nhật!'); });
    dots.innerHTML = items.length > 1 ? items.map(function (_, j) {
      return '<button type="button" aria-label="Ảnh ' + (j + 1) + '"></button>';
    }).join('') : '';
    var dotEls = $$('button', dots);

    function go(n) {
      i = (n + items.length) % items.length;
      track.style.transform = 'translateX(' + (-100 * i) + '%)';
      dotEls.forEach(function (d, j) { d.setAttribute('aria-current', String(j === i)); });
    }

    function play() {
      clearInterval(timer);
      if (items.length > 1) timer = setInterval(function () { go(i + 1); }, interval);
    }

    dotEls.forEach(function (d, j) { d.addEventListener('click', function () { go(j); play(); }); });
    box.addEventListener('mouseenter', function () { clearInterval(timer); });
    box.addEventListener('mouseleave', play);
    api.swipe(box, function (dir) { go(i + dir); play(); });
    go(0);
    play();
  };

  // vuốt ngang: cb(+1 | -1)
  api.swipe = function (el, cb) {
    var sx = null;
    var moved = false;
    el.addEventListener('pointerdown', function (e) { sx = e.clientX; moved = false; });
    el.addEventListener('pointerup', function (e) {
      if (sx === null) return;
      var dx = e.clientX - sx;
      sx = null;
      if (Math.abs(dx) > 40) { moved = true; cb(dx < 0 ? 1 : -1); }
    });
    el.addEventListener('pointercancel', function () { sx = null; });
    // vuốt xong thì không mở link
    el.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  };

  return api;
})();
