// JavaScript Document
$(document).ready(function()
{
    $('div#contact div.wrapper.eroare').hover(function(){$(this).find('div.mesaj').fadeIn('fast');},function(){$(this).find('div.mesaj').hide();})
    $('div.info').hover(function(){$(this).find('div.tooltip').fadeIn('fast');},function(){$(this).find('div.tooltip').hide();})

    $('div#contact div.wrapper').focusin(function(){if(!$(this).hasClass('eroare'))$(this).addClass('focus');});
    $('div#contact div.wrapper').focusout( function() {$(this).removeClass('focus');});

    /* IE7 SELECTBOX Z-INDEX FIX */
    if($.browser.msie && $.browser.version == 7){
        $(function() {
            var zIndexNumber1 = 11000;
            var zIndexNumber2 = 12000;
            $('#contact .wrapper').each(function() {
                $(this).css('zIndex', zIndexNumber1);
                $(this).find('selectbox-wrapper').css('zIndex', 20000);
                zIndexNumber1 -= 10;
            });
            $('#contact .titlu-camp').each(function() {
                $(this).css('zIndex', zIndexNumber2);
                zIndexNumber2 -= 10;
            });
        });
    };

    /*TWITTER*/
    $('#copyright .twitter').hover(function() {
        $(this).find('.ico').toggleClass('activ');
        $('#tweet').fadeToggle(150);
    });

    /* FOOTER FIX */
    var hWindow = $(window).height();
    var hMain = $('#main').outerHeight(true);
    var hFooter = $('#continut').outerHeight(true);
    var hTotal = hFooter + (hWindow - hMain);

    if(hWindow>hMain) { $('#copyright').css('height',hTotal+30); }

    /*Abonare newsletter*/
    $('.abonare-newsletter').click(function ()
    {
        var eroare_newsletter = 0;
        var value_email = $('.newsletter .camp .inner input:eq(0)').val();
        if(value_email=='' || value_email==null || value_email=='Adresa de e-mail') { eroare_newsletter=1; $('.newsletter .camp').attr('class','camp eroare'); }
        else { $('.newsletter .camp').attr('class','camp'); }

        if(eroare_newsletter == 0)
        {
            $.ajax(
            {
                "dataType": 'json',
                "url"     : 'php/newsletter.php?email='+value_email, 
                "success" : function(data)
                {
                    if(data.email=='eroare') $('.newsletter .camp').attr('class','camp eroare');
                    else                     $('.newsletter .camp').attr('class','camp');

                    if(data.ok=='ok')
                    {
                        $('.newsletter .camp .inner input:eq(0)').val('Adresa de e-mail');
                        $('#copyright .continut .dr p:eq(0) strong').html(data.mesaj);
                    }
                }
            });
        }
    });

    /*MODAL*/
    $('.modal').click(function () {
        var modalNr = $(this).attr('href').replace('#','');
        var modalHeight = $('#'+modalNr).outerHeight();
        $('#'+modalNr).css({top:'20%', left:'50%', margin: '0 0 0 -'+($('#'+modalNr).width() / 2)+'px'}).fadeIn();
        $('#background-modal').fadeIn();
        return false;
    });
    $('#background-modal, .btn-inchide').click(function () {
        $('#background-modal, .window').fadeOut();
        return false;
    });

    /*BOX LAST*/
    $("#banda-3 .box-2:last-child").addClass("last");

    /*TWITTER*/
    $('#header ul .last').bind('mouseenter', function(){
        $(this).find('.wrapper').stop().show().css({opacity: 0, height: $('#header ul .last .tweet').height()+8}).animate({'opacity': 1}, 300);
    });
    $('#header ul .last').bind('mouseleave', {}, function(){
        $(this).find('.wrapper').stop().animate({'opacity': 0}, 200).fadeOut(0);
    });

    /*PREZENTARE HOMEPAGE*/
    if($('#prezentare').length) {

        $('#prezentare #container-1') 
        .cycle({
            fx:         'scrollUp',  
            speed:      300, 
            timeout:    0,
            pause:      0,
            before: onBeforeSt,
            after: onAfterSt,
            pager:   '#prezentare .ctrl',
            activePagerClass:   'activ',
            pagerAnchorBuilder: function(idx, slide) {
                return '#prezentare .ctrl li:eq(' + idx + ') a'; 
            }
        });

        $('#prezentare #container-2')
        .cycle({
            fx:         'scrollDown',  
            speed:      300, 
            timeout:    0,
            pause:      0,
            before: onBeforeDr,
            after: onAfterDr,
            pager:   '#prezentare .ctrl',
            activePagerClass:   'activ',
            pagerAnchorBuilder: function(idx, slide) {
                return '#prezentare .ctrl li:eq(' + idx + ') a'; 
            }
        });
    }

    /* SLIDER HOMEPAGE */
    if($('#slider').length) {
        $('#slider .carousel')
        .before('<ul class="ctrl">')
        .cycle({
            fx:      'fade', 
            speed:   1000, 
            timeout: 7000,
            pause:   1,
            pager:   '#slider .ctrl',
            activePagerClass:   'activ',
            pagerAnchorBuilder: function(idx, slide) {
                return '<li><a href="#"></a></li>';
            }
        });
    }

    /* SLIDER FACEBOOK */
    if($('#slider-facebook').length) {
        $('#slider-facebook .carousel')
        .before('<ul class="ctrl">')
        .cycle({
            fx:      'fade', 
            speed:   1000, 
            timeout: 7000,
            pause:   1,
            pager:   '#slider-facebook .ctrl',
            activePagerClass:   'activ',
            pagerAnchorBuilder: function(idx, slide) {
                return '<li><a href="#"></a></li>';
            }
        });
        
        if($('#slider-facebook .carousel .element').length>1) {
            $('#slider-facebook .ctrl').css({'width':$('#slider-facebook .ctrl').width(), 'margin-left':-($('#slider-facebook .ctrl').width()/2)});
        } else {
            $('#slider-facebook .ctrl').css({'display':'none'});
        }
    }

    /* SCROLL TOP */
    $('.go-top, #content #banda-3 #meniu-fix ul li a').click(function(event){
        event.preventDefault();
        var full_url = this.href;
        var parts = full_url.split('#');
        var trgt = parts[1];
        var target_offset = $('#'+trgt).offset();
        var target_top = target_offset.top;
        $('html, body').animate({scrollTop:target_top-26}, 700);
    });

    /* MENIU FIX */
    $('#meniu-fix, #meniu-fix .wrap').height($('#specificatii').outerHeight());
    $('#meniu-fix ul li a').click(function(event){
        $('#meniu-fix ul li a').removeClass('activ');
        $(this).addClass('activ');
    });

    if($('#meniu-fix').length) {
        $(window).scroll(function() {
            if ($(window).scrollTop() >= 350) {
                $('#meniu-fix ul').scrollToFixed();
            }
        });
    }

});

    /* FUNCTII PREZENTARE */
    function onBeforeSt(curr, next) {
        $(next).find('h2, p, .btn-1').css({'bottom': -370});
    };

    function onAfterSt(curr, next) {
        setTimeout(function(){$(next).find('h2').animate({'bottom': 0},400,'easeOutCirc')},100);
        setTimeout(function(){$(next).find('p').animate({'bottom': 0},400,'easeOutCirc')},300);
        setTimeout(function(){$(next).find('.btn-1').animate({'bottom': 0},400,'easeOutCirc')},600);
    };

    function onBeforeDr(curr, next) {
        $(next).find('.slide').css({'bottom': -370});
    };

    function onAfterDr(curr, next) {
        setTimeout(function(){$(next).find('.elem-1').animate({'bottom': 0},400,'easeOutCirc')},0);
        setTimeout(function(){$(next).find('.elem-2').animate({'bottom': 0},400,'easeOutCirc')},300);
        setTimeout(function(){$(next).find('.elem-3').animate({'bottom': 0},400,'easeOutCirc')},600);
    }; 