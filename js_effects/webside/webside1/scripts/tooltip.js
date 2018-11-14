//超链接文本提示窗
//储存 定义一个div 
$(function () {
    var x = 10;
    var y = 20;
    $("a.tooltip").mouseover(function (e) {
        this.myTitle = this.title;
        this.title = "";
        var tooltip = "<div id='tooltip'>" + this.myTitle + "</div>"   //没加this
        $("body").append(tooltip);//将创建的元素追加到文档中。
        $("#tooltip").css({
            "top": (e.pageY + y) + "px",
            "left": (e.pageX + x) + "px"
        }).show("fast");//设置x坐标和y坐标，并且显示
    }).mouseout(function () {
        this.title = this.myTitle;
        $("#tooltip").remove(); //移除
    })
})