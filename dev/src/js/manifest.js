import $ from 'jquery';

$('.section--manifestlist__tsuchi').on( 'click', function( e ){
    e.stopPropagation();
    e.preventDefault();

    $( this ).toggleClass( '-vib' );
})
