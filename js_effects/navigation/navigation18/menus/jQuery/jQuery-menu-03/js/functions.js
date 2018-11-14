$(document).ready(function () {
    $(".big-menu-launcher").click(function () {
        $("#big-menu-hidden").toggle("fast");
        $("#big-menu-hidden-stores").hide();
    });

    $(".big-menu-launcher-stores").click(function () {
        $("#big-menu-hidden-stores").toggle("fast");
        $("#big-menu-hidden").hide();
    });

});
//The code is very easy. When user click (you can change it to .hover) a button with a "big-menu-launcher" class the div with id=big-menu-hidden is show and if the user clik other time or in close button the box is hidden