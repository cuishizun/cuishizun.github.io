// JavaScript Document
(function(a) {
    a.fn.extend({
        demo:function() {
            var b = a(this);
            var p = b.width();
            var o = b.height();
            var l = b.css("position");
            var i = a(window).width();
            var f = a(window).height();
            var g = "normal";
            var c = 500;
            var k = 400;
            var d = b.css("left");
            var n = b.css("top");
            var e = (i - c) / 2;
            var h = (f - k - 20) / 2;
            var j = a("<div>", {
                id:"zhezhao"
            });
            var m = a("<a>", {
                id:"close",
                href:"javascript:void(0)",
                text:"关闭"
            });
            m.bind("click", function() {
                j.animate({
                    width:c,
                    height:k,
                    left:e,
                    top:h
                }, function() {
                    j.remove();
                    m.detach();
                    b.animate({
                        width:p,
                        height:o,
                        left:d,
                        top:n
                    }, g, function() {
                        b.on("click", function() {
                            b.animate({
                                width:c,
                                height:k,
                                left:e,
                                top:h
                            }, g, function() {
                                m.appendTo(b);
                                b.off("click");
                                j.appendTo("body").css({
                                    width:c,
                                    height:k,
                                    left:e,
                                    top:h
                                }).animate({
                                    width:"100%",
                                    height:"100%",
                                    left:0,
                                    top:0
                                }, g);
                            });
                        });
                    });
                });
            });
            b.on("click", function() {
                b.animate({
                    width:c,
                    height:k,
                    left:e,
                    top:h
                }, g, function() {
                    m.appendTo(b);
                    b.off("click");
                    j.appendTo("body").css({
                        width:c,
                        height:k,
                        left:e,
                        top:h
                    }).animate({
                        width:"100%",
                        height:"100%",
                        left:0,
                        top:0
                    }, g);
                });
            });
        }
    });
})(jQuery);