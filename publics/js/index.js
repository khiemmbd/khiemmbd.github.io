'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-undef */
$(function () {

  var game_id = 10089;
  // var activity_name = 'thecozyflorist_kr_v1'
  var country_code = '+82';
  var global_area = 4;
  var client = gtUtils.judgeClient();
  var _currentClient = gtUtils.isMac() || client === 'ios' ? 'ios' : 'android';
  var apiDomain = '/api';
  var onlineDomain = "https://official-backend.goatgames.com/api";
  var sandboxDomain = "https://officialsandbox-backend.goatgames.com/api";
  if (location.host.indexOf('thecozyflorist') > -1) {
    if (location.host.indexOf('sandbox') > -1) {
      apiDomain = sandboxDomain;
    } else {
      apiDomain = onlineDomain;
    }
  }
  var countTimer = null;
  var isLogin = gtUtils.getItem('token') ? true : false;
  var uname = gtUtils.getItem('username') || '';
  var reqHeaders = {
    lang: 'kr',
    area: 'kr'
  };
  var answerParam = null;
  var canSubmitQuestion = false;
  var AJAX = {
    getPres: function getPres(_data) {
      var def = $.Deferred();
      var data = _data || {};
      _data.area = global_area;
      $.ajax({
        method: 'get',
        url: apiDomain + '/v1/preRegister',
        data: data,
        success: function success(res) {
          def.resolve(res.data);
        },
        error: function error(e) {
          console.log(e);
        }
      });
      return def.promise();
    },
    // 发送验证码
    sendCode: function sendCode(_data) {
      var def = $.Deferred();
      var data = _data || {};
      data.game_id = game_id;
      data.country_code = country_code;
      $.ajax({
        method: 'post',
        url: apiDomain + '/v1/sendSmsCaptcha',
        contentType: 'application/json',
        headers: reqHeaders,
        data: JSON.stringify(data),
        success: function success(data) {
          def.resolve(data);
        },
        error: function error(e) {
          console.log(e);
          def.reject(e);
        }
      });
      return def.promise();
    },
    sendMobile: function sendMobile(_data) {
      var def = $.Deferred();
      var data = _data || {};
      data.game_id = game_id;
      data.country_code = country_code;
      $.ajax({
        method: 'post',
        url: apiDomain + '/v1/smsLogin',
        contentType: 'application/json',
        headers: reqHeaders,
        data: JSON.stringify(data),
        success: function success(data) {
          def.resolve(data);
        },
        error: function error(e) {
          console.log(e);
        }
      });
      return def.promise();
    },
    postQuestion: function postQuestion(_data) {
      var def = $.Deferred();
      var data = _data || {};
      data.game_id = game_id;
      var _header = reqHeaders;
      _header.Authorization = 'Bearer ' + gtUtils.getItem('token');
      $.ajax({
        method: 'post',
        url: apiDomain + '/v1/questionnaireSubmit',
        contentType: 'application/json',
        headers: _header,
        data: JSON.stringify(data),
        success: function success(data) {
          def.resolve(data);
        },
        error: function error(e) {
          console.log(e);
        }
      });
      return def.promise();
    }

    /**
     * 游戏特色
     */
  };var gameFeature = {
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

  function validPhone(phone) {
    // return true
    var re = /^(010|011|016|017|018|019)-?[0-9]{3,4}-?[0-9]{4}$/;
    return re.test(phone);
  }

  // 提交验证
  function validateForm(type) {
    var $phone = $('.js-input-phone');
    var phoneValue = $($phone[0]).val();
    if (!validPhone(phoneValue)) {
      toastr.warning('유효한 휴대폰 번호를 입력해 주세요.');
      return false;
    }
    return phoneValue;
  }
  // 校验手机验证码
  function validateCode(type) {
    var $code = $('.js-input-code');
    var codeValue = $($code[0]).val();
    if (!codeValue) {
      toastr.warning('인증 코드를 입력해 주세요');
      return false;
    }
    return codeValue;
  }

  /**
   * 重置表单
   * 清空手机号和验证码输入框，并清除倒计时定时器
   */
  function resetForm() {
    $('.js-input-phone').val('');
    $('.js-input-code').val('');
    $('.form-item-code-btn').removeClass('disabled');
    $('.j-time-num').text('');
    canSubmitQuestion = false;
    clearInterval(countTimer);
  }

  $('.js-submit-phone').on('click', function (e) {
    var p = validateForm();
    if (!p) return;
    var c = validateCode();
    if (!c) return;
    if (p && c) {
      AJAX.sendMobile({ mobile: p, captcha: c }).then(function (res) {
        if (res.errCode === 0) {
          gtUtils.setItem('token', res.data.token);
          gtUtils.setItem('username', res.data.username);
          isLogin = true;
          uname = res.data.username;
          setUserInfo();
          toastr.success('로그인 성공');
          $('.js-phone-dialog').fadeOut();
          if (canSubmitQuestion) {
            $('.j-c-tip-dialog2').fadeIn();
          }
          resetForm();
          EventTrack.send('mhg_login_success');
        } else if (res.errCode === 1001) {
          toastr.warning('이미 사용 중인 휴대폰 번호입니다. 다시 시도해 주세요');
        } else if (res.errCode === 1000) {
          toastr.warning('규정에 맞지 않는 번호입니다. 다시 시도해 주세요~');
        } else if (res.errCode === 2004) {
          toastr.warning('인증 코드 오류');
        } else if (res.errCode === 100) {
          toastr.warning('요청이 너무 많습니다. 잠시 후 다시 시도해 주세요');
        } else {
          toastr.warning('시스템 오류가 발생했습니다. 페이지를 새로고침 후 다시 시도해 주세요');
        }
      });
    }
  });

  $('.js-close').on('click', function () {
    $('.dialog').fadeOut();
    resetForm();
  });

  gtUtils.renderStoreLink();

  var tipTxts = {
    1: '지금 바로 심고, 꽃다발을 받아보세요!<br />게임에서 꽃을 심고 수확하면, 현실에서 진짜 꽃다발을 받아보실 수 있습니다!<br />서버 오픈 기간 동안 진행되는 ‘한정 기간 꽃다발 증정’ 이벤트! 정원에서 어떤 종류의 꽃이든 심고 수확하면 꽃다발 선물을 받을 기회가 주어집니다. 저희는 전문 택배 업체와 협력하여 아름다운 꽃다발을	무료로 배송해 드리며, 여러분께 진정한 힐링의 시간을 선사합니다!',
    2: '출석만 해도 풍성한 선물을 드립니다!<br/>매일 로그인하면 독점 원예 용품 증정<br/>출석만 해도 선물을 드립니다! 첫날에는 성장 촉진 비료를, 7일째는 희귀 꽃씨앗을 받으실 수 있습니다. 그 외에도 예쁜 꽃병 등 다양한 꽃 장식 아이템까지 놓치지 마세요~',
    3: "접속 박스 이벤트<br/>머물러준 시간만으로도 고마워요 – 접속 즉시 깜짝 박스를 선물로 드려요!<br/>접속만 해도 보상 획득! 하루 60분 누적 접속 시, 보물 상자를 무료로 열 수 있습니다. 보물 상자에서는 랜덤 꽃씨, 체력 회복 약, 고급 비료 등 다양한 아이템이 등장해요. 게임에 오래 머무를수록 더 많은 보상을 받아가세요!",
    4: "매일 제공되는 커뮤니티 혜택!<br/>소식을 확인하고 퀴즈를 풀면 매일 보상을 받을 수 있습니다!<br/>매일 정해진 시간에 커뮤니티에서 단독 선물 코드가 공개됩니다. 커뮤니티에 방문해 코드를 복사하면 바로 보상 획득!",
    5: "길드 혜택 상점!<br/>혼자 꽃을 키우다 보면 외로움을 느끼시나요? 길드에 가입하여 함께 성장할 친구들을 만나보세요. 저렴한 가격으로 쇼핑할 수 있는 혜택도 누릴 수 있어, 초보자 단계를 빠르게 극복하는 데 도움이 될 거예요!",
    6: "『더 코지 플로리스트』 다운로드 오픈!<br />오픈 기념 첫 달 한정!<br />모든 플로리스트님께 한국 서버 전용 프로필 프레임, 채팅 버블, 한정 칭호를 선물로 드려요.<br />특별한 꾸미기 아이템으로 나만의 플로리스트 감성을 완성해보세요!<br />지금 바로 다운로드하고<br />『더 코지 플로리스트』의 첫 번째 플로리스트가 되어보세요♡<br />※ 이벤트 보상 수령 기간: 6월 7일까지"
  };
  var ruleTip = "1. 이벤트 기간 동안, '더 코지 플로리스트' 예약 페이지에 성공적으로 로그인하고 설문 조사를 모두 완료한 플로리스트님께만 실물 꽃다발 추첨 이벤트에 참여할 수 있는 기회가 주어집니다.<br/>2. 실제 꽃다발 당첨 여부는 설문 제출 완료 후 영업일 기준 7일 이내에 이메일 또는 문자 메시지를 통해 안내드립니다. 원활한 안내를 위해 입력하신 정보가 정확한지 반드시 확인해 주시고, 문자 및 이메일 수신을 유의해 주시기 바랍니다.<br/>3. 수집된 개인정보는 실제 꽃다발의 오프라인 배송을 위한 용도로만 사용되며, 당사는 이용자의 개인정보를 안전하게 보호합니다.";

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
    $('.section-2 .in-section .g-btn').on('click', function (e) {
      e.preventDefault();
      var id = $(this).data('id');
      $('.j-c-tip-dialog1 .content-text').html(tipTxts[id]);
      $('.j-c-tip-dialog1').fadeIn();
    });
    $('.j-rule-tip').on('click', function (e) {
      e.preventDefault();
      $('.j-c-tip-dialog1 .content-text').html(ruleTip);
      $('.j-c-tip-dialog1').fadeIn();
    });
    $('.j-close').on('click', function () {
      $('.j-normal-tip-dialog').fadeOut();
    });

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

    $('.j-not-login .login-btn').on('click', function () {
      $('.js-phone-dialog').fadeIn();
      EventTrack.send('mhg_login');
    });
    $('.j-loged-in .login-btn').on('click', function () {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      isLogin = false;
      uname = '';
      setUserInfo();
      location.reload();
    });
    // 获取验证码
    $('.js-get-code').on('click', function () {
      var p = validateForm();
      if (!p) return;
      if ($('.form-item-code-btn').hasClass('disabled')) return;
      $('.form-item-code-btn').addClass('disabled');
      AJAX.sendCode({ mobile: p }).then(function (res) {
        if (res.errCode === 0) {
          codeCountDown();
        } else if (res.errCode === 100) {
          $('.form-item-code-btn').removeClass('disabled');
          toastr.warning('요청이 너무 많습니다. 잠시 후 다시 시도해 주세요');
        } else {
          console.log(res.message);
          toastr.warning('인증 코드 발송에 실패했습니다. 잠시 후 다시 시도해 주세요');
          $('.form-item-code-btn').removeClass('disabled');
        }
      }, function () {
        $('.form-item-code-btn').removeClass('disabled');
      });
    });
    // 提交问卷调查
    $('.j-submit-questionnaire').on('click', function () {
      // 获取问卷里面选择的值，可通过 name 属性获取到选中的值，分别是radio,checkbox,email
      var question1 = $('input[name="q1"]:checked').val();
      var question2 = $('input[name="q2"]:checked').val();
      var question3 = $('input[name="q3"]:checked').val();
      // q4是checkbox，需要获取所有被选中的值，返回一个数组
      var question4 = $('input[name="q4"]:checked').map(function () {
        return $(this).val();
      }).get();
      // q5是email输入框，需要校验邮箱格式
      var question5 = $('input[name="q5"]').val();
      // 所有问题都必须有值
      if (!question1 || !question2 || !question3 || question4.length === 0 || !question5) {
        toastr.warning('모든 항목을 입력해 주세요.');
        return;
      }
      // 校验邮箱格式
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(question5)) {
        toastr.warning('유효한 이메일 주소를 입력해주세요.');
        return;
      }
      $('.j-email-t').text(question5);
      console.log('问卷结果：', { question1: question1, question2: question2, question3: question3, question4: question4, question5: question5 });
      answerParam = { q1: question1, q2: question2, q3: question3, q4: question4, q5: question5 };
      canSubmitQuestion = true;
      // 判断是否已登录
      if (!isLogin) {
        toastr.warning('설문을 제출하려면 먼저 로그인해야 합니다.');
        $('.js-phone-dialog').fadeIn();
        return;
      }
      $('.j-c-tip-dialog2').fadeIn();
    });
    // 确定提交问卷调查
    $('.js-confirm-submit').on('click', function () {
      // 提交成功之后
      AJAX.postQuestion({ content: JSON.stringify(answerParam) }).then(function (res) {
        if (res.errCode === 0) {
          EventTrack.send('mhg_survey_complete');
          $('.j-c-tip-dialog2').fadeOut();
          toastr.success('제출됨');
          $('.j-dialog3').fadeIn();
        } else if (res.errCode === 1003) {
          toastr.warning('설문 제출 완료하셨습니다.');
        } else {
          toastr.warning('제출 실패');
        }
      });
    });
  }

  initEvent();

  function setUserInfo() {
    if (isLogin) {
      $('.j-not-login').hide();
      $('.j-loged-in .login-text').text(uname);
      $('.j-loged-in').show();
    } else {
      $('.j-not-login').show();
      $('.j-loged-in .login-text').text('');
      $('.j-loged-in').hide();
    }
  }
  setUserInfo();

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
        rbiTrack(evt, param);
      } catch (error) {
        console.log(error);
      }

      try {
        fbq('track', evt);
      } catch (error) {
        console.log(error);
      }
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
      if (['mhg_login_success'].includes(evt)) {
        try {
          ttq.track('Subscribe');
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
  function sendStoreEvent() {
    $('.store-btn').on('click', function () {
      if ($(this).hasClass('j-show-dia')) {
        EventTrack.send('mhg_bookingclick');
        return;
      }
      EventTrack.send('mhg_store');
      // 标记玩家进来过
      gtUtils.setItem('_first_in_', 1);
      if ($(this).data('position') === 'top') {
        EventTrack.send('mhg_store_mainpage');
      }
      if ($(this).data('position') === 'popup') {
        EventTrack.send('mhg_popup');
      }
      if ($(this).data('position') === 'side') {
        EventTrack.send('mhg_store_sidebar');
      }
      if ($(this).data('position') === 'confirm') {
        EventTrack.send('mhg_survey_storeclick');
      }
    });
    $('.js-phone-dialog .js-close').on('click', function () {
      EventTrack.send('mhg_number_fail');
    });
    $('.j-facebook').on('click', function () {
      EventTrack.send('mhg_facebook');
    });
    $('.j-facebookgroup').on('click', function () {
      EventTrack.send('mhg_facebookgroup');
    });
    $('.j-discord').on('click', function () {
      EventTrack.send('mhg_discord');
    });
    $('.j-instagram').on('click', function () {
      EventTrack.send('mhg_instagram');
    });
    $('.j-tiktok').on('click', function () {
      EventTrack.send('mhg_tiktok');
    });
    $('.j-navergame').on('click', function () {
      EventTrack.send('mhg_navergame');
    });
    $('.j-kakao').on('click', function () {
      EventTrack.send('mhg_kakao');
    });
  }
  sendStoreEvent();

  // 验证码，倒计时一分钟
  function codeCountDown() {
    var $this = $('.js-get-code');
    var $timeEl = $('.j-time-num');
    var countdown = 60; // 60秒倒计时

    clearInterval(countTimer);

    // 初始化显示
    $timeEl.text(countdown);

    // 开始倒计时
    countTimer = setInterval(function () {
      countdown--;
      $timeEl.text(countdown);

      // 倒计时结束
      console.log(countdown);
      if (countdown <= 0) {
        clearInterval(countTimer);
        $('.form-item-code-btn').removeClass('disabled');
        $timeEl.text('');
      }
    }, 1000);
  }

  lazyLoadInit({
    coverColor: "",
    coverDiv: "",
    offsetBottom: 500,
    offsetTopm: 500,
    showTime: 1100,
    onLoadBackEnd: function onLoadBackEnd(i, e) {
      console.log("onLoadBackEnd:" + i);
    },
    onLoadBackStart: function onLoadBackStart(i, e) {
      console.log("onLoadBackStart:" + i);
    }
  });
});