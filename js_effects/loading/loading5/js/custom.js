(function ($) {

    "use strict";

    // caching selectors
    var mainWindow = $(window),
        mainBody = $('body'),
        mainStatus = $('#status'),
        mainPreloader = $('#preloader');

    mainWindow.on('load', function () {

        // Preloader
        mainStatus.fadeOut();
        mainPreloader.delay(350).fadeOut('slow');
        mainBody.delay(350).css({
            'overflow': 'visible'
        });


    });

})(jQuery);