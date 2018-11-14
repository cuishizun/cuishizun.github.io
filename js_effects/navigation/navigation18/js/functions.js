$(document).ready(function () {

    $('#extra').hide();

    $('a#btn-plus').mouseenter(function () {
        $('#extra').fadeIn('fast');
    });

    $('a#btn-plus').mouseleave(function () {
        $('#extra').fadeOut('fast');
    })

});