import $ from 'jquery';
import { getScrollVal, $w } from './common.js';

let $body = $('body');
if( $body.hasClass( 'top' ) ){
	$w.on( 'load', function(){
		let f = ( scrollVal ) => {
			if( $('#manifest').offset().top <  scrollVal ){
				$body.addClass('-is-chatShow')
			} 
			// else {
			// 	$body.removeClass('-is-chatShow');
			// }
		}
		getScrollVal( f );
	})
}
