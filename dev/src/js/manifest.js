import $ from 'jquery';
import {$w} from './common.js';


/**
 * 読み込み時スクロール量
 */
$(window).on( 'load', function(){
  var url = $(location).attr('href');

  // policyページのスクロール量調節
  var offset = 0,
      hh = 100;
  if ( $w.width() <= 640 ) {
    offset = 100
    hh = 60;
  }

  if (url.indexOf("#") != -1) {
    var id = url.split("#"),
        target = $('.' + id[id.length - 1]),
        position = target.offset().top - hh - offset;

      $("html, body").animate({
        scrollTop: position
      }, 500);
  }
});



$('.section--manifestlist__tsuchi').on( 'click', function( e ){
    e.stopPropagation();
    e.preventDefault();

    $( this ).toggleClass( '-vib' );
})
