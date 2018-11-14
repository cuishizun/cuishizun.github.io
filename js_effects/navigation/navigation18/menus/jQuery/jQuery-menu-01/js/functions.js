//basically what this function do is to hide in start span.hidden and when the user is placed on one of the options appears with a fade effect
$(document).ready(function () {
    $('#nav li span.hidden').hide();
    $('#nav li').hover(function () {
        $(this).find('span').fadeIn('fast');
    }, function () {
        $(this).find('span').fadeOut('fast');
    });
});