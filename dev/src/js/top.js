import $ from 'jquery';
import { getScrollVal, $w } from './common.js';


$( function(){
	


	/**
	 * current Section 
	 */
	$w.on('load', function (e) {
		let $hash = location.hash;
		if ($hash.length) {
			$($hash).addClass('current');
		} else {
			$('.section').eq(0).addClass('current');
		}
	});

});

