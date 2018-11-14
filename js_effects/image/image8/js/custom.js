(function ($) {

    "use strict";

    // caching selectors
    var mainWindow = $(window),
        mainBxSlider = $('.bxslider');
    mainWindow.on('load', function () {
        // Slider - bxslider
        mainBxSlider.bxSlider({
            auto: true,
            pager: false,
            speed: 500,
            pause: 6000,
            easing: 'ease-in-out'
        });
    });

})(jQuery);