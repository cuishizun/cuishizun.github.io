(function($) {

    "use strict";

    // caching selectors
    var mainWindow = $(window),
        mainHeader = $('header'),
        mainBody = $('body'),
        mainStatus = $('#status'),
        mainPreloader = $('#preloader'),
        miuContainer = $('#mix-container'),
        teamCarousel = $('.team-carousel'),
        newsCarousel = $('.news-carousel'),
        testimonialCarousel = $('.testimonial-carousel'),
        testimonialCarousel2 = $('.testimonial-carousel-2'),
        partnerCarousel = $('.partner-carousel'),
        galleryCarousel = $('.gallery-carousel'),
        menuzordMenu = jQuery("#menuzord"),
        galleryPhoto = $('.gallery-photo'),
        scrollUp = $('.scrollup'),
        mainBxSlider = $('.bxslider'),
        mainCounter = $('.counter');


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

    mainWindow.on('load', function() {

        // Preloader
        mainStatus.fadeOut();
        mainPreloader.delay(350).fadeOut('slow');
        mainBody.delay(350).css({
            'overflow': 'visible'
        });

        // Mix It Up
        miuContainer.mixItUp();

        // Carousel - Team
        teamCarousel.owlCarousel({
            loop: true,
            autoplay: true,
            margin: 15,
            dots: false,
            animateIn: true,
            responsiveClass: true,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                600: {
                    items: 3,
                    nav: true
                },
                1000: {
                    items: 4,
                    nav: true,
                    loop: true
                }
            }
        });

        // Carousel - News
        newsCarousel.owlCarousel({
            loop: true,
            autoplay: true,
            margin: 15,
            dots: false,
            animateIn: true,
            responsiveClass: true,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                600: {
                    items: 3,
                    nav: true
                },
                1000: {
                    items: 3,
                    nav: true,
                    loop: true
                }
            }
        });

        // Carousel - Testimonial (Version 1)
        testimonialCarousel.owlCarousel({
            loop: true,
            autoplay: true,
            margin: 15,
            dots: false,
            animateIn: true,
            responsiveClass: true,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                600: {
                    items: 1,
                    nav: true
                },
                1000: {
                    items: 1,
                    nav: true,
                    loop: true
                }
            }
        });

        // Carousel - Testimonial (Version 2)
        testimonialCarousel2.owlCarousel({
            loop: true,
            autoplay: true,
            margin: 15,
            dots: true,
            animateIn: true,
            responsiveClass: true,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                600: {
                    items: 2,
                    nav: false
                },
                1000: {
                    items: 3,
                    nav: false,
                    loop: true
                }
            }
        });

        // Carousel - Partner
        partnerCarousel.owlCarousel({
            loop: true,
            autoplay: true,
            margin: 15,
            dots: false,
            animateIn: true,
            responsiveClass: true,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                600: {
                    items: 3,
                    nav: false
                },
                1000: {
                    items: 5,
                    nav: false,
                    loop: true
                }
            }
        });

        // Carousel - Gallery
        galleryCarousel.owlCarousel({
            loop: true,
            autoplay: true,
            margin: 15,
            dots: false,
            animateIn: true,
            responsiveClass: true,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                600: {
                    items: 1,
                    nav: true
                },
                1000: {
                    items: 1,
                    nav: true,
                    loop: true
                }
            }
        });

        // Menuzord Menu 
        menuzordMenu.menuzord({
            'showSpeed': 100,
            'effect': 'slide',
            'indicatorFirstLevel': "<i class='fa fa-angle-down'></i>",
            'indicatorSecondLevel': "<i class='fa fa-angle-right'></i>"
        });

        // Magnific Popup
        galleryPhoto.magnificPopup({
            type: 'image'
        });

        // Slider - bxslider
        mainBxSlider.bxSlider({
            auto: true,
            pager: false,
            speed: 500,
            pause: 6000,
            easing: 'ease-in-out'
        });

        // Scroll to Top
        mainWindow.on('scroll', function() {
            stickyHeader();
            if ($(this).scrollTop() > 100) {
                scrollUp.fadeIn();
            } else {
                scrollUp.fadeOut();
            }
        });

        // Click event to scroll to top
        scrollUp.on("click", function() {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        // Counter
        mainCounter.counterUp({
            delay: 10,
            time: 1000
        });

    });

})(jQuery);