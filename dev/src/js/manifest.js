import $ from 'jquery';
import { getScrollVal, $w } from './common.js';

$('.section--manifestlist__tsuchi').on( 'click', function( e ){
    e.stopPropagation();
    e.preventDefault();

    $( this ).toggleClass( '-vib' );
})
