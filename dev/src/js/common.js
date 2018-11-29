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

	/**
	* all fadein targets
	*/
	if ( $jsEffect ) {
		$.each($jsEffect, function () {
			let $target = $(this);

			if ($target.offset().top < $scrollBottom - 90) {
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
			console.log( e ); 
			if (e.propertyName == 'opacity'){
				setTimeout(() => {
					$loadingAnim.remove();
				}, 1500); 
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

	var speed = 500,
		hh = $( '.siteHeader' ).height(),
		href = $(this).attr("href"),
		target = $(href == "#" || href == "" ? 'html' : href),
		position = target.offset().top - hh;

	$("html, body").animate({ scrollTop: position }, speed, "swing");
	return false;
});


/**
 * chat icon
 */
$( '#Smallchat' ).on( 'click', function( e ){
	e.stopPropagation();
	e.preventDefault();

	// if(! $body.hasClass('-is-chatOpen') ) $('#Smallchat').click();

	$body.toggleClass( '-is-chatOpen' );
})


export { $ };
export { $w };
export { getScrollVal };


window.Smallchat = {
	config: {
		"slackTeamId": "T86BXQS5U",
		"scChannelId": "-LSU7lC8Lbw0zFQJFRTl",
		"slackChannelId": "GEEDRKKU1",
		"uid": "-LSU7g0YWZgPHWtCnfOr",
		"planId": null,
		"accountCreated": 1543489372301
	},
	appearance: {
		"brand_color": "#0497fc",
		"contact_dismissible": false,
		"contact_enabled": true,
		"contact_field_label": "質問についてのご連絡先",
		"contact_immediately": false,
		"contact_prompt": "Add your name and email to make sure you see our reply:",
		"contact_reply": "{{name}}様 \n\nこの度はメッセージをいただき、ありがとうございました。お返事は、いただいたご連絡先（{{contact}}）に、数日以内に折り返しご連絡させていただきます。",
		"custom_css": 768 < $w.width() ? ".Launcher-icon, .Launcher{background: linear-gradient(90deg,#fd8ebe,#f77cba);} #Smallchat .Layout{ margin: auto; top:0; right:0; bottom:0; left:0; box-shadow: 10px 10px 20px rgba(251,42,132,.1); } #Smallchat .Launcher-icon{ width:100px; min-width:100px; max-width:100px; min-height: 100px; max-height:100px; height:100px;}  #Smallchat .Launcher-icon .Icon{ width: 60px!important; height: 0!important; padding-top: 86px; display: block; overflow: hidden; font-style: normal; background: url(/assets/img/common-icon-chat.svg) center center no-repeat; background-size: cover;}" : ".Launcher-icon, .Launcher{background: linear-gradient(90deg,#fd8ebe,#f77cba);} #Smallchat .Layout, #Smallchat .Layout-right.Layout-mobile, #Smallchat .Layout-left.Layout-mobile{ margin: auto; top:0; right:0; bottom:0; left:0; box-shadow: 10px 10px 20px rgba(251,42,132,.1); } #Smallchat .Launcher-icon{ width:60px; min-width:60px; max-width:60px; min-height: 60px; max-height:60px; height:60px;} #Smallchat .Launcher-icon .Icon{ width: 35px!important; height: 0!important; padding-top: 44px; display: block; overflow: hidden; font-style: normal; background: url(/assets/img/_sp/common-icon-chat.svg) center center no-repeat; background-size: cover;}",
		"hide_logo": false,
		"hide_team_icon": true,
		"launcher_pos":  "right",
		"launcher_prompt": "土屋和樹に質問",
		"launcher_type": "icon",
		"messenger_blank": "（No messages prompt）の箇所\n土屋和樹の政策や活動について、お気軽にご意見・ご質問ください！",
		"messenger_entry": "こちらにご入力ください。",
		"messenger_prompt": "土屋和樹に質問（テスト",
		"name_field_label": "お名前",
		"offline_greeting": "オフラインです。ネットワーク環境のいいところで再度ご入力ください。",
		"text_color": "#ffffff"
	},
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