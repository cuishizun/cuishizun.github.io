$(document).ready(function () {

    $("ul.side-nav li").hover(function () {
        $(this).find("div").stop().animate({
            left: "118",
            opacity: 1
        }, "fast").css("visibility", "visible").css("overflow", "visible")

    }, function () {
        $(this).find("div").stop().animate({
            left: "0",
            opacity: 0
        }, "meddium").css("display", "inline").css("overflow", "hidden")
    });

});