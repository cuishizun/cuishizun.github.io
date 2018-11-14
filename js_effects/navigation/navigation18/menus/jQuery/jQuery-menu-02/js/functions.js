$(function () {
    $.fn.jFade.defaults = {
        trigger: "load",
        property: 'background',
        start: 'd30063',
        end: 'd30063',
        steps: 5,
        duration: 10
    };

    $(".fade").jFade({
        trigger: "mouseover",
        property: 'background',
        start: 'd30063',
        end: 'b4005b',
        steps: 10,
        duration: 10
    }).jFade({
        trigger: "mouseout",
        property: 'background',
        start: 'b4005b',
        end: 'd30063',
        steps: 10,
        duration: 15
    });

});