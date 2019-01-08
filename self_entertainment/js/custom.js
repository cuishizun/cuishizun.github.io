(function ($) {
    "use strict";

    /* 点击页面随机显示文字 */
    var txt = "<span class='txt'></span>";
    $('body').append(txt);
    var txted = $(".txt");
    txted.css({
        position: "absolute",
        color: "#008ed4",
        'z-index': 2
    });
    var Animated = function (x) {
        x.stop().animate({
            top: "-=80px",
            opacity: '1'
        }, 500, function () {
            $(this).animate({
                opacity: "0"
            }, 500);
        });
    };
    $(document).on("click", function (e) {
        var attr = ["自由", "民主", "富强", "希望", "和平", "积极", "向上", "进取", "努力"];
        var mathText = attr[Math.floor(Math.random() * attr.length)];
        //获取鼠标的位置
        var x = e.pageX - 32 + "px";
        var y = e.pageY - 18 + "px";
        txted.text(mathText);
        txted.css({
            "left": x,
            "top": y
        });
        Animated(txted);
    });

    /*loading*/
    var mainWindow = $(window),
        mainPreloader = $('.preloader');

    mainWindow.on('load', function () {
        mainPreloader.delay(1000).fadeOut('slow');
    });
})(jQuery);