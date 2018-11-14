//首页广告展示效果
$(function () {

    //var len = ;
    var index = 0;
    var adTimer;
    //滑动到li中
    //$(".num li").mouseover(function () {

    //     showImg(index);
    // }).eq(0).mouseover();

    $(".num li").mouseover(function () {
        var index = $(".num li").index(this);
        //图片展示
        showImg(index);
    })
    //定义一个定时器
    $(".ad").hover(
        function () {
            clearInterval(adTimer);
        },
        function () {
            adTimer = setInterval(function () {
                //调用展示的方法
                showImg(index)
                index++;
                //当转到第五页的时候跳回第一页
                if (index == $(".num > li").length) { index = 0; }
            }, 1000)
        }
        ).trigger("mouseleave");

})

//显示不同的页面
function showImg(index) {
    var adHegint = $(".content_right .ad").height();//获取div的高度 0 -20px -40px
    //$(".slider").stop(true, false).animate({ top: -adHegint * index }, 1000);//所展示的动画
    $(".slider").animate({ "top": -adHegint * index }, 500)
    $(".num li").removeClass("on").eq(index).addClass("on");
}
