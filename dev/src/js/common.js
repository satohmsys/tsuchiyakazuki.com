import $ from 'jquery';

let $w = $(window),
	$body = $('body'),
	$flag = true;

/**
* スクロール値を取得する
*/
var getScrollVal = (callback) => {
	$w.on('scroll load', function () {
		let $scrollVal = $w.scrollTop();
		// return $scrollVal;
		callback($scrollVal);
	});
}



/**
* sp button
*/
var $toggle = $('.navToggle');

$toggle.on('click', function () {
	$body.toggleClass('-is-navOpen');
});
$w.on('resize', function () {
	if ($flag) {
		$flag = false;
		setTimeout(function () {
			if (700 < $w.width()) {
				$body.removeClass('-is-navOpen');
			}
			$flag = true;
			return $flag;
		}, 500);
	}
});



/**
 * scroll effect
 */

let f = ($scrollVal) => {
	let $jsEffect = $('.js-effect'),
  $scrollBottom = $scrollVal + $w.height();

  if ($body.hasClass('mypolicy')) {
    var $delay = $( '.manifest' ).css( 'padding-top' ),
        $delay = $delay.replace( /px/, '' ),
        $delay = $delay * 0.5
  } else {
    $delay = 0;
  }

	/**
	* all fadein targets
	*/
	if ( $jsEffect ) {
		$.each($jsEffect, function () {
			let $target = $(this);

			if ($target.offset().top < $scrollBottom - 90 - $delay) {
				$target.addClass('-on');
			} 
		});
	}
}
getScrollVal(f);



/**
 * scroll signal
 */
let f2 = ($scrollVal) => {
	500 < $scrollVal ? $body.addClass('-is-scrolled') : $body.removeClass('-is-scrolled')
}

getScrollVal(f2);



/**
 * loading
 */
let $loadingAnim = $('.loadingAnim');

if ($loadingAnim.length ) {
	new Promise(( resolve ) => {
		window.addEventListener('load', () =>{
			document.body.classList.add('-is-ready');
		}, false)
		resolve( );
	}).then(( resolve ) => {
		document.querySelector('.loadingAnim__copy').addEventListener('transitionend', ( e ) => {
			e.stopPropagation();
			if (e.propertyName == 'opacity') {
				document.body.classList.add('-is-loaded');
			}
		}, false);
	}).then(( resolve ) => {
		document.getElementsByClassName('loadingAnim')[0].addEventListener('transitionend', (e) => {
			e.stopPropagation();
			if (e.propertyName == 'opacity'){
				setTimeout(() => {
					$loadingAnim.remove();
				}, 200); 
			}
			document.body.classList.add('-is-loadend');
		}, false);
	});
}



/**
 * smooth scroll
 */
$('a[href^="#"]').click(function ( e ) {
	e.stopPropagation();
	e.preventDefault();

	if ($body.hasClass('-is-navOpen')) $body.removeClass('-is-navOpen')

  // policyページのページ内スクロール量調節
  var offset = 0;
  if ( $body.hasClass('mypolicy') && 768 < $w.width() ){
    offset = 70
  } else if( $body.hasClass('mypolicy') && $w.width() <= 768 ){
    offset = 60
  }

  var hh = 100;
  if ( $w.width() <= 768) {
    hh = 60
  }

	var speed = 500,
      href = $(this).attr("href"),
      target = $(href == "#" || href == "" ? 'html' : href),
      position = target.offset().top - hh + offset;

	$("html, body").animate({ scrollTop: position }, speed, "swing");
	return false;
});


/**
 * slack chat
 */
window.Smallchat = {
  config: {
    "slackTeamId": "TDYTA9X7T",
    "scChannelId": "-LTXvSW6hnS_skmOtFRG",
    "slackChannelId": "GET3L6G4F",
    "uid": "-LTXv1XF1Gbbp_L8STYF",
    "planId": null,
    "accountCreated": 1544626645242
  },
  appearance: {
		"brand_color": "#0497fc",
    "contact_dismissible": false,
    "contact_enabled": true,
    "contact_field_label": "Email（もしくはお電話番号）",
    "contact_immediately": false,
    "contact_prompt": "お名前・ご連絡先を入力して下さい",
    "contact_reply": " {{name}}様 　ありがとうございます！ 折り返し、頂いたご連絡先( {{contact}})へ数日以内にお返事します。よろしくお願いします！",
		"custom_css": 768 < $w.width() ? ".Launcher-icon, .Launcher{background: linear-gradient(90deg,#fd8ebe,#f77cba);} #Smallchat .Layout{ margin: auto; top:0; right:0; bottom:0; left:0; box-shadow: 5px 5px 30px rgba(90,90,90,.1); } #Smallchat .Launcher-icon{ width:100px; min-width:100px; max-width:100px; min-height: 100px; max-height:100px; height:100px;}  #Smallchat .Launcher-icon .Icon{ width: 60px!important; height: 0!important; padding-top: 86px; display: block; overflow: hidden; font-style: normal; background: url(/assets/img/common-icon-chat.svg) center center no-repeat; background-size: cover;}" : ".Launcher-icon, .Launcher{background: linear-gradient(90deg,#fd8ebe,#f77cba);} #Smallchat .Layout, #Smallchat .Layout-right.Layout-mobile, #Smallchat .Layout-left.Layout-mobile{ margin: auto; top:0; right:0; bottom:0; left:0; box-shadow: 10px 10px 20px rgba(251,42,132,.1); } #Smallchat .Launcher-icon{ width:60px; min-width:60px; max-width:60px; min-height: 60px; max-height:60px; height:60px;} #Smallchat .Launcher-icon .Icon{ width: 35px!important; height: 0!important; padding-top: 44px; display: block; overflow: hidden; font-style: normal; background: url(/assets/img/_sp/common-icon-chat.svg) center center no-repeat; background-size: cover;}",
    "hide_logo": false,
    "hide_team_icon": true,
    "launcher_pos": "right",
    "launcher_prompt": "Send a message",
    "launcher_type": "icon",
    "messenger_blank": "土屋和樹の政策や政治活動について、ご質問・ご意見をどしどしお寄せ下さい！",
    "messenger_entry": "かしこまらずにどうぞ",
    "messenger_prompt": "土屋和樹にメッセージ",
    "name_field_label": "お名前",
    "offline_greeting": "ただいまオフラインです。ネットワーク環境の良い場所で再度ご入力ください！",
    "text_color": "#FFFFFF"
  }
};
window.addEventListener('load', function () {
	var styles = document.createElement('link');
	styles.rel = 'stylesheet';
	styles.href = 'https://static.small.chat/messenger.css';
	document.head.appendChild(styles);
	var script = document.createElement('script');
	script.async = true;
	script.src = 'https://static.small.chat/messenger.js';
	document.body.appendChild(script);
}, false);


