
(function () {
  'use strict';

  var $ = App.$;
  var $$ = App.$$;
  var esc = App.esc;
  var PER = 5;

  var list = $('#nList');
  var pager = $('#nPager');
  var tabs = $$('#nTabs [data-cat]');
  var state = { cat: 'tin-tuc', page: 1 };

  var heroVideo = $('#nHeroVideo');
  if (CONFIG.heroVideo && heroVideo) {
    heroVideo.src = CONFIG.heroVideo;
    heroVideo.hidden = false;
    heroVideo.play().catch(function () {});
  }

  function readUrl() {
    var q = new URLSearchParams(location.search);
    return { id: q.get('id') || '', cat: NEWS_CATS[q.get('cat')] ? q.get('cat') : '', page: Math.max(1, parseInt(q.get('page'), 10) || 1) };
  }

  function setUrl(q, push) {
    var s = Object.keys(q).filter(function (k) { return q[k]; }).map(function (k) { return k + '=' + encodeURIComponent(q[k]); }).join('&');
    history[push ? 'pushState' : 'replaceState'](null, '', location.pathname + (s ? '?' + s : ''));
  }

  function setTabs(cat) {
    tabs.forEach(function (b) { b.setAttribute('aria-selected', String(b.getAttribute('data-cat') === cat)); });
    $('#nTitle').textContent = NEWS_CATS[cat] || 'Tin Tức';
  }

  function showList() {
    var items = NEWS.filter(function (n) { return n.cat === state.cat; });
    var pages = Math.max(1, Math.ceil(items.length / PER));
    state.page = Math.min(state.page, pages);
    setTabs(state.cat);
    var slice = items.slice((state.page - 1) * PER, state.page * PER);
    list.innerHTML = slice.length ? slice.map(function (n) {
      return '<a href="chi-tiet.html?id=' + encodeURIComponent(n.id) + '"><span class="ncat">' + esc(NEWS_CATS[n.cat]) +
        '</span><span class="nlist__ttl">' + esc(n.title) + '</span><span class="nlist__date">' + esc(n.date) + '</span></a>';
    }).join('') : '<p class="nlist__empty">Chưa có bài viết trong mục này.</p>';

    var html = '';
    if (pages > 1) {
      html += '<button type="button" data-p="1" aria-label="Trang đầu"' + (state.page === 1 ? ' disabled' : '') + '>&lt;&lt;</button>';
      html += '<button type="button" data-p="' + (state.page - 1) + '" aria-label="Trang trước"' + (state.page === 1 ? ' disabled' : '') + '>&lt;</button>';
      var from = Math.max(1, Math.min(state.page - 2, pages - 4));
      for (var p = from; p <= Math.min(pages, from + 4); p++) {
        html += '<button type="button" data-p="' + p + '"' + (p === state.page ? ' aria-current="page"' : '') + '>' + p + '</button>';
      }
      html += '<button type="button" data-p="' + (state.page + 1) + '" aria-label="Trang sau"' + (state.page === pages ? ' disabled' : '') + '>&gt;</button>';
      html += '<button type="button" data-p="' + pages + '" aria-label="Trang cuối"' + (state.page === pages ? ' disabled' : '') + '>&gt;&gt;</button>';
    }
    pager.innerHTML = html;
    document.title = (NEWS_CATS[state.cat] || 'Tin Tức') + ' – Mỹ Nữ Onsen';
  }

  function route() {
    var u = readUrl();
    if (u.id) {
      location.replace('chi-tiet.html?id=' + encodeURIComponent(u.id));
      return;
    }
    state.cat = u.cat || 'tin-tuc';
    state.page = u.page;
    showList();
  }

  tabs.forEach(function (b) {
    b.addEventListener('click', function () {
      state.cat = b.getAttribute('data-cat');
      state.page = 1;
      setUrl({ cat: state.cat }, true);
      showList();
    });
  });

  pager.addEventListener('click', function (e) {
    var b = e.target.closest('[data-p]');
    if (!b || b.disabled) return;
    state.page = +b.getAttribute('data-p');
    setUrl({ cat: state.cat, page: state.page > 1 ? state.page : '' }, true);
    showList();
  });

  window.addEventListener('popstate', route);
  route();
})();
