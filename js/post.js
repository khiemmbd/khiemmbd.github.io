/* Mỹ Nữ Onsen – Trang Chi Tiết Bài Viết: chi-tiet.html?id=<id bài>
   Bài viết lấy từ NEWS trong js/data.js – TODO API: gọi API chi tiết theo id. */
(function () {
  'use strict';

  var $ = App.$;
  var esc = App.esc;
  var page = $('#top');
  var stage = $('#stage');

  // artboard cao theo nội dung: đo chiều cao stage (chưa scale) → --H
  function fitHeight() {
    page.style.setProperty('--H', stage.offsetHeight + 'px');
  }

  var id = new URLSearchParams(location.search).get('id') || '';
  var n = NEWS.filter(function (x) { return x.id === id; })[0];

  /* ---------- video nền hero (giống trang chủ) ---------- */
  var heroVideo = $('#nHeroVideo');
  if (CONFIG.heroVideo && heroVideo) {
    heroVideo.src = CONFIG.heroVideo;
    heroVideo.hidden = false;
    heroVideo.play().catch(function () {});
  }

  if (!n) {
    $('#pCat').textContent = 'Tin Tức';
    $('#pTitle').textContent = 'Không tìm thấy bài viết';
    $('#pContent').innerHTML = '<p>Bài viết không tồn tại hoặc đã bị gỡ. Chủ Nhân xem các tin khác tại <a href="tin-tuc.html">trang Tin Tức</a> nhé.</p>';
    $('.pmeta').hidden = true;
  } else {
    var cat = NEWS_CATS[n.cat];
    document.title = n.title + ' – Mỹ Nữ Onsen';
    $('#pCat').textContent = cat;
    $('#pCrumbCat').textContent = cat;
    $('#pCrumbCat').href = 'tin-tuc.html?cat=' + n.cat;
    $('#pCrumbTitle').textContent = n.title;
    $('#pTitle').textContent = n.title;
    $('#pMetaCat').textContent = cat;
    $('#pDate').textContent = n.date;
    $('#pContent').innerHTML = n.content; // HTML do admin nhập
    $('#pBack').href = 'tin-tuc.html?cat=' + n.cat;

    // bài liên quan: cùng mục, tối đa 4
    var rel = NEWS.filter(function (x) { return x.cat === n.cat && x.id !== n.id; }).slice(0, 4);
    if (rel.length) {
      $('#pRelList').innerHTML = rel.map(function (x) {
        return '<li><a href="chi-tiet.html?id=' + encodeURIComponent(x.id) + '"><span class="ncat">' + esc(NEWS_CATS[x.cat]) +
          '</span><span class="nlist__ttl">' + esc(x.title) + '</span><span class="nlist__date">' + esc(x.date) + '</span></a></li>';
      }).join('');
      $('#pRel').hidden = false;
    }
  }

  // Quay Lại: có trang trước trong site thì back, không thì về danh sách mục
  $('#pBack').addEventListener('click', function (e) {
    if (document.referrer && document.referrer.indexOf(location.host) > -1 && history.length > 1) {
      e.preventDefault();
      history.back();
    }
  });

  $('#pShare').addEventListener('click', function () {
    var url = location.href;
    if (navigator.share) {
      navigator.share({ title: document.title, url: url }).catch(function () {});
      return;
    }
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '_blank', 'noopener,width=640,height=560');
  });

  fitHeight();
  window.addEventListener('resize', fitHeight);
  window.addEventListener('load', fitHeight);
  // ảnh trong bài tải xong thì đo lại
  Array.prototype.forEach.call($('#pContent').querySelectorAll('img'), function (img) {
    img.addEventListener('load', fitHeight);
  });
})();