/**
 * google analytics event tracking
 */
$('.button--readRegulation a').on('click', function (e) {
	e.stopPropagation();
	gtag('event', '規約を読むボタン', {
		'event_category': '共通｜フッター',
		'event_label': '友の会'
	});
	// ga('send', 'event', '共通｜フッター', '友の会', '規約を読むボタン', 1);
});
$('.button--inquire--pdf a').on('click', function (e) {
	e.stopPropagation();
	gtag('event', 'PDF申込用紙', {
		'event_category': '共通｜フッター',
		'event_label': '友の会'
	});
	// ga('send', 'event', '共通｜フッター', '友の会', 'PDF申込用紙', 1);
});
$('.button--inquire--mail a').on('click', function (e) {
	e.stopPropagation();
	gtag('event', 'メール申し込み', {
		'event_category': '共通｜フッター',
		'event_label': '友の会'
	});
	// ga('send', 'event', '共通｜フッター', '友の会', 'メール申し込み', 1);
});
$('.office__col__content a').on('click', function (e) {
	e.stopPropagation();
	gtag('event', 'メールアドレス', {
		'event_category': '共通｜フッター',
		'event_label': 'その他'
	});
	// ga('send', 'event', '共通｜フッター', 'その他', 'メールアドレス', 1);
});
$('.profile__footer a').on('click', function (e) {
	e.stopPropagation();
	gtag('event', 'note', {
		'event_category': '共通｜フッター',
		'event_label': 'その他'
	});
	// ga('send', 'event', '共通｜フッター', 'その他', 'note', 1);
});

//////// top page
$('.button--toIntro a').on('click', function (e) {
	e.stopPropagation();
	gtag('event', '土屋和樹とは？', {
		'event_category': 'TOPページ',
		'event_label': 'メインヴィジュアル'
	});
	// ga('send', 'event', 'TOPページ', 'メインヴィジュアル', '土屋和樹とは？', 1);
});
$('.button--toManifest a').on('click', function (e) {
	e.stopPropagation();
	gtag('event', '土屋和樹の政策', {
		'event_category': 'TOPページ',
		'event_label': 'メインヴィジュアル'
	});
	// ga('send', 'event', 'TOPページ', 'メインヴィジュアル', '土屋和樹の政策', 1);
});
$('.top .button--manifest--1 a').on('click', function (e) {
	e.stopPropagation();
	gtag('event', 'ひとり暮らしが〜', {
		'event_category': 'TOPページ',
		'event_label': '政策'
	});
});
$('.top .button--manifest--2 a').on('click', function (e) {
	e.stopPropagation();
		gtag('event', '子育て世帯が〜', {
			'event_category': 'TOPページ',
			'event_label': '政策'
		});
});
$('.top .button--manifest--3 a').on('click', function (e) {
	e.stopPropagation();
		gtag('event', '健康志向の方が〜', {
			'event_category': 'TOPページ',
			'event_label': '政策'
		});
});
$('.top .button--manifest--4 a').on('click', function (e) {
	e.stopPropagation();
		gtag('event', '起業思考の方が〜', {
			'event_category': 'TOPページ',
			'event_label': '政策'
		});
});
$('.top .button--manifest--5 a').on('click', function (e) {
	e.stopPropagation();
		gtag('event', 'それでもいいけど〜', {
			'event_category': 'TOPページ',
			'event_label': '政策'
		});
});

//////// 政策
$('.mypolicy .button--manifest--1 a').on('click', function (e) {
	e.stopPropagation();
	gtag('event', 'ひとり暮らしが〜', {
		'event_category': '政策ページ',
		'event_label': '政策'
	});
});
$('.mypolicy .button--manifest--2 a').on('click', function (e) {
	e.stopPropagation();
	gtag('event', '子育て世帯が〜', {
		'event_category': '政策ページ',
		'event_label': '政策'
	});
});
$('.mypolicy .button--manifest--3 a').on('click', function (e) {
	e.stopPropagation();
	gtag('event', '健康志向の方が〜', {
		'event_category': '政策ページ',
		'event_label': '政策'
	});
});
$('.mypolicy .button--manifest--4 a').on('click', function (e) {
	e.stopPropagation();
	gtag('event', '起業志向の方が〜', {
		'event_category': '政策ページ',
		'event_label': '政策'
	});
	ga('send', 'event', '政策ページ', '政策', '起業志向の方が~', 1);
});
$('.mypolicy .button--manifest--5 a').on('click', function (e) {
	e.stopPropagation();
	gtag('event', 'それでもいいけど〜', {
		'event_category': '政策ページ',
		'event_label': '政策'
	});
});





export { $ };
export { $w };
export { getScrollVal };
