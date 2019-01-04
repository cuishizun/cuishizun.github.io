(function ($) {
    "use strict";

    var mainWindow = $(window),
        mainPreloader = $('.preloader');

    mainWindow.on('load', function () {
        mainPreloader.delay(1000).fadeOut('slow');
    });

})(jQuery);