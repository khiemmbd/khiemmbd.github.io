/* Thiên Long Hoài Niệm – Đăng Ký Trước
   Sửa link, video, số người báo danh, nhiệm vụ, quà tầm bảo trong CONFIG bên dưới.
   Lượt / nhiệm vụ / lịch sử hiện chỉ lưu trong bộ nhớ trang (demo) – nối API thật khi có backend. */
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
      preRegister: '#',
      googlePlay: '#',
      appStore: '#',
      about: '#',
      terms: '#',
      account: '#',
      support: '#'
    },
    videoId: '',          // ID YouTube của video giới thiệu, vd 'dQw4w9WgXcQ'
    slideInterval: 5000,
    registered: 1000,     // số hảo hữu đã báo danh

    // ảnh đặc sắc – ảnh mẫu, thay bằng ảnh thật
    slides: [
      'images/slide-1.png',
      'images/hero-pc.png',
      'images/slide-1.png',
      'images/hero-pc.png',
      'images/slide-1.png'
    ],

    startTurns: 0,
    // nhiệm vụ: link = khoá trong links (mở link rồi cộng lượt), action = share / invite
    tasks: {
      once: [
        { id: 'follow', name: 'Follow Page', turns: 2, link: 'fanpage' },
        { id: 'group', name: 'Join Group', turns: 2, link: 'groupFacebook' },
        { id: 'zalo', name: 'Join Zalo', turns: 2, link: 'groupZalo' },
        { id: 'prereg', name: 'Hoàn Thành Đăng Ký Trước', turns: 2, link: 'preRegister' },
        { id: 'share', name: 'Chia Sẻ Landing', turns: 2, action: 'share' }
      ],
      daily: [
        { id: 'login', name: 'Đăng nhập hằng ngày', turns: 2 },
        { id: 'invite', name: 'Mời bạn mỗi ngày', turns: 2, action: 'invite' }
      ]
    },

    // quà tầm bảo – img = ảnh rương bảo hạp hiển thị (trong thư mục images)
    rewards: [
      { name: 'Bảo Hạp Đồng', img: 'images/tb-chest-1.png' },
      { name: 'Bảo Hạp Bạc', img: 'images/tb-chest-2.png' },
      { name: 'Bảo Hạp Vàng', img: 'images/tb-chest-3.png' },
      { name: 'Bảo Hạp Huyền Bí', img: 'images/tb-chest-4.png' },
      { name: 'Bảo Hạp Chí Tôn', img: 'images/tb-chest-main.png' }
    ],

    rules: [
      'Thời gian sự kiện: từ nay đến khi game chính thức ra mắt.',
      'Mỗi lần Tầm Bảo tiêu hao 1 lượt, nhận ngẫu nhiên 1 phần quà.',
      'Hoàn thành nhiệm vụ 1 lần và nhiệm vụ hàng ngày để nhận thêm lượt.',
      'Nhiệm vụ hàng ngày làm mới vào 00:00 mỗi ngày.',
      'Quà nhận được sẽ gửi vào hòm thư trong game sau khi ra mắt.',
      'Mọi hành vi gian lận sẽ bị huỷ kết quả. BQT có quyền quyết định cuối cùng.'
    ]
  };

  // vị trí cuộn tới các mục (toạ độ artboard)
  var ANCHORS = {
    desktop: { top: 0, dangky: 1042, baodanh: 1976, tambao: 3096, dacsac: 4043 },
    mobile: { top: 0, dangky: 1070, baodanh: 1994, tambao: 2599, dacsac: 3755 }
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
    // popup: PC khung 1090×657, mobile khung 620×600 theo artboard 640
    var vh = window.innerHeight - 24;
    var ps = mq.matches ? Math.min(k, vh / 600) : Math.min(1, (root.clientWidth - 24) / 1090, vh / 657);
    root.style.setProperty('--ps', ps);
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
    toastT = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2400);
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* ---------- link ---------- */
  function linkOf(key) {
    var url = CONFIG.links[key];
    return url && url !== '#' ? url : '';
  }

  $$('[data-link]').forEach(function (a) {
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

  /* ---------- số người báo danh ---------- */
  var reg = CONFIG.registered;
  $('#regCount').textContent = reg >= 10000 ? reg.toLocaleString('vi-VN') : String(reg);

  /* ---------- popup ---------- */
  var pop = $('#pop');
  var popTitle = $('#popTitle');
  var popBody = $('#popBody');
  var popBtn = $('#popBtn');
  var popAction = null;
  var popFocus;

  function itemHTML(r) {
    return '<li class="item"><span class="item__ic item__ic--img"><img src="' + esc(r.img) +
      '" alt=""></span><img class="item__frame" src="images/item-frame.png" alt=""><span class="item__name">' +
      esc(r.name) + '</span></li>';
  }

  // opts: { title, html, btn: 'Nhận Quà' | null, onBtn }
  function openPop(opts) {
    popFocus = document.activeElement;
    popTitle.textContent = opts.title;
    popBody.innerHTML = opts.html;
    popBody.scrollTop = 0;
    popBody.classList.toggle('no-btn', !opts.btn);
    popBtn.hidden = !opts.btn;
    if (opts.btn) $('span', popBtn).textContent = opts.btn;
    popAction = opts.onBtn || null;
    pop.classList.add('is-open');
    pop.setAttribute('aria-hidden', 'false');
    $('[data-close-pop]', pop).focus();
  }

  function closePop() {
    pop.classList.remove('is-open');
    pop.setAttribute('aria-hidden', 'true');
    popAction = null;
    if (popFocus) popFocus.focus();
  }

  pop.addEventListener('click', function (e) {
    if (e.target === pop || e.target.closest('[data-close-pop]')) closePop();
  });
  popBtn.addEventListener('click', function () {
    var fn = popAction;
    closePop();
    if (fn) fn();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (auth.classList.contains('is-open')) closeAuth();
    else if (pop.classList.contains('is-open')) closePop();
    else if (modal.classList.contains('is-open')) closeVideo();
    else if (drawer.classList.contains('is-open')) setDrawer(false);
  });

  /* ---------- popup đăng nhập / đăng ký ---------- */
  var auth = $('#authModal');
  var authToastEl = $('#authToast');
  var authToastT;
  var authFocus;

  function authToast(type, msg) {
    authToastEl.textContent = msg;
    authToastEl.setAttribute('data-type', type);
    authToastEl.classList.add('is-on');
    clearTimeout(authToastT);
    authToastT = setTimeout(function () { authToastEl.classList.remove('is-on'); }, 2600);
  }

  // chuyển đổi giữa đăng nhập / đăng ký
  function setAuth(mode) {
    $('#authSwitch').classList.toggle('is-register', mode === 'register');
    $$('[data-auth]').forEach(function (b) {
      b.setAttribute('aria-selected', String(b.getAttribute('data-auth') === mode));
    });
    $$('.auth__form').forEach(function (f) {
      f.classList.toggle('is-on', f.id === (mode === 'register' ? 'formRegister' : 'formLogin'));
    });
    auth.setAttribute('aria-label', mode === 'register' ? 'Đăng ký' : 'Đăng nhập');
  }

  function openAuth(mode) {
    authFocus = document.activeElement;
    setAuth(mode === 'register' ? 'register' : 'login');
    auth.classList.add('is-open');
    auth.setAttribute('aria-hidden', 'false');
    var first = $('.auth__form.is-on input');
    setTimeout(function () { first.focus(); }, 260);
  }

  function closeAuth() {
    auth.classList.remove('is-open');
    auth.setAttribute('aria-hidden', 'true');
    if (authFocus) authFocus.focus();
  }

  // mở popup từ mọi nút Đăng Ký / Đăng Nhập trên trang
  // (capture + stopImmediatePropagation để chặn toast "đang cập nhật" của data-link)
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-link="login"], [data-link="register"]');
    if (!a) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    var url = linkOf(a.getAttribute('data-link'));
    if (url) {                     // có link thật trong CONFIG thì mở link thay vì popup
      window.open(url, '_blank', 'noopener');
      return;
    }
    setDrawer(false);
    openAuth(a.getAttribute('data-link'));
  }, true);

  $$('[data-auth]').forEach(function (b) {
    b.addEventListener('click', function () { setAuth(b.getAttribute('data-auth')); });
  });

  // đóng popup: nút × hoặc bấm ra nền đen
  auth.addEventListener('click', function (e) {
    if (e.target === auth || e.target.closest('[data-close-auth]')) closeAuth();
  });

  // hiện / ẩn mật khẩu
  $$('.auth__eye').forEach(function (b) {
    b.addEventListener('click', function () {
      var input = $('input', b.closest('.auth__field'));
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      b.classList.toggle('is-off', !show);
    });
  });

  // đăng nhập
  $('#formLogin').addEventListener('submit', function (e) {
    e.preventDefault();
    var user = this.elements.account.value.trim();
    var pass = this.elements.password.value;
    if (!user) return authToast('error', 'Vui lòng nhập tên đăng nhập!');
    if (!pass) return authToast('error', 'Vui lòng nhập mật khẩu!');
    // TODO: gọi API đăng nhập thật tại đây
    closeAuth();
    authToast('success', 'Đăng nhập thành công! Chào mừng trở lại, ' + user + '!');
  });

  // đăng ký
  $('#formRegister').addEventListener('submit', function (e) {
    e.preventDefault();
    var user = this.elements.account.value.trim();
    var pass = this.elements.password.value;
    var confirm = this.elements.confirm.value;
    if (user.length < 4) return authToast('error', 'Tên đăng nhập cần ít nhất 4 ký tự!');
    if (pass.length < 6) return authToast('error', 'Mật khẩu cần ít nhất 6 ký tự!');
    if (pass !== confirm) return authToast('error', 'Mật khẩu nhập lại chưa khớp!');
    // TODO: gọi API đăng ký thật tại đây
    setAuth('login');
    $('#formLogin').elements.account.value = user;
    authToast('success', 'Đăng ký thành công! Hãy đăng nhập để bắt đầu.');
  });

  /* ---------- tầm bảo: lượt, nhiệm vụ, quà ---------- */
  var state = { turns: CONFIG.startTurns, done: {}, bag: [], history: [] };

  function claimBag() {
    if (!state.bag.length) return;
    state.bag = [];
    toast('Nhận quà thành công! Quà sẽ được gửi vào hòm thư trong game.');
  }

  var POPS = {
    rule: function () {
      openPop({
        title: 'Thể Lệ',
        html: '<ol class="pop__rule">' + CONFIG.rules.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ol>'
      });
    },
    reward: function () {
      openPop({
        title: 'Phần Thưởng',
        html: state.bag.length
          ? '<ul class="pop__items">' + state.bag.map(itemHTML).join('') + '</ul>'
          : '<p class="pop__empty">Chưa có phần thưởng. Tầm Bảo để nhận quà nhé!</p>',
        btn: state.bag.length ? 'Nhận Quà' : null,
        onBtn: claimBag
      });
    },
    history: function () {
      openPop({
        title: 'Lịch Sử',
        html: state.history.length
          ? '<table class="pop__hist"><thead><tr><th>Thời gian</th><th>Phần thưởng</th></tr></thead><tbody>' +
            state.history.map(function (h) { return '<tr><td>' + esc(h.time) + '</td><td>' + esc(h.name) + '</td></tr>'; }).join('') +
            '</tbody></table>'
          : '<p class="pop__empty">Chưa có lịch sử Tầm Bảo.</p>'
      });
    }
  };

  $$('[data-pop]').forEach(function (b) {
    b.addEventListener('click', function () { POPS[b.getAttribute('data-pop')](); });
  });

  function taskHTML(t) {
    return '<li class="task"><span class="task__name">' + esc(t.name) + '</span><span class="task__turn">+ ' + t.turns +
      ' Lượt</span><button class="nbtn" type="button" data-task="' + t.id + '"><span>Nhận</span></button></li>';
  }

  $('#taskOnce').innerHTML = CONFIG.tasks.once.map(taskHTML).join('');
  $('#taskDaily').innerHTML = CONFIG.tasks.daily.map(taskHTML).join('');
  var allTasks = CONFIG.tasks.once.concat(CONFIG.tasks.daily);

  function doTaskAction(t) {
    if (t.link) {
      var url = linkOf(t.link);
      if (url) window.open(url, '_blank', 'noopener');
    } else if (t.action === 'share') {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href), '_blank', 'noopener,width=640,height=520');
    } else if (t.action === 'invite' && navigator.clipboard) {
      navigator.clipboard.writeText(location.href).catch(function () {});
    }
  }

  $('#tasks').addEventListener('click', function (e) {
    var b = e.target.closest('[data-task]');
    if (!b || b.disabled) return;
    var t = allTasks.filter(function (x) { return x.id === b.getAttribute('data-task'); })[0];
    doTaskAction(t);
    state.done[t.id] = true;
    state.turns += t.turns;
    b.disabled = true;
    $('span', b).textContent = 'Đã nhận';
    toast((t.action === 'invite' ? 'Đã sao chép link mời bạn. ' : '') + 'Nhận thành công +' + t.turns + ' lượt (còn ' + state.turns + ' lượt).');
  });

  var chests = $$('.tb__chest');
  var spinBtn = $('#tbSpin');
  var CHEST_ORDER = [2, 3, 4, 1, 0];   // chạy vòng: trái trên → phải trên → phải dưới → trái dưới → giữa

  function now() {
    var d = new Date();
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    return p(d.getHours()) + ':' + p(d.getMinutes()) + ' ' + p(d.getDate()) + '/' + p(d.getMonth() + 1);
  }

  spinBtn.addEventListener('click', function () {
    if (state.turns <= 0) {
      toast('Bạn đã hết lượt Tầm Bảo. Làm nhiệm vụ để nhận thêm lượt nhé!');
      return;
    }
    state.turns--;
    spinBtn.disabled = true;
    var reward = CONFIG.rewards[Math.floor(Math.random() * CONFIG.rewards.length)];
    var steps = 14 + Math.floor(Math.random() * 5);
    var i = 0;

    (function tick() {
      chests.forEach(function (c) { c.classList.remove('is-on'); });
      chests[CHEST_ORDER[i % CHEST_ORDER.length]].classList.add('is-on');
      i++;
      if (i < steps) {
        setTimeout(tick, 70 + i * 12);
        return;
      }
      setTimeout(function () {
        chests.forEach(function (c) { c.classList.remove('is-on'); });
        spinBtn.disabled = false;
        state.bag.push(reward);
        state.history.unshift({ time: now(), name: reward.name });
        openPop({
          title: 'Thông Báo',
          html: '<ul class="pop__items">' + itemHTML(reward) + '</ul>',
          btn: 'Nhận Quà',
          onBtn: claimBag
        });
      }, 450);
    })();
  });

  /* ---------- slider đặc sắc: 3 ảnh (trái – giữa – phải) trượt mượt ---------- */
  var slides = CONFIG.slides;
  var slider = $('#slider');
  var track = $('#sliderTrack');
  var stage = $('.slider__main', slider);
  var dotsEl = $('#dots');
  var n = slides.length;
  var STEP = 900; // khớp width .slider__cell trong css/style.css
  var DUR = 650; // khớp transition .slider__track trong css/style.css
  var p = 1; // ô hiện tại trên track: 0 = clone cuối, n+1 = clone đầu
  var cur = 0;
  var timer = null;
  var moving = false;

  function cell(src) {
    return '<div class="slider__cell"><img src="' + src + '" alt="" draggable="false" /></div>';
  }
  // dải slide: [clone cuối] + slides + [clone đầu] để vòng lặp trượt liền mạch
  track.innerHTML = cell(slides[n - 1]) + slides.map(cell).join('') + cell(slides[0]);
  slides.forEach(function (s) { new Image().src = s; });

  dotsEl.innerHTML = slides.map(function (_, i) {
    return '<button class="dot" type="button" role="tab" aria-label="Ảnh ' + (i + 1) + '" data-i="' + i + '"></button>';
  }).join('');
  var dots = $$('.dot', dotsEl);

  // 2 ô preview: ảnh trước (trái) và ảnh kế (phải)
  var sideViews = [$('.slider__side-view--left', slider), $('.slider__side-view--right', slider)];

  function paintDots() {
    dots.forEach(function (d, j) {
      d.classList.toggle('is-active', j === cur);
      d.setAttribute('aria-selected', String(j === cur));
    });
  }

  // đổi ảnh preview 2 bên, ảnh chạy cùng hướng với dải chính
  function setSides(dir, instant) {
    var targets = [(cur - 1 + n) % n, (cur + 1) % n];
    sideViews.forEach(function (el, k) {
      var img = $('img', el);
      el.style.setProperty('--dir', dir < 0 ? '-1' : '1');
      if (instant) { img.src = slides[targets[k]]; return; }
      el.classList.add('is-out');
      setTimeout(function () {
        img.src = slides[targets[k]];
        el.classList.remove('is-out');
      }, 280); // khớp transition .slider__side-view img trong css
    });
  }

  function place(anim) {
    if (!anim) track.style.transition = 'none';
    track.style.transform = 'translateX(' + (-p * STEP) + 'px)';
    if (!anim) { void track.offsetWidth; track.style.transition = ''; }
  }

  // hết trượt: nếu đang đứng ở ô clone thì nhảy về ô thật, không transition
  function settle() {
    if (p === n + 1 || p === 0) {
      p = p === n + 1 ? 1 : n;
      place(false);
    }
    moving = false;
  }

  function move(dp) {
    p = ((p - 1 + dp) % n + n) % n + 1;
    place(true);
    setSides(dp);
    paintDots();
    moving = true;
    setTimeout(settle, DUR + 30);
  }

  function go(dir) {
    if (moving) return;
    cur = (cur + dir + n) % n;
    p += dir; // cho phép rơi vào ô clone 0 / n+1, settle sẽ kéo về ô thật
    place(true);
    setSides(dir);
    paintDots();
    moving = true;
    setTimeout(settle, DUR + 30);
  }

  function jumpTo(i) {
    if (moving || i === cur) return;
    var d = i - cur;
    cur = i;
    move(d);
  }

  function play() {
    clearInterval(timer);
    timer = setInterval(function () { go(1); }, CONFIG.slideInterval);
  }

  dotsEl.addEventListener('click', function (e) {
    var d = e.target.closest('.dot');
    if (d) { jumpTo(+d.getAttribute('data-i')); play(); }
  });
  $$('[data-slide]', slider).forEach(function (b) {
    b.addEventListener('click', function () { go(+b.getAttribute('data-slide')); play(); });
  });
  slider.addEventListener('mouseenter', function () { clearInterval(timer); });
  slider.addEventListener('mouseleave', play);

  // vuốt trên mobile
  var sx = null;
  stage.addEventListener('pointerdown', function (e) { sx = e.clientX; });
  stage.addEventListener('pointerup', function (e) {
    if (sx === null) return;
    var dx = e.clientX - sx;
    sx = null;
    if (Math.abs(dx) > 40) { go(dx < 0 ? 1 : -1); play(); }
  });
  stage.addEventListener('pointercancel', function () { sx = null; });

  paintDots();
  place(false);
  setSides(1, true);
  play();

  /* ---------- hiện dần khi cuộn ---------- */
  var reveal = $$('.stitle, .step, .gift, .qh, .banner, .tb, .tasks, .slider');
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
