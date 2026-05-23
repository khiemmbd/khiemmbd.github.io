'use strict';

/* eslint-disable no-undef */

$(function () {

	// 动态设置CSS变量高度

	var windowHeight = $(window).height();

	document.documentElement.style.setProperty('--window-height', windowHeight + 'px');

	// $('.app').css('height', 'var(--window-height)')

	// $(document.body).css('height', 'var(--window-height)')


	// 若玩家首次进入，则重定向到首页

	// if (!localStorage.getItem('_first_in_')) {

	// 	// localStorage.setItem('_first_in_', 1)

	// 	window.location.href = '/'

	// }


	// 常量定义

	var STORAGE_KEY_STEP = 'flower_current_step';

	var STORAGE_KEY_NUMBER = 'flower_random_number';

	var STORAGE_KEY_QR_REPORTED = 'flower_qr_reported'; // 扫码上报标记


	// 花语图片名称数组

	var FLOWER_NAMES = ['분홍 장미', '해바라기', '데이지', '핑크 튜립', '동백꽃', '은방울꽃', '바이올렛', '보라색 수국', '안개꽃'];

	var TOTAL_NUMBERS = FLOWER_NAMES.length;

	// 步骤 HTML 模板

	var stepTemplates = {

		1: '\n\n\t\t\t<div class="step step-1">\n\n\t\t\t\t<a href="javascript:;" class="op-btn">\n\n\t\t\t\t\t<img src="https://cdn.goatgames.com/static/landing/mhg/flower/1/btn.png" alt="btn">\n\n\t\t\t\t</a>\n\n\t\t\t</div>\n\n\t\t',

		2: '\n\n\t\t\t<div class="step step-2">\n\n\t\t\t\t<div class="content">\n\n\t\t\t\t\t<img class="box-img" src="https://cdn.goatgames.com/static/landing/mhg/flower/2/box1.png" alt="tip">\n\n\t\t\t\t\t<a href="javascript:;" class="icon-q">\n\n\t\t\t\t\t\t<img src="https://cdn.goatgames.com/static/landing/mhg/flower/2/icon-q.png" alt="q">\n\n\t\t\t\t\t</a>\n\n\t\t\t\t\t<a href="javascript:;" class="copy-btn"></a>\n\n\t\t\t\t\t<a href="javascript:;" class="op-btn">\n\n\t\t\t\t\t\t<img src="https://cdn.goatgames.com/static/landing/mhg/flower/2/btn.png" alt="btn">\n\n\t\t\t\t\t</a>\n\n\t\t\t\t</div>\n\n\t\t\t\t<div class="dialog">\n\n\t\t\t\t\t<div class="close"><img src="https://cdn.goatgames.com/static/landing/mhg/flower/3/close.png" alt="close"></div>\n\n\t\t\t\t</div>\n\n\t\t\t</div>\n\n\t\t',

		3: '\n\n\t\t\t<div class="step step-3">\n\t\t\t\t<div class="box">\n\t\t\t\t<div class="box-img"></div>\n\t\t\t\t<div class="step-down">\n\n\t\t\t\t\t<a href="javascript:;" class="down-img"><img src="https://cdn.goatgames.com/static/landing/mhg/flower/4/down.png" alt="down"></a>\n\n\t\t\t\t</div>\n\t\t\t\t\t<a href="javascript:;" class="refresh">\n\t\t\t\t\t\t<img src="https://cdn.goatgames.com/static/landing/mhg/flower/4/icon-refresh.png" alt="refresh">\n\t\t\t\t\t</a>\n\t\t\t\t\t<a href="javascript:;" class="back">\n\t\t\t\t\t\t<img src="https://cdn.goatgames.com/static/landing/mhg/flower/4/icon-back.png" alt="back">\n\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="fix-float-flower">\n\t\t\t\t\t\t<div class="float-inner">\n\t\t\t\t\t\t\t<div class="j-float-flower">\n\t\t\t\t\t\t\t\t<div class="float-img">\n\t\t\t\t\t\t\t\t\t<img src="https://cdn.goatgames.com/static/landing/mhg/images/side/flo.png" alt=""></img>\n\t\t\t\t\t\t\t\t\t<img class="img-txt" src="https://cdn.goatgames.com/static/landing/mhg/images/side/text.png" alt="" />\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="float-button">\n\t\t\t\t\t\t\t\t\t<img src="https://cdn.goatgames.com/static/landing/mhg/images/side/btn1.png" alt=""></img>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="guide">\n\t\t\t\t\t\t<div class="guide-inner">\n\t\t\t\t\t\t\t<a href="javascript:;" class="save-img">\n\t\t\t\t\t\t\t\t<img src="https://cdn.goatgames.com/static/landing/mhg/flower/4/save.png" alt="refresh">\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<a href="https://game.naver.com/lounge/The_Cozy_Florist/board/6" target="_blank" class="share">\n\t\t\t\t\t\t\t\t<img src="https://cdn.goatgames.com/static/landing/mhg/flower/4/share.png" alt="share">\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t</div>\n\n\t\t'

		// 页面初始化

	};initPage();

	// 扫码事件处理：每次进入页面时上报

	setTimeout(function () {

		handleQREvent();
	}, 1000);

	// 事件绑定

	bindEvents();

	/**
 
  * 页面初始化：从缓存读取步骤状态
 
  */

	function initPage() {

		var currentStep = getStoredStep();

		renderStep(currentStep);

		showStep(currentStep);

		// 若已是第 3 步则加载对应图片

		if (currentStep === 3) {

			loadRandomNumber(false); // false：从缓存恢复，不上报事件
		}
	}

	/**
 
  * 渲染指定步骤的 HTML
 
  * @param {number} step - 步骤编号 (1, 2, 3)
 
  */

	function renderStep(step) {

		var template = stepTemplates[step];

		if (!template) {

			console.error('\uB2E8\uACC4 ' + step + '\uC758 \uD15C\uD50C\uB9BF\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4');

			return;
		}

		// 清空容器并插入新 HTML

		$('.app').html(template);

		$('.app').removeClass('st-1').removeClass('st-2').removeClass('st-3');

		$('.app').addClass('st-' + step);
	}

	/**
 
  * 事件上报
 
  * @param {string} evt - 事件名
 
  * @param {Object} param - 附加参数（可选）
 
  */

	function sendEvent(evt, param) {

		try {

			rbiTrack(evt, param);
		} catch (error) {

			console.log(error);
		}
	}

	/**
 
  * 绑定全部事件（事件委托）
 
  */

	var f_timer = null;
	var has_dowm = false;

	function bindEvents() {

		// 使用事件委托，为动态生成的元素绑定事件

		$('.app').on('click', '.step-1 .op-btn', function () {

			// 主按钮点击上报

			sendEvent('event_main_button_click');

			handleNextStep();
		});

		$('.app').on('click', '.step-2 .copy-btn', function () {

			copyToClipboard('#더코지플로리스트 #게임만해도진짜꽃을드려요');
		});

		$('.app').on('click', '.step-2 .op-btn', function () {

			// 花语图生成按钮点击上报

			sendEvent('event_flower_generate_click');

			handleNextStep();
		});

		$('.app').on('click', '.step-2 .dialog .close', function () {

			$('.step-2').removeClass('show');
		});

		$('.app').on('click', '.step-2 .icon-q', function () {

			// 活动规则点击上报

			sendEvent('event_rule_click');

			$('.step-2').addClass('show');
		});

		$('.app').on('click', '.step-3 .refresh', function () {

			// 刷新按钮点击上报

			sendEvent('event_refresh_click');

			handleRefresh();
		});

		$('.app').on('click', '.step-3 .save-img', function () {

			handleSaveImage();
		});

		$('.app').on('click', '.step-3 .back', function () {

			// 返回第 2 步，仅切换步骤不上报

			handleBackToStep2();
		});

		// 社交媒体分享点击上报

		$('.app').on('click', '.media-item.fb', function () {

			sendEvent('event_share_facebook_click');
		});

		$('.app').on('click', '.media-item.ins', function () {

			sendEvent('event_share_instagram_click');
		});

		$('.app').on('click', '.media-item.kakao', function () {

			sendEvent('event_share_kakao_click');
		});

		$('.app').on('click', '.media-item.naver', function () {

			sendEvent('event_jump_naver_click');
		});
		$('.app').on('click', '.down-img', function (e) {

			e.stopPropagation(); // 阻止事件冒泡,避免触发全局点击事件

			$('.step-3').addClass('show-guide');
			f_timer = setTimeout(function () {
				if (!has_dowm) {
					$('.fix-float-flower').addClass('opacity').fadeIn();
				}
				clearTimeout(f_timer);
			}, 3000);
		});

		$(document).on('click', '.step-3', function (e) {

			if ($('.step-3').hasClass('show-guide')) {

				var $guide = $('.guide');

				if (!$guide.is(e.target) && $guide.has(e.target).length === 0) {

					$('.step-3').removeClass('show-guide');
					$('.fix-float-flower').fadeOut();
				}
			}
		});
		$('.app').on('click', '.j-float-flower', function () {
			sendEvent('event_share_reserve_jump');
			setTimeout(function () {
				window.location.href = '/?fTo=flower-gift&p=2';
			}, 500);
		});
	}

	/**
 
  * 处理进入下一步
 
  */

	function handleNextStep() {

		var currentStep = getStoredStep();

		var nextStep = currentStep + 1;

		var shouldReportEvent = true;

		// 从第 2 步进入第 3 步时

		if (currentStep === 2 && nextStep === 3) {

			var existingNumber = getStoredRandomNumber();

			// 若已有随机数则不再生成

			if (existingNumber) {

				shouldReportEvent = false;
			} else {

				var randomNumber = generateRandomNumber();

				storeRandomNumber(randomNumber);
			}
		}

		// 最多到第 3 步

		if (nextStep > 3) {

			nextStep = 3;
		}

		storeStep(nextStep);

		renderStep(nextStep);

		showStep(nextStep);

		// 进入第 3 步时加载对应随机数图片

		if (nextStep === 3) {

			loadRandomNumber(shouldReportEvent);
		}
	}

	/**
 
  * 显示指定步骤
 
  * @param {number} step - 步骤编号 (1, 2, 3)
 
  */

	function showStep(step) {

		// 每次都会整体替换 HTML，无需额外 class 管理

		// 仅显示当前步骤

		$('.step-' + step).show();
	}

	/**
 
  * 刷新按钮：清除缓存并重新随机
 
  */

	function handleRefresh() {

		// 清除随机数缓存

		localStorage.removeItem(STORAGE_KEY_NUMBER);

		// 重新生成随机数

		var randomNumber = generateRandomNumber();

		storeRandomNumber(randomNumber);

		loadRandomNumber();
	}

	/**
 
  * 生成随机数（0–8，排除已用索引）
 
  * @returns {number} 随机索引
 
  */

	function generateRandomNumber() {

		// 获取已用索引列表

		var usedNumbers = getUsedNumbers();

		// 若所有图片都已用过则重置

		if (usedNumbers.length >= TOTAL_NUMBERS) {

			clearUsedNumbers();

			return Math.floor(Math.random() * TOTAL_NUMBERS);
		}

		// 生成未使用过的随机索引

		var randomIndex = void 0;

		do {

			randomIndex = Math.floor(Math.random() * TOTAL_NUMBERS);
		} while (usedNumbers.includes(randomIndex));

		return randomIndex;
	}

	/**
 
  * 加载随机数及对应图片
 
  * @param {boolean} shouldReportEvent - 是否上报事件（默认 true）
 
  */

	function loadRandomNumber() {
		var shouldReportEvent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;


		var index = getStoredRandomNumber();

		if (index === null || index === undefined) return;

		// 显示加载动画

		showLoadingGif();

		// 模拟加载延迟（可按需调整或去掉）

		setTimeout(function () {

			// 移除所有 b0–b8 相关类

			$('.step-3 .box').removeClass(function (index, className) {

				return (className.match(/\bb\d+\b/g) || []).join(' ');
			});

			// 添加对应类（索引+1，以保持 CSS 类名为 b1–b9）

			$('.step-3 .box').addClass('b' + (index + 1));

			// 设置保存图片地址（索引+1 对应文件名）

			var imgUrl = 'https://cdn.goatgames.com/static/landing/mhg/flower/4/' + (index + 1) + '.jpg';

			$('.step-3 .save-img').data('src', imgUrl);

			// 花语图生成成功事件上报（有条件）

			if (shouldReportEvent) {

				sendEvent('event_flower_generate_success');
			}

			// 隐藏加载动画

			hideLoadingGif();
		}, 500); // 延迟 500ms，便于看清动画
	}

	/**
 
  * 显示加载动画
 
  */

	function showLoadingGif() {

		// 若已有 gif 则先移除

		$('.app .gif').remove();

		// 创建并插入 gif 节点

		var gifElement = $('<div class="gif"></div>');

		$('.app').append(gifElement);
	}

	/**
 
  * 隐藏加载动画
 
  */

	function hideLoadingGif() {

		$('.app .gif').remove();
	}

	/**
 
  * 保存图片
 
  */

	function handleSaveImage() {

		var imgUrl = $('.step-3 .save-img').data('src');

		if (!imgUrl) return;

		// 保存图片事件上报

		sendEvent('event_poster_save');

		// 复制文案

		copyToClipboard('#더코지플로리스트 #게임만해도진짜꽃을드려요');

		// 使用 fetch 下载图片并通过 blob URL 规避 CORS

		fetch(imgUrl).then(function (response) {

			if (!response.ok) {

				throw new Error('네트워크 응답이 성공하지 않음');
			}

			return response.blob();
		}).then(function (blob) {

			var url = URL.createObjectURL(blob);

			var link = document.createElement('a');

			link.href = url;

			// 按花语名称设置文件名

			var flowerIndex = getStoredRandomNumber();

			var fileName = FLOWER_NAMES[flowerIndex] || 'flower_' + (flowerIndex + 1);

			link.download = fileName + '.jpg';

			document.body.appendChild(link);

			link.click();

			document.body.removeChild(link);

			URL.revokeObjectURL(url); // 释放内存

			setTimeout(function () {
				$('.fix-float-flower').removeClass('opacity').fadeIn();
			}, 500);

			// 记录已用序号

			recordUsedNumber(flowerIndex);
		}).catch(function (err) {

			console.error('이미지 다운로드 오류:', err);

			// 兜底：新标签页打开

			window.open(imgUrl, '_blank');
		});
	}

	/**
 
  * 复制文本
 
  * @param {string} text - 要复制的文本
 
  */

	function copyToClipboard(text) {

		// 创建临时 textarea

		var textarea = document.createElement('textarea');

		textarea.value = text;

		// 样式设为不可见

		textarea.style.position = 'fixed';

		textarea.style.opacity = '0';

		document.body.appendChild(textarea);

		textarea.select();

		try {

			// 执行复制

			var successful = document.execCommand('copy');

			if (successful) {

				console.log('文本复制成功');

				// 轻提示

				showToast('해시태그가 복사되었습니다.');
			} else {

				console.warn('복사 실패');
			}
		} catch (err) {

			console.error('복사 작업 실패:', err);
		}

		// 移除临时节点

		document.body.removeChild(textarea);
	}

	/**
 
  * 轻提示
 
  * @param {string} message - 提示文案
 
  */

	function showToast(message) {

		// 若已有提示则先移除

		var existingToast = document.querySelector('.toast-message');

		if (existingToast) {

			existingToast.remove();
		}

		// 创建提示节点

		var toast = document.createElement('div');

		toast.className = 'toast-message';

		toast.textContent = message;

		document.body.appendChild(toast);

		// 2 秒后自动消失

		setTimeout(function () {

			toast.classList.add('fade-out');

			setTimeout(function () {

				toast.remove();
			}, 300); // 等待淡出动画结束
		}, 2000);
	}

	/**
 
  * 从缓存读取当前步骤
 
  * @returns {number} 当前步骤 (1, 2, 3)
 
  */

	function getStoredStep() {

		var step = localStorage.getItem(STORAGE_KEY_STEP);

		return step ? parseInt(step) : 1;
	}

	/**
 
  * 将步骤写入缓存
 
  * @param {number} step - 步骤编号
 
  */

	function storeStep(step) {

		localStorage.setItem(STORAGE_KEY_STEP, step);
	}

	/**
 
  * 从缓存读取随机数
 
  * @returns {number|null} 随机数
 
  */

	function getStoredRandomNumber() {

		var number = localStorage.getItem(STORAGE_KEY_NUMBER);

		return number ? parseInt(number) : null;
	}

	/**
 
  * 将随机数写入缓存
 
  * @param {number} number - 随机数
 
  */

	function storeRandomNumber(number) {

		localStorage.setItem(STORAGE_KEY_NUMBER, number);
	}

	/**
 
  * 获取已使用序号列表
 
  * @returns {Array} 已用序号数组
 
  */

	function getUsedNumbers() {

		var used = localStorage.getItem('flower_used_numbers');

		return used ? JSON.parse(used) : [];
	}

	/**
 
  * 记录已使用序号
 
  * @param {number} number - 要记录的序号
 
  */

	function recordUsedNumber(number) {

		var usedNumbers = getUsedNumbers();

		if (!usedNumbers.includes(number)) {

			usedNumbers.push(number);

			localStorage.setItem('flower_used_numbers', JSON.stringify(usedNumbers));
		}
	}

	/**
 
  * 清空已使用序号记录
 
  */

	function clearUsedNumbers() {

		localStorage.removeItem('flower_used_numbers');
	}

	/**
 
  * 扫码相关事件
 
  */

	function handleQREvent() {

		// 每次进入页面都上报扫码次数

		sendEvent('event_QR_scan');

		// 是否为新设备

		var isFirstDevice = !localStorage.getItem(STORAGE_KEY_QR_REPORTED);

		if (isFirstDevice) {

			// 新设备扫码进入

			sendEvent('event_QR_enter_new_device');

			// 记录该设备已上报

			localStorage.setItem(STORAGE_KEY_QR_REPORTED, '1');
		} else {

			// 老设备扫码进入

			sendEvent('event_QR_enter_old_device');
		}
	}

	/**
 
  * 返回第 2 步
 
  */

	function handleBackToStep2() {

		// 仅切换步骤，返回时不做事件上报

		storeStep(2);

		renderStep(2);

		showStep(2);
	}
});