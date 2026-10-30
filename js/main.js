/* Mỹ Nữ Onsen – Đăng Ký Trước
   Sửa link, giftcode, số người đăng ký, quà, tỉ lệ mây, nhiệm vụ, sự kiện trong CONFIG bên dưới.
   Đăng ký / đăng nhập / lượt / mảnh mây / đổi mảnh hiện chỉ lưu trong bộ nhớ trang (demo) – nối API thật khi có backend. */
(function () {
  'use strict';

  var CONFIG = {
    // link thật – để '#' thì bấm sẽ hiện "Đang cập nhật"
    links: {
      group: 'https://www.facebook.com/groups/mynuonsen/',
      fanpage: 'https://www.facebook.com/mynuonsen.gzone',
      chplay: '#',            // link Đăng Ký Trước trên CH Play (thay link thật vào đây)
      appStore: '#',
      about: '#',
      terms: '#',
      account: '#',
      topup: '#',
      support: '#'
    },
    heroVideo: 'video/hero.mp4', // video nền trang 1 (có tiếng) – nút âm thanh bật/tắt tiếng video này
    showPromoOnLoad: true,  // tự mở popup "Phần Thưởng Đăng Ký Sớm" mỗi lần vào trang
    giftcode: 'SADAKO',     // giftcode chung sau khi đăng ký trước
    registered: 25000,      // số Chủ Nhân đã đăng ký trước

    // quà đăng ký (khung trang 1 + popup Đăng Ký Sớm) – ext: ảnh nằm nổi trên vòng tròn
    regGifts: [
      { img: 'images/gift-ticket.png', name: 'Vé Quay*10', day: 'Ngày 01' },
      { img: 'images/gift-lr.png', ext: true, name: 'LR Heart Captor', day: 'Ngày 02' },
      { img: 'images/gift-ticket.png', name: 'Vé Quay*10', day: 'Ngày 03' }
    ],

    // mốc đăng ký – tip: ảnh quà hiện khi trỏ chuột, code: giftcode chung khi đạt mốc
    milestones: [
      { goal: 10000, label: '10k Người Đăng Ký', name: 'Osen Sơ Cấp', tip: 'images/moc-qua.png', code: 'SADAKO' },
      { goal: 20000, label: '20k Người Đăng Ký', name: 'Osen Trung Cấp', tip: 'images/moc-qua.png', code: 'SADAKO' },
      { goal: 50000, label: '50k Người Đăng Ký', name: 'Osen Cao Cấp', tip: 'images/moc-qua.png', code: 'SADAKO' },
      { goal: 80000, label: '80k Người Đăng Ký', name: 'Osen Tinh Hoa', tip: 'images/moc-qua.png', code: 'SADAKO' },
      { goal: 100000, label: '100k Người Đăng Ký', name: 'Osen Thượng Hạng', tip: 'images/moc-qua.png', code: 'SADAKO' }
    ],

    // 3 tranh mở lần lượt; rates = tỉ lệ (%) ra Mây 1 → Mây 10
    paintings: [
      { img: 'images/tranh-1.webp', code: 'TRANH1', rates: [20, 20, 12, 10, 8, 8, 6, 6, 5, 5] },
      { img: 'images/tranh-2.webp', code: 'TRANH2', rates: [3, 8, 3, 10, 15, 30, 20, 3, 3, 5] },
      { img: 'images/tranh-3.webp', code: 'TRANH3', rates: [3, 50, 3, 5, 3, 10, 15, 3, 3, 5] }
    ],

    // nhiệm vụ nhận lượt Xua Mây – link: khoá trong links; need: 'registered'; action: 'invite'
    tasks: [
      { id: 'daily', name: '1. Đăng Nhập Landing Hằng Ngày', reward: '1 Lượt/Ngày', turns: 1, daily: true },
      { id: 'invite', name: '2. Mời Bạn Bè Đăng Nhập Hàng Ngày (Tối Đa 4 Người/ Ngày)', reward: '1 Lượt/Người', turns: 0, action: 'invite' },
      { id: 'prereg', name: '3. Đăng Ký Trước Mỹ Nữ Onsen Tại Landing', reward: '5 Lượt/Toàn Sự Kiện', turns: 5, need: 'registered' },
      { id: 'fanpage', name: '4. Follow Fanpage Mỹ Nữ Onsen', reward: '10 Lượt/Toàn Sự Kiện', turns: 10, link: 'fanpage' },
      { id: 'group', name: '5. Gia Nhập Group Mỹ Nữ Onsen', reward: '10 Lượt/Toàn Sự Kiện', turns: 10, link: 'group' }
    ],

    rules: [
      '1. Hoàn Thành Nhiệm Vụ Để Nhận Lượt Xua Mây;',
      '2. Xua Tan Hết Mây Che Để Lộ Diện Waifu Sẽ Nhận Thưởng Giftcode. Có Tổng Cộng 3 Waifu;',
      '3. Trong Quá Trình Xua Mây Có Tỉ Lệ Nhận Quà Cảm Ơn Từ Waifu (Quà Outgame);',
      '4. Có Thể Đổi Mảnh Cho Người Chơi Khác Để Hoàn Thành Nhiệm Vụ Sự Kiện;',
      '5. Người Chơi Hoàn Thành May Mắn Chia Sẻ Vào Group Có Cơ Hội Nhận Thêm Quà (Thẻ GZcard/ Quà Outgame). Thời Gian Công Bố Giải May Mắn: [Ngày Ra Mắt];'
    ],

    // banner sự kiện – ảnh mẫu, thay bằng ảnh thật
    events: [
      { img: 'images/event-1.webp', link: '#' },
      { img: 'images/event-1.webp', link: '#' },
      { img: 'images/event-1.webp', link: '#' }
    ],
    eventInterval: 5000
  };

  // vị trí mây số 1 → 10 trong khung tranh (Figma: Frame 120)
  var CLOUD_POS = [[173, 245], [80, 585], [106, 412], [309, 404], [446, 265], [608, 426], [616, 606], [306, 615], [201, 745], [470, 683]];

  // vị trí cuộn tới các mục (toạ độ artboard)
  var ANCHORS = {
    desktop: { top: 0, hanhtrinh: 1080, tanlan: 2160, sukien: 3240 },
    mobile: { top: 0, hanhtrinh: 1080, tanlan: 2521, sukien: 3631 }
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement;

  /* ---------- scale ---------- */
  var mq = window.matchMedia('(max-width: 900px)');
  var k = 1;

  function fit() {
    var W = mq.matches ? 640 : 1920;
    var vw = root.clientWidth;
    var vh = window.innerHeight;
    k = vw / W;
    root.style.setProperty('--k', k);
    // popup Thông Báo: PC khung + 2 nàng rộng ~1060, mobile bỏ 2 nàng còn ~660
    var ps = mq.matches ? Math.min((vw - 16) / 660, (vh - 24) / 510) : Math.min(1, (vw - 24) / 1060, (vh - 24) / 510);
    root.style.setProperty('--ps', ps);
    root.style.setProperty('--ds', Math.min(1, (vw - 8) / 990, (vh - 8) / 1000));
  }

  fit();
  window.addEventListener('resize', fit);

  /* ---------- tiện ích ---------- */
  var toastEl = $('#toast');
  var toastT;

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2600);
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function fmt(n) {
    return n.toLocaleString('vi-VN');
  }

  function maskPhone(p) {
    return p.length > 6 ? p.slice(0, 3) + '****' + p.slice(-3) : p;
  }

  function cleanPhone(v) {
    return v.replace(/[\s.-]/g, '');
  }

  function isPhone(v) {
    return /^(0|\+?84)\d{9}$/.test(v);
  }

  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.userAgent)); // iPadOS 13+ dùng UA kiểu Mac
  }

  function copy(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function () { toast('Đã sao chép: ' + text); }, function () { toast('Mã của Chủ Nhân: ' + text); });
    } else {
      toast('Mã của Chủ Nhân: ' + text);
    }
  }

  function now() {
    var d = new Date();
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    return p(d.getHours()) + ':' + p(d.getMinutes()) + ' ' + p(d.getDate()) + '/' + p(d.getMonth() + 1);
  }

  function today() {
    return new Date().toDateString();
  }

  /* ---------- link ---------- */
  function linkOf(key) {
    var url = CONFIG.links[key];
    return url && url !== '#' ? url : '';
  }

  function bindLinks(scope) {
    $$('[data-link]', scope).forEach(function (a) {
      var url = linkOf(a.getAttribute('data-link'));
      if (url) {
        a.href = url;
      } else {
        a.removeAttribute('target');
        a.addEventListener('click', function (e) {
          e.preventDefault();
          toast('Tính năng đang được cập nhật, quay lại sau nhé!');
        });
      }
    });
  }

  bindLinks(document);

  /* ---------- cuộn tới mục ---------- */
  function goTo(id) {
    var map = mq.matches ? ANCHORS.mobile : ANCHORS.desktop;
    if (!(id in map)) return false;
    var y = id === 'top' ? 0 : map[id] * k - (mq.matches ? 94 * k : 0);
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

  /* ---------- thanh bên PC: ẩn/hiện + lên đầu trang ---------- */
  var side = $('#side');
  var sideToggle = $('#sideToggle');
  sideToggle.addEventListener('click', function () {
    var hidden = side.classList.toggle('is-hidden');
    sideToggle.setAttribute('aria-expanded', String(!hidden));
    sideToggle.setAttribute('aria-label', hidden ? 'Hiện thanh bên' : 'Ẩn thanh bên');
  });
  $$('[data-top]').forEach(function (b) {
    b.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  });

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

  /* ---------- âm thanh trang 1 ---------- */
  var video = $('#heroVideo');
  var music = $('#music');
  if (CONFIG.heroVideo) {
    video.src = CONFIG.heroVideo;
    video.hidden = false;
    video.play().catch(function () {});
  }
  // trình duyệt chỉ cho tự chạy video khi tắt tiếng – người xem bấm nút mới bật tiếng
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

  // âm thanh chỉ phát ở trang 1: cuộn khỏi trang 1 thì tạm tắt tiếng, quay lại thì bật lại
  if (CONFIG.heroVideo && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      heroSeen = es[0].isIntersecting;
      applySound();
    }, { threshold: .25 }).observe($('.hero'));
  }

  /* ---------- quà đăng ký ---------- */
  function giftHTML(g) {
    return '<li class="medal"><span class="medal__ring"><img class="medal__inner" src="images/medal-inner.svg" alt="">' +
      '<img class="medal__badge" src="images/medal-badge.svg" alt="">' +
      (g.ext ? '' : '<img class="medal__ill" src="' + esc(g.img) + '" alt="">') + '</span>' +
      (g.ext ? '<img class="medal__ext" src="' + esc(g.img) + '" alt="">' : '') +
      '<p class="medal__txt">' + esc(g.name) + '<b>' + esc(g.day) + '</b></p></li>';
  }

  $$('[data-gifts]').forEach(function (ul) {
    ul.innerHTML = CONFIG.regGifts.map(giftHTML).join('');
  });

  /* ---------- trạng thái (demo) ---------- */
  var state = {
    phone: '',            // SĐT đã đăng ký trước
    user: '',             // SĐT đã đăng nhập
    count: CONFIG.registered,
    turns: 0,
    pic: 0,               // tranh đang mở (0..2)
    got: {},              // mây đã xua của tranh hiện tại
    spare: {},            // mảnh dư: 'tranh-mây' -> số lượng
    history: [],
    done: {}              // nhiệm vụ đã nhận: id -> true | ngày
  };

  /* ---------- popup Thông Báo ---------- */
  var pop = $('#pop');
  var popTitle = $('#popTitle');
  var popBody = $('#popBody');
  var popOnClose = null;
  var popFocus;

  // opts: { title, html, top: căn trên, pic: có ảnh tranh, onClose }
  function openPop(opts) {
    if (!pop.classList.contains('is-open')) popFocus = document.activeElement;
    closeDk(true);
    popTitle.textContent = opts.title || 'Thông Báo';
    popBody.innerHTML = opts.html;
    popBody.classList.toggle('is-top', !!opts.top);
    popBody.classList.toggle('is-pic', !!opts.pic);
    popBody.scrollTop = 0;
    popOnClose = opts.onClose || null;
    bindLinks(popBody);
    pop.classList.add('is-open');
    pop.setAttribute('aria-hidden', 'false');
    var first = $('input, button:not([disabled])', popBody) || $('[data-close-pop]', pop);
    first.focus();
  }

  function closePop() {
    if (!pop.classList.contains('is-open')) return;
    pop.classList.remove('is-open');
    pop.setAttribute('aria-hidden', 'true');
    var fn = popOnClose;
    popOnClose = null;
    if (popFocus) popFocus.focus();
    if (fn) fn();
  }

  pop.addEventListener('click', function (e) {
    if (e.target === pop || e.target.closest('[data-close-pop]')) closePop();
  });

  function btn(label, attrs) {
    return '<button class="pbtn" type="' + (attrs && attrs.submit ? 'submit' : 'button') + '"' +
      (attrs && attrs.act ? ' data-act="' + attrs.act + '"' : '') + '>' + esc(label) + '</button>';
  }

  /* ---------- popup Phần Thưởng Đăng Ký Sớm ---------- */
  var dk = $('#dkpop');
  var dkFocus;

  function openDk() {
    dkFocus = document.activeElement;
    dk.classList.add('is-open');
    dk.setAttribute('aria-hidden', 'false');
    $('.dkpop__btn', dk).focus();
  }

  function closeDk(silent) {
    if (!dk.classList.contains('is-open')) return;
    dk.classList.remove('is-open');
    dk.setAttribute('aria-hidden', 'true');
    if (!silent && dkFocus) dkFocus.focus();
  }

  dk.addEventListener('click', function (e) {
    if (e.target === dk || e.target.closest('[data-close-dk]')) closeDk();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (pop.classList.contains('is-open')) closePop();
    else if (dk.classList.contains('is-open')) closeDk();
    else if (drawer.classList.contains('is-open')) setDrawer(false);
  });

  /* ---------- các popup ---------- */
  var POPS = {
    soon: function () {
      openPop({ html: '<p class="pop__code">Coming Soon</p><p class="pop__txt">Tính năng sắp ra mắt, Chủ Nhân quay lại sau nhé!</p>' });
    },

    register: function () {
      if (state.phone) {
        POPS.registered();
        return;
      }
      openPop({
        title: 'Đăng Ký Trước',
        html: '<form class="pop__form" id="regForm" novalidate>' +
          '<input class="pop__input" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="Nhập Số Điện Thoại Của Bạn" aria-label="Số điện thoại">' +
          '<label class="pop__check"><input name="agree" type="checkbox"> Đồng ý thu thập thông tin tài khoản</label>' +
          '<p class="pop__err" id="regErr" role="alert"></p>' + btn('Đăng Ký', { submit: true }) + '</form>'
      });
      $('#regForm').addEventListener('submit', function (e) {
        e.preventDefault();
        var input = this.phone;
        var phone = cleanPhone(input.value);
        var err = $('#regErr');
        input.classList.remove('is-err');
        if (!isPhone(phone)) {
          input.classList.add('is-err');
          err.textContent = 'Số điện thoại chưa đúng, Chủ Nhân kiểm tra lại nhé.';
          input.focus();
          return;
        }
        if (!this.agree.checked) {
          err.textContent = 'Chủ Nhân cần đồng ý thu thập thông tin tài khoản.';
          return;
        }
        // TODO API: gửi SĐT đăng ký trước
        state.phone = phone;
        var before = state.count;
        state.count++;
        $$('.dks').forEach(function (b) { b.classList.add('is-done'); });
        var fresh = renderMoc(before);
        POPS.registered();
        // mốc vừa đạt: đóng popup chúc mừng thì hiện giftcode mốc
        if (fresh >= 0) popOnClose = function () { setTimeout(function () { mocCode(fresh); }, 300); };
      });
    },

    registered: function () {
      openPop({
        html: '<p class="pop__txt">Xin chúc mừng Chủ Nhân <b>' + esc(maskPhone(state.phone)) +
          '</b> đăng ký trước thành công. Nhận Quà Ngay:</p><p class="pop__txt">Giftcode chung:</p>' +
          '<p class="pop__code" data-act="copy" title="Bấm để sao chép">' + esc(CONFIG.giftcode) + '</p>' + btn('Sao Chép Code', { act: 'copy' })
      });
    },

    // nút Đăng Ký Sớm trong popup quà: Android mở link CH Play trước rồi hiện popup thưởng, iOS hiện popup luôn
    dksreg: function () {
      var url = linkOf('chplay');
      if (url && !isIOS()) window.open(url, '_blank', 'noopener');
      openPop({
        html: '<p class="pop__txt">Chúc mừng Chủ Nhân đăng ký trước thành công!<br>Mời nhận thưởng:</p>' +
          '<p class="pop__txt">Giftcode chung:</p>' +
          '<p class="pop__code" data-act="copy" title="Bấm để sao chép">' + esc(CONFIG.giftcode) + '</p>' +
          btn('Sao Chép Code', { act: 'copy' })
      });
    },

    login: function (after) {
      if (state.user) {
        openPop({
          html: '<p class="pop__txt">Chủ Nhân đang đăng nhập bằng <b>' + esc(maskPhone(state.user)) + '</b>.</p>' + btn('Đăng Xuất', { act: 'logout' })
        });
        return;
      }
      openPop({
        html: '<form class="pop__form" id="loginForm" novalidate>' +
          '<input class="pop__input" name="phone" type="tel" inputmode="tel" autocomplete="username" placeholder="Nhập Số Điện Thoại Của Bạn" aria-label="Số điện thoại">' +
          '<input class="pop__input" name="pass" type="password" autocomplete="current-password" placeholder="Nhập Mật Khẩu" aria-label="Mật khẩu">' +
          '<p class="pop__err" id="loginErr" role="alert"></p>' + btn('Đăng Nhập Ngay', { submit: true }) + '</form>'
      });
      $('#loginForm').addEventListener('submit', function (e) {
        e.preventDefault();
        var phone = cleanPhone(this.phone.value);
        if (!isPhone(phone) || !this.pass.value) {
          $('#loginErr').textContent = 'Chủ Nhân nhập đúng số điện thoại và mật khẩu nhé.';
          return;
        }
        // TODO API: đăng nhập tài khoản game
        state.user = phone;
        renderXm();
        closePop();
        toast('Đăng nhập thành công!');
        if (typeof after === 'function') after();
      });
    },

    rule: function () {
      openPop({
        html: '<ul class="pop__rule">' + CONFIG.rules.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>'
      });
    },

    tasks: function () {
      openPop({
        html: '<div class="pop__tasks" id="taskList">' + CONFIG.tasks.map(function (t) {
          var done = isDone(t);
          return '<button type="button" data-task="' + t.id + '"' + (done ? ' disabled' : '') + '><span>' + esc(t.name) +
            '</span><span>' + (done ? 'Đã Nhận' : esc(t.reward)) + '</span></button>';
        }).join('') + '</div>'
      });
    },

    history: function () {
      openPop({
        top: true,
        html: state.history.length
          ? '<table class="pop__hist"><thead><tr><th>Thời gian</th><th>Tranh</th><th>Nhận được</th></tr></thead><tbody>' +
            state.history.map(function (h) {
              return '<tr><td>' + esc(h.time) + '</td><td>Tranh ' + h.pic + '</td><td>Mây ' + h.n + (h.dup ? ' (mảnh dư)' : '') + '</td></tr>';
            }).join('') + '</tbody></table>'
          : '<p class="pop__txt">Chủ Nhân chưa Xua Mây lần nào.</p>'
      });
    },

    trade: function () {
      if (!state.user) {
        POPS.login(POPS.trade);
        return;
      }
      var keys = Object.keys(state.spare).filter(function (key) { return state.spare[key] > 0; });
      if (!keys.length) {
        openPop({ html: '<p class="pop__txt">Chủ Nhân chưa có mảnh dư.<br>Mảnh Mây trùng khi Xua Mây sẽ được cất vào đây để đổi cho người chơi khác.</p>' });
        return;
      }
      openPop({
        html: '<form class="pop__form" id="tradeForm" novalidate><p class="pop__txt">Chọn mảnh dư muốn tặng:</p><div class="pop__spare">' +
          keys.map(function (key, i) {
            var p = key.split('-');
            return '<label><input type="radio" name="piece" value="' + key + '"' + (i ? '' : ' checked') + '><span>Tranh ' + p[0] +
              ' · Mây ' + p[1] + ' (x' + state.spare[key] + ')</span></label>';
          }).join('') + '</div>' +
          '<input class="pop__input" name="to" type="tel" inputmode="tel" placeholder="Nhập SĐT Người Nhận" aria-label="Số điện thoại người nhận">' +
          '<p class="pop__err" id="tradeErr" role="alert"></p>' + btn('Gửi Mảnh', { submit: true }) + '</form>'
      });
      $('#tradeForm').addEventListener('submit', function (e) {
        e.preventDefault();
        var to = cleanPhone(this.to.value);
        if (!isPhone(to) || to === state.user) {
          $('#tradeErr').textContent = 'Số điện thoại người nhận chưa đúng.';
          return;
        }
        // TODO API: chuyển mảnh cho người nhận
        var key = this.piece.value;
        state.spare[key]--;
        var p = key.split('-');
        closePop();
        toast('Đã gửi Mây ' + p[1] + ' (Tranh ' + p[0] + ') cho ' + maskPhone(to) + '.');
      });
    }
  };

  $$('[data-pop]').forEach(function (b) {
    b.addEventListener('click', function () { POPS[b.getAttribute('data-pop')](); });
  });

  // nút trong popup
  popBody.addEventListener('click', function (e) {
    var a = e.target.closest('[data-act]');
    if (a) {
      var act = a.getAttribute('data-act');
      if (act === 'copy') copy(CONFIG.giftcode);
      else if (act === 'copy-code') copy(a.getAttribute('data-code'));
      else if (act === 'share') sharePic();
      else if (act === 'logout') { state.user = ''; renderXm(); closePop(); toast('Đã đăng xuất.'); }
      return;
    }
    var t = e.target.closest('[data-task]');
    if (t && !t.disabled) doTask(t);
  });

  /* ---------- mốc đăng ký ---------- */
  var mocEl = $('#moc');
  var tip = $('#mocTip');
  var tipImg = $('#mocTipImg');

  mocEl.innerHTML = CONFIG.milestones.map(function (m, i) {
    return '<li class="moc__item" tabindex="0" data-i="' + i + '">' +
      '<img class="moc__card" src="images/onsen-' + (i + 1) + '.webp" alt="" loading="lazy">' +
      '<span class="moc__label"></span><span class="moc__name">' + esc(m.name) + '</span>' +
      '<span class="moc__lock"><img src="images/ic-lock.svg" alt=""></span>' +
      '<span class="moc__goal">' + esc(m.label) + '</span></li>';
  }).join('');
  var mocItems = $$('.moc__item', mocEl);

  // before: số trước khi tăng – trả về mốc vừa vượt qua (-1 nếu không có)
  function renderMoc(before) {
    $('#regCount').textContent = fmt(state.count);
    var fresh = -1;
    CONFIG.milestones.forEach(function (m, i) {
      var on = state.count >= m.goal;
      var li = mocItems[i];
      li.classList.toggle('is-on', on);
      $('.moc__lock img', li).src = on ? 'images/ic-unlock.svg' : 'images/ic-lock.svg';
      li.setAttribute('aria-label', m.label + (on ? ' – đã đạt' : ' – chưa đạt'));
      if (on && before !== undefined && before < m.goal) {
        fresh = i;
        li.classList.add('is-new');
      }
    });
    return fresh;
  }

  function mocCode(i) {
    var m = CONFIG.milestones[i];
    openPop({
      html: '<p class="pop__txt">Chúc mừng Chủ Nhân! Mốc <b>' + esc(m.label) + '</b> đã đạt.<br>Nhận ngay Giftcode chung:</p>' +
        '<p class="pop__code" data-act="copy-code" data-code="' + esc(m.code) + '">' + esc(m.code) + '</p>' +
        '<button class="pbtn" type="button" data-act="copy-code" data-code="' + esc(m.code) + '">Sao Chép Code</button>'
    });
  }

  function showTip(li) {
    var m = CONFIG.milestones[+li.getAttribute('data-i')];
    tipImg.src = m.tip;
    var s = Math.max(k * 1.1, .55);
    var r = li.getBoundingClientRect();
    var w = 161 * s;
    var h = 466 * s;
    var x = r.right + 6;
    if (x + w > root.clientWidth - 4) x = r.left - w - 6;
    if (x < 4) x = Math.min(root.clientWidth - w - 4, r.left + (r.width - w) / 2);
    var y = Math.max(4, Math.min(window.innerHeight - h - 4, r.top + (r.height - h) / 2));
    tip.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + s + ')';
    tip.hidden = false;
  }

  function hideTip() {
    tip.hidden = true;
  }

  mocItems.forEach(function (li) {
    li.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') showTip(li); });
    li.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') hideTip(); });
    li.addEventListener('focus', function () { showTip(li); });
    li.addEventListener('blur', hideTip);
    li.addEventListener('click', function (e) {
      var i = +li.getAttribute('data-i');
      if (li.classList.contains('is-on')) {
        hideTip();
        mocCode(i);
      } else if (e.pointerType !== 'mouse') {
        if (tip.hidden) showTip(li); else hideTip();
      } else {
        toast('Mốc ' + CONFIG.milestones[i].label + ' chưa đạt, rủ thêm bạn bè đăng ký nhé!');
      }
    });
    li.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); li.click(); }
    });
  });
  window.addEventListener('scroll', hideTip, { passive: true });

  renderMoc();

  /* ---------- tan làn khói mỏng: xua mây ---------- */
  var cloudsEl = $('#xmClouds');
  var art = $('#xmArt');
  var stat = $('#xmStat');
  var loginBtn = $('#xmLogin');
  var goBtn = $('#xmGo');
  var busy = false;

  // mây vẽ trước (lớp dưới), số vẽ sau để mây không che số
  cloudsEl.innerHTML = CLOUD_POS.map(function (p, i) {
    return '<img class="cloud" data-n="' + (i + 1) + '" src="images/cloud.webp" alt="" style="left:' + (p[0] - 229) + 'px;top:' + (p[1] - 109) + 'px">';
  }).join('') + CLOUD_POS.map(function (p, i) {
    return '<span class="num" data-n="' + (i + 1) + '" style="left:' + p[0] + 'px;top:' + p[1] + 'px"><span class="num__ring">' +
      '<img class="num__inner" src="images/medal-s-inner.svg" alt=""><img class="num__badge" src="images/medal-s-badge.svg" alt=""></span>' +
      '<span class="num__n">' + (i + 1) + '</span></span>';
  }).join('');

  function allDone() {
    return state.pic >= CONFIG.paintings.length;
  }

  function renderXm() {
    loginBtn.classList.toggle('is-in', !!state.user);
    $('span', loginBtn).textContent = state.user ? maskPhone(state.user) : 'Đăng Nhập';
    goBtn.disabled = allDone();
    var got = Object.keys(state.got).length;
    stat.innerHTML = allDone()
      ? 'Chủ Nhân đã lộ diện cả <b>' + CONFIG.paintings.length + '</b> nàng thơ!'
      : 'Tranh <b>' + (state.pic + 1) + '/' + CONFIG.paintings.length + '</b> · Đã xua <b>' + got + '/10</b>' +
        (state.user ? '<br>Còn <b>' + state.turns + '</b> lượt' : '');
  }

  function showClouds() {
    $$('[data-n]', cloudsEl).forEach(function (el) {
      el.classList.toggle('is-gone', !!state.got[el.getAttribute('data-n')]);
    });
  }

  function draw(rates) {
    var total = rates.reduce(function (a, b) { return a + b; }, 0);
    var r = Math.random() * total;
    for (var i = 0; i < rates.length; i++) {
      r -= rates[i];
      if (r < 0) return i + 1;
    }
    return rates.length;
  }

  goBtn.addEventListener('click', function () {
    if (busy || allDone()) return;
    if (!state.user) {
      POPS.login();
      return;
    }
    if (state.turns <= 0) {
      toast('Chủ Nhân đã hết lượt Xua Mây. Làm nhiệm vụ để nhận thêm lượt nhé!');
      POPS.tasks();
      return;
    }
    // TODO API: server quay mây theo tỉ lệ
    var pic = CONFIG.paintings[state.pic];
    var n = draw(pic.rates);
    var dup = !!state.got[n];
    state.turns--;
    state.history.unshift({ time: now(), pic: state.pic + 1, n: n, dup: dup });
    var num = $('.num[data-n="' + n + '"]', cloudsEl);
    if (dup) {
      var key = (state.pic + 1) + '-' + n;
      state.spare[key] = (state.spare[key] || 0) + 1;
      toast('Nhận Mây ' + n + ' – đã có rồi, mảnh dư được cất vào Đổi Mảnh.');
      renderXm();
      return;
    }
    state.got[n] = true;
    busy = true;
    num.classList.add('is-hit');
    setTimeout(function () {
      num.classList.remove('is-hit');
      showClouds();
      renderXm();
      toast('Xua tan Mây ' + n + '!');
      busy = false;
      if (Object.keys(state.got).length === 10) setTimeout(finishPic, 1300);
    }, 500);
  });

  function finishPic() {
    var i = state.pic;
    var pic = CONFIG.paintings[i];
    openPop({
      pic: true,
      html: '<p class="pop__txt">Chúc mừng Chủ Nhân hoàn thành góc nhìn hoàn chỉnh, mời nhận code:</p>' +
        '<p class="pop__code" data-act="copy-code" data-code="' + esc(pic.code) + '">' + esc(pic.code) + '</p>' +
        '<div class="pop__pics"><img src="' + esc(pic.img) + '" alt="Tranh ' + (i + 1) + '"></div>' +
        '<div class="pop__row"><p>Chia sẻ lên Group Cộng Đồng để may mắn nhận thêm phần thưởng</p>' +
        btn('Chia Sẻ Ngay', { act: 'share' }) + '</div>',
      onClose: nextPic
    });
  }

  function nextPic() {
    state.pic++;
    if (allDone()) {
      renderXm();
      return;
    }
    state.got = {};
    art.classList.add('is-fading');
    setTimeout(function () {
      art.src = CONFIG.paintings[state.pic].img;
      art.classList.remove('is-fading');
      showClouds();
      renderXm();
    }, 500);
  }

  // Facebook không cho đăng thẳng vào group qua link – mở hộp chia sẻ, người chơi chọn "Chia sẻ lên nhóm"
  function sharePic() {
    var url = location.href.split('#')[0] + '#tanlan';
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '_blank', 'noopener,width=640,height=560');
    toast('Chọn "Chia sẻ lên nhóm" và chọn Group Mỹ Nữ Onsen nhé!');
  }

  /* ---------- nhiệm vụ nhận lượt ---------- */
  function isDone(t) {
    return t.daily ? state.done[t.id] === today() : !!state.done[t.id];
  }

  function doTask(b) {
    var t = CONFIG.tasks.filter(function (x) { return x.id === b.getAttribute('data-task'); })[0];
    if (!state.user) {
      POPS.login(POPS.tasks);
      return;
    }
    if (t.need === 'registered' && !state.phone) {
      toast('Chủ Nhân cần Đăng Ký Trước để nhận lượt này.');
      POPS.register();
      return;
    }
    if (t.action === 'invite') {
      // TODO API: cộng lượt khi bạn được mời đăng nhập
      copy(location.href.split('#')[0] + '?ref=' + encodeURIComponent(state.user));
      toast('Đã sao chép link mời. Mỗi bạn đăng nhập qua link = +1 lượt (tối đa 4/ngày).');
      return;
    }
    if (t.link) {
      var url = linkOf(t.link);
      if (url) window.open(url, '_blank', 'noopener');
    }
    // TODO API: xác nhận nhiệm vụ
    state.done[t.id] = t.daily ? today() : true;
    state.turns += t.turns;
    b.disabled = true;
    b.lastElementChild.textContent = 'Đã Nhận';
    renderXm();
    toast('Nhận thành công +' + t.turns + ' lượt (còn ' + state.turns + ' lượt).');
  }

  showClouds();
  renderXm();

  /* ---------- sự kiện ---------- */
  var evs = CONFIG.events;
  var ev = $('#ev');
  var evImgs = $$('.ev__img', ev);
  var evMain = $('#evMain');
  var evBar = $('#evBar');
  var ei = 0;
  var evTimer;

  $('#evTotal').textContent = (evs.length < 10 ? '0' : '') + evs.length;
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
    $('#evCur').textContent = (ei + 1 < 10 ? '0' : '') + (ei + 1);
    evBar.style.left = (n > 1 ? ei * (184 - 56) / (n - 1) : 0) + 'px';
  }

  function playEv() {
    clearInterval(evTimer);
    evTimer = setInterval(function () { showEv(ei + 1); }, CONFIG.eventInterval);
  }

  evMain.addEventListener('click', function (e) {
    if (evMain.getAttribute('href') === '#') {
      e.preventDefault();
      toast('Sự kiện sẽ sớm được cập nhật!');
    }
  });
  $$('[data-ev]').forEach(function (b) {
    b.addEventListener('click', function () { showEv(ei + +b.getAttribute('data-ev')); playEv(); });
  });
  ev.addEventListener('mouseenter', function () { clearInterval(evTimer); });
  ev.addEventListener('mouseleave', playEv);

  // vuốt trên mobile
  var sx = null;
  ev.addEventListener('pointerdown', function (e) { sx = e.clientX; });
  ev.addEventListener('pointerup', function (e) {
    if (sx === null) return;
    var dx = e.clientX - sx;
    sx = null;
    if (Math.abs(dx) > 40) { showEv(ei + (dx < 0 ? 1 : -1)); playEv(); }
  });
  ev.addEventListener('pointercancel', function () { sx = null; });

  showEv(0, true);
  playEv();

  /* ---------- popup Đăng Ký Sớm khi vào trang (luôn mở mỗi lần load) ---------- */
  if (CONFIG.showPromoOnLoad) setTimeout(openDk, 600);
})();
