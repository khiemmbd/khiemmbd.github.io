'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-undef */
$(function () {

  var client = gtUtils.judgeClient();
  var _currentClient = gtUtils.isMac() || client === 'ios' ? 'ios' : 'android';

  /**
   * 游戏特色
   */
  var gameFeature = {
    init: function init() {
      window.__MOBILE ? this.initMobile() : this.initPC();
    },
    initPC: function initPC() {
      var _ref;

      if (window.__MOBILE) return;
      new Swiper('#gameFeatureSwiper', (_ref = {
        // 启用懒加载
        lazy: true
      }, _defineProperty(_ref, 'lazy', {
        loadOnTransitionStart: true // 或者 loadPrevNext: true,
      }), _defineProperty(_ref, 'effect', 'coverflow'), _defineProperty(_ref, 'speed', 600), _defineProperty(_ref, 'loop', true), _defineProperty(_ref, 'centeredSlides', true), _defineProperty(_ref, 'initialSlide', 0), _defineProperty(_ref, 'coverflowEffect', {
        rotate: 60,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: true
      }), _defineProperty(_ref, 'slidesPerView', "auto"), _defineProperty(_ref, 'autoplay', true), _defineProperty(_ref, 'delay', 3000), _defineProperty(_ref, 'pagination', {
        el: '.swiper02-pagination'
      }), _defineProperty(_ref, 'navigation', {
        nextEl: '.swiper02-button-next',
        prevEl: '.swiper02-button-prev'
      }), _ref));
    },
    initMobile: function initMobile() {
      var _ref2;

      new Swiper('#gameFeatureSwiper', (_ref2 = {
        // 启用懒加载
        lazy: true
      }, _defineProperty(_ref2, 'lazy', {
        loadOnTransitionStart: true // 或者 loadPrevNext: true,
      }), _defineProperty(_ref2, 'loop', true), _defineProperty(_ref2, 'autoplay', true), _defineProperty(_ref2, 'delay', 3000), _defineProperty(_ref2, 'pagination', {
        el: '.swiper02-pagination'
      }), _defineProperty(_ref2, 'navigation', {
        nextEl: '.swiper02-button-next',
        prevEl: '.swiper02-button-prev'
      }), _ref2));
    }
  };
  gameFeature.init();

  $('.js-close').on('click', function () {
    $('.dialog').fadeOut();
  });

  gtUtils.renderStoreLink();

  function initEvent() {
    // $(window).on('scroll', gtUtils.debounce(function () {
    //   const scrollTop = $(window).scrollTop()
    //   const ofsetTop = $('.app .section[data-id="2"]').offset().top
    //   const num = ofsetTop - scrollTop
    //   console.log(num, ofsetTop)
    //   if (num < -900 || num > 300) {
    //     $('.fix-float-flower').show()
    //   } else {
    //     $('.fix-float-flower').hide()
    //   }
    // }, 50))

    $('.j-toggle').click(function () {
      var $el = $('.fix-float-medias');
      if ($el.hasClass('hiden')) {
        $el.removeClass('hiden');
      } else {
        $el.addClass('hiden');
      }
    });
    $('.j-flower-close').on('click', function () {
      $('.fix-float-flower').fadeOut();
    });
    
    function scrollTo2() {
      var _top = $('.app .section[data-id="2"]').offset().top + 20;
      window.scrollTo({
        top: _top,
        behavior: 'smooth'
      });
    }
    $('.j-float-flower').on('click', scrollTo2);

    var _query = gtUtils.getQueryObject();
    if (_query && _query.fTo === 'flower-gift' && _query.p === '2') {
      setTimeout(scrollTo2, 1500);
    }

    // 导航点击
    $('.nav-list .nav-item').on('click', function () {
      var _id = $(this).data('id');
      var _top = $('.app .section[data-id="' + _id + '"]').offset().top + 20;
      window.scrollTo({
        top: _top,
        behavior: 'smooth'
      });
      $('.fix-top .nav-btn').removeClass('active');
      $('.fix-top .nav-list').removeClass('active');
    });
  }

  initEvent();

  window._diaStatus = 1;
  gtUtils.renderDialogControl();

  if (window.__MOBILE) {
    $('.fix-top .nav-btn').on('click', function () {
      $(this).toggleClass('active');
      $('.fix-top .nav-list').toggleClass('active');
    });
    $('.fix-top .nav-list .media-btn').on('click', function () {
      $('.fix-top .nav-btn').removeClass('active');
      $('.fix-top .nav-list').removeClass('active');
    });
  }

  // 埋点
  var EventTrack = {
    // 缓存键名
    _storageKey: 'event_track_cache',
    // 缓存有效期（毫秒），默认 24 小时
    _expireTime: 7 * 24 * 60 * 60 * 1000,

    // 获取缓存的事件集合
    _getEventCache: function _getEventCache() {
      try {
        var cached = localStorage.getItem(this._storageKey);
        if (!cached) {
          return {};
        }
        var data = JSON.parse(cached);
        // 清理过期事件
        var now = Date.now();
        var validData = {};
        for (var evt in data) {
          if (now - data[evt] < this._expireTime) {
            validData[evt] = data[evt];
          }
        }
        return validData;
      } catch (e) {
        console.log('读取事件缓存失败:', e);
        return {};
      }
    },

    // 保存事件到缓存
    _saveEvent: function _saveEvent(evt) {
      try {
        var data = this._getEventCache();
        data[evt] = Date.now();
        localStorage.setItem(this._storageKey, JSON.stringify(data));
      } catch (e) {
        console.log('保存事件缓存失败:', e);
        // localStorage 可能已满，尝试清理后再保存
        try {
          localStorage.removeItem(this._storageKey);
          localStorage.setItem(this._storageKey, JSON.stringify(_defineProperty({}, evt, Date.now())));
        } catch (e2) {
          console.log('清理后保存仍失败:', e2);
        }
      }
    },

    // 检查事件是否已上报
    _hasEvent: function _hasEvent(evt) {
      var cache = this._getEventCache();
      return cache.hasOwnProperty(evt);
    },
    send: function send(evt, param) {
      // 排重检查：如果事件已上报过，直接返回
      if (this._hasEvent(evt)) {
        console.log('事件已上报，跳过:', evt);
        return;
      }
      // 将事件加入缓存
      this._saveEvent(evt);
      try {
        gtag('event', evt);
      } catch (error) {
        console.log(error);
      }
      var ttEvt = evt;
      if (['mhg_bookingclick'].includes(evt)) {
        try {
          ttq.track('ClickButton');
        } catch (error) {
          console.log(error);
        }
      }
      if (['mhg_popup'].includes(evt)) {
        try {
          ttq.track('CompleteRegistration');
        } catch (error) {
          console.log(error);
        }
      }
      if (['mhg_store'].includes(evt)) {
        try {
          ttq.track('AddToWishlist');
        } catch (error) {
          console.log(error);
        }
      }
      try {
        ttq.track(ttEvt);
      } catch (error) {
        console.log(error);
      }
    }
  };

});