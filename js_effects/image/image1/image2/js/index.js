$(function(){
    $('.t_show').hide();
    $('.t_images').hide();
    new GridScrollFx( document.getElementById( 'grid' ), {
        viewportFactor : 0.4
    } );
    $('#grid li').click(function(){
        $('.t_show').show();
        $('.t_images').show();
        var _this = $(this).children().children('img').attr('src');
        $('.t_img').css({'background': 'url('+ _this +') no-repeat','background-size':'100% 100%'})
    });
    $('.t_show').click(function(){
        $('.t_show').hide();
        $('.t_images').hide();
    });
});