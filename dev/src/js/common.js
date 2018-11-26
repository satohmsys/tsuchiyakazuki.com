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
	500 < $scrollVal ? $body.addClass('-isScrolled') : $body.removeClass('-isScrolled')
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
		})
		resolve( );
	}).then(( resolve ) => {
		document.querySelector('.loadingAnim .mask__element').addEventListener('transitionend', ( e ) => {
			e.stopPropagation();
			document.body.classList.add('-is-loaded');
		});
	}).then(( resolve ) => {
		document.getElementsByClassName('loadingAnim')[0].addEventListener('transitionend', (e) => {
			e.stopPropagation();
			if (e.propertyName == 'transform'){
				setTimeout(() => {
					$loadingAnim.remove();
				}, 1500); 
			}
			document.body.classList.add('-is-loadend');
		});
	});

	// if ($loadingAnim.length) {
	// 	$w.on('load', function () {
	// 		$('body').addClass('-is-ready');

	// 		$('.loadingAnim .mask__element').on('transitionend', function (e) {
	// 			e.stopPropagation();
	// 			e.preventDefault();

	// 			$('body').addClass('-is-loaded');

	// 			$('.loadingAnim').on('transitionend', function (e) {
	// 				e.stopPropagation();
	// 				$('body').addClass('-is-loadend');
	// 				// $loadingAnim.remove();
	// 			});
	// 		});
	// 	});
	// }

}

/**
 * smooth scroll
 */
if ($w.width() < 1024) {
	$('a[href^="#"]').click(function ( e ) {
		e.stopPropagation();
		e.preventDefault();

		var speed = 500,
			href = $(this).attr("href"),
			target = $(href == "#" || href == "" ? 'html' : href),
			position = target.offset().top;

		$("html, body").animate({ scrollTop: position }, speed, "swing");
		return false;
	});
}


export { $ };
export { $w };
export { getScrollVal };
