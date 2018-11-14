//更换背景皮肤
$(function () {
    var skinid = $.cookie("skin")//获取cookie的参数
    if (skinid) {
        // $("#cssfile")文件名字
        //更换背景颜色  attr设置或返回被选元素的属性值。
        changeskin(skinid)
    }
    //1、更换背景颜色
    $("#skin li").click(function () {
        changeskin(this.id)
    })  
})

function changeskin(skinid) {
    $("#cssfile").attr("href", "styles/skin/" + skinid + ".css") //id=skin_0
    //更改选中的框，并移除其他框
    //$("#" + this.id).removeClass("selected");
    $("#" + skinid).addClass("selected").siblings().removeClass("selected");
    $.cookie("skin", skinid, { path: '/', expires: 10 })  //path地址
}