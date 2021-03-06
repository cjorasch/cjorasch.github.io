$(window).load(function() {

    "use strict";

    /*---------------------------------------*/
    /*	WOW FOR ANIMATION ON SCROLL
	/*---------------------------------------*/
    var wow = new WOW({
        mobile: false
    });
    wow.init();


    /*---------------------------------------*/
    /*	NAVIGATION
	/*---------------------------------------*/
    $('.main-navigation').onePageNav({
        changeHash: true,
        currentClass: 'not-active', /* CHANGE THE VALUE TO 'current' TO HIGHLIGHT CURRENT SECTION LINK IN NAV*/
        //currentClass: 'current', /* CHANGE THE VALUE TO 'current' TO HIGHLIGHT CURRENT SECTION LINK IN NAV*/
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        filter: ':not(.external)'
    });

    /*---------------------------------------*/
    /*	STELLAR FOR BACKGROUND SCROLLING
	/*---------------------------------------*/

    $(window).stellar({
        horizontalScrolling: false,
        responsive: true
    });

});


$(window).resize(function() {

    "use strict";

    var ww = $(window).width();

    /* COLLAPSE NAVIGATION ON MOBILE AFTER CLICKING ON LINK */
    if (ww < 480) {
        $('.sticky-navigation a').on('click', function() {
            $(".navbar-toggle").click();
        });
    }
});

(function($) {

    "use strict";


    /*---------------------------------------*/
    /*	CONTACT FORM
	/*---------------------------------------*/

    $("#contact-form").submit(function(e) {
        e.preventDefault();
        var name = $("#cf-name").val();
        var email = $("#cf-email").val();
        var subject = $("#cf-subject").val();
        var message = $("#cf-message").val();
        var dataString = 'name=' + name + '&email=' + email + '&subject=' + subject + '&message=' + message;


        return false;
    });


    /*---------------------------------------*/
    /*	SMOOTH SCROLL FROM INTERNAL #HASH LINKS
	/*---------------------------------------*/

    $('a[href^="#"].inpage-scroll, .inpage-scroll a[href^="#"]').on('click', function(e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);
        $('.main-navigation a[href="' + target + '"]').addClass('active');
        $('.main-navigation a:not([href="' + target + '"])').removeClass('active');
        $('html, body').stop().animate({
            'scrollTop': ($target.offset()) ? $target.offset().top : 0
        }, 900, 'swing', function() {
            window.location.hash = target;
        });
    });


    /*---------------------------------------*/
    /*	NAVIGATION AND NAVIGATION VISIBLE ON SCROLL
	/*---------------------------------------*/

    mainNav();

    $(window).scroll(function() {
        mainNav();
    });

    function mainNav() {

        // Get the scroll location
        var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

        // Check if the user has scroll more than 40 pixels
        var navBar = $('.appear-on-scroll');
        if (top > 40) {
            // Show the navbar
            navBar.stop().animate({
                "opacity": '1',
                "top": '0'
            });
        } else {
            // Hide the havbar
            navBar.stop().animate({
                "top": '-70',
                "opacity": '0'
            });
        }

        //var signInButton = $('.appear-on-scroll .m2-signin');
        //if (top > 200) {
        //    signInButton.fadeOut(20);
        //} else {
        //    signInButton.fadeIn(200);
        //}

        var signUpButton = $('.appear-on-scroll .m2-signup');
        if (top > 300) {
            signUpButton.fadeIn(200);
        } else {
            signUpButton.fadeOut(200);
        }
    }


    /*---------------------------------------*/
    /*	SCREENSHOT CAROUSEL
	/*---------------------------------------*/

    $("#screenshots").owlCarousel({
        navigation: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });


    /*---------------------------------------*/
    /*	SCREENSHOT LIGHTBOX
	/*---------------------------------------*/

    $('#screenshots a').nivoLightbox({
        effect: 'fadeScale'
    });


    /*---------------------------------------*/
    /*	PLACEHOLDER FIX
	/*---------------------------------------*/
    //CREATE PLACEHOLDER FUNCTIONALITY IN IE
    $('[placeholder]').focus(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }).blur(function() {
        var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
        }
    }).blur();

    //ENSURE PLACEHOLDER TEXT IS NOT SUBMITTED AS POST
    $('[placeholder]').parents('form').submit(function() {
        $(this).find('[placeholder]').each(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        })
    });

    /*---------------------------------------*/
    /*	BOOTSTRAP FIXES
	/*---------------------------------------*/

    if ($.fn.modal) {
        var oldSSB = $.fn.modal.Constructor.prototype.setScrollbar;
        $.fn.modal.Constructor.prototype.setScrollbar = function () {
            oldSSB.apply(this);
            if (this.scrollbarWidth) $('.navbar-fixed-top').css('padding-right', this.scrollbarWidth);
        };

        var oldRSB = $.fn.modal.Constructor.prototype.resetScrollbar;
        $.fn.modal.Constructor.prototype.resetScrollbar = function () {
            oldRSB.apply(this);
            $('.navbar-fixed-top').css('padding-right', '');
        }
    }

    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement('style');
        msViewportStyle.appendChild(
            document.createTextNode(
                '@-ms-viewport{width:auto!important}'
            )
        );
        document.querySelector('head').appendChild(msViewportStyle)
    }



})(jQuery);

/*---------------------------------------*/
/*	TIMELINE SLIDER
	/*---------------------------------------*/
jQuery(window).load(function() {

    'use strict';
    
    var x = 0,
        init,
        container = $('.timeline-section'),
        /* TIMELINE SELECTOR */
        items = container.find('li'),
        containerHeight = 0,
        numberVisible = 4,
        /* NUMBER OF <li> TO SHOW IN SCROLLER */
        intervalSec = 4000; /* INTERVAL TIME */

    if (!container.find('li:first').hasClass("first")) {
        container.find('li:first').addClass("first");
    }

    items.each(function() {
        if (x < numberVisible) {
            containerHeight = containerHeight + $(this).outerHeight();
            x = x + 1;
        }
    });

    container.css({
        height: containerHeight,
        overflow: "hidden"
    });

    function vertCycle() {
        var firstItem = container.find('li.first').html();

        container.append('<li>' + firstItem + '</li>');
        container.find('li.first').animate({
            marginTop: "-105px",
            opacity: "0"
        }, 600, function() {
            $(this).remove();
            container.find('li:first').addClass("first");
        });
    }

    if (intervalSec < 700) {
        intervalSec = 700;
    }

    init = setInterval(function() {
        vertCycle();
    }, intervalSec);

    container.hover(function() {
        clearInterval(init);
    }, function() {
        init = setInterval(function() {
            vertCycle();
        }, intervalSec);
    });

});