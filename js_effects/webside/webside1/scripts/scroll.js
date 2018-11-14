//新闻滚动
$(function () {
    var srcaddtime;
    $(".scrollNews")
        .hover(
         function () { clearInterval(srcaddtime) }
         ,
         function () {
             srcaddtime = setInterval(function () {
                 scrollscr($(".scrollNews"));
             }, 1000)
         })
        .trigger("mouseleave")

})
function scrollscr(obj) {
    $self = obj.find("ul:first");
    var lineHeight = $self.find("li:first").height(); //查找第一个的高度
    $self.animate({
        "marginTop": -lineHeight + "px"
    }, 600, function () {
        $self.css({ marginTop: 0 }).find("li:first").appendTo($self);
    })

}
