(function ($) {

    "use strict";

    // caching selectors
    var mainWindow = $(window),
        mainHeader = $('header'),
        mainBody = $('body'),
        scrollUp = $('.scrollup');

    function stickyHeader() {
        var strickyScrollPos = mainHeader.next().offset().top;
        if (mainHeader.length) {
            if (mainWindow.scrollTop() > strickyScrollPos) {
                mainHeader.addClass('sticky');
                mainBody.addClass('sticky');
            } else if (mainWindow.scrollTop() <= strickyScrollPos) {
                mainHeader.removeClass('sticky');
                mainBody.removeClass('sticky');
            }
        };
    }
    mainWindow.on('load', function () {

        // Scroll to Top
        mainWindow.on('scroll', function () {
            stickyHeader();
            if ($(this).scrollTop() > 100) {
                scrollUp.fadeIn();
            } else {
                scrollUp.fadeOut();
            }
        });

        // Click event to scroll to top
        scrollUp.on("click", function () {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

    });

})(jQuery);