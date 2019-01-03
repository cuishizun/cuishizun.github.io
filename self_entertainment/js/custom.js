(function ($) {
    "use strict";

    var mainWindow = $(window),
        mainPreloader = $('.preloader');

    mainWindow.on('load', function () {
        mainPreloader.delay(350).fadeOut('slow');
    });

})(jQuery);