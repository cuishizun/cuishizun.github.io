(function ($) {

    "use strict";

    // caching selectors
    var mainWindow = $(window),
        miuContainer = $('#mix-container');

    mainWindow.on('load', function () {

        // Mix It Up
        miuContainer.mixItUp();
    });

})(jQuery);