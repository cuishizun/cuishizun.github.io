$(document).ready(function () {
    // animation of the movement for each option
    $("#nav li a").hover(

    function () {
        $(this).stop().animate({
            paddingLeft: '22px'
        }, {
            queue: false,
            duration: 300
        });
    },

    // when mouse leave the hover state in link


    function () {
        $(this).animate({
            paddingLeft: '10px'
        }, {
            queue: false,
            duration: 300
        });
    });

    // animation of color transition
    // first you need set release state for the background for each element in the menu
    $(function () {
        $.fn.jFade.defaults = {
            trigger: "load",
            property: 'background',
            start: 'c0306a',
            end: 'e62975',
            steps: 5,
            duration: 10
        };
        //each class is defined with a couple of parameters that decide start and end color for each state. Furthermore, you can set the transition color when you enter or leave hover state. It´s up to you make faster or lower transition as you like just changing duration parameter
        $(".red").jFade({
            trigger: "mouseover",
            property: 'background',
            start: 'c0306a',
            //color in button normal state
            end: 'e62975',
            //final color in hover
            steps: 10,
            duration: 10
        }).jFade({
            trigger: "mouseout",
            property: 'background',
            start: 'e62975',
            //color you want for release effect in hover
            end: 'c0306a',
            //color you want after hover state
            steps: 10,
            duration: 10
        });

        $(".green").jFade({
            trigger: "mouseover",
            property: 'background',
            start: '8cc837',
            end: '9ae62f',
            steps: 10,
            duration: 10
        }).jFade({
            trigger: "mouseout",
            property: 'background',
            start: '9ae62f',
            end: '8cc837',
            steps: 10,
            duration: 15
        });
        $(".green-blue").jFade({
            trigger: "mouseover",
            property: 'background',
            start: '23c1a3',
            end: '00ffcf',
            steps: 10,
            duration: 10
        }).jFade({
            trigger: "mouseout",
            property: 'background',
            start: '00ffcf',
            end: '23c1a3',
            steps: 10,
            duration: 15
        });
        $(".purple").jFade({
            trigger: "mouseover",
            property: 'background',
            start: '8a30c2',
            end: '9c29e3',
            steps: 10,
            duration: 10
        }).jFade({
            trigger: "mouseout",
            property: 'background',
            start: '9c29e3',
            end: '8a30c2',
            steps: 10,
            duration: 15
        });
        $(".yellow").jFade({
            trigger: "mouseover",
            property: 'background',
            start: 'cfa72c',
            end: 'f9c117',
            steps: 10,
            duration: 10
        }).jFade({
            trigger: "mouseout",
            property: 'background',
            start: 'f9c117',
            end: 'cfa72c',
            steps: 10,
            duration: 15
        });

    });
});