(function($) {

    "use strict";

    // caching selectors
    var mainWindow = $(window),        
        mainCounter = $('.counter');

    mainWindow.on('load', function() {

        // Counter
        mainCounter.counterUp({
            delay: 10,
            time: 1000
        });

    });

})(jQuery);