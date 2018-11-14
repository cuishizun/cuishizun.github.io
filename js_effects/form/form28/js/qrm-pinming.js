$(function () {
    //控制边框高亮
    $(".qrm-input-border").click(function () {
        if($(".qrm-pinming").css("background-image").indexOf("qrm-arrow-down")!==-1){
            $(".qrm-pinming").css("background-image","url(images/qrm-arrow-top.png)");
            $(".qrm-pinming").css("border","1px solid #ee7700");
            $(".qrm-pinming").css("border-bottom","none");
            $(".qrm-pinming-panel").show();
        }else {
            $(".qrm-pinming-panel").hide();
            $(".qrm-pinming").css("border","1px solid #ddd");
            $(".qrm-pinming").css("background-image","url(images/qrm-arrow-down.png)");
        }
    });
    //第一层
    var lev1;
    var lev2;
    var lev3;
    var lev4;
    //第一层 事件代理
    $("body").on("click",".qrm-lev-1>li",function () {
        //控制背景颜色高亮
        $(this).addClass("active").siblings("li").removeClass("active");
        // 先将input中的值置空
        lev1="";
        lev2="";
        lev3="";
        lev4="";
        // 获取当前点击的li的子元素的HTML节点 将获取的节点放到页面显示的第二级中
        var html1=$(this).children(".li-zi-1").html();
        $(".qrm-lev-2").html(html1);
        $(".qrm-lev-3").html("");
        $(".qrm-lev-4").html("");
        //获取当前点击的li的span中的值 将值传到input中
        lev1=$(this).children("span").html();
        $(".qrm-input").val("");
        $(".qrm-input").val(lev1);
    });
    //第二层 事件代理
    $("body").on("click",".qrm-lev-2>li",function () {
        $(this).addClass("active").siblings("li").removeClass("active");
        var html2=$(this).children(".li-zi-2").html();
        lev2=$(this).children("span").html();
        $(".qrm-lev-3").html(html2);
        $(".qrm-lev-4").html("");
        $(".qrm-input").val(lev1+"/"+lev2);
    });
    //第三层 事件代理
    $("body").on("click",".qrm-lev-3>li",function () {
        $(this).addClass("active").siblings("li").removeClass("active");
        var html3=$(this).children(".li-zi-3").html();
        lev3=$(this).children("span").html();
        $(".qrm-lev-4").html(html3);
        $(".qrm-input").val(lev1+"/"+lev2+"/"+lev3);
    });
    //第三层 事件代理
    $("body").on("click",".qrm-lev-4>li",function () {
        $(this).addClass("active").siblings("li").removeClass("active");
        lev4=$(this).children("span").html();
        $(".qrm-pinming-panel").hide();
        $(".qrm-pinming").css("border","1px solid #ddd");
        $(".qrm-pinming").css("background-image","url(images/qrm-arrow-down.png)");
        $(".qrm-input").val(lev1+"/"+lev2+"/"+lev3+"/"+lev4);
    });

//给四个区域绑定点击事件 判断当前的下一个区域 如果为空 点击当前区域 qrm-pinming-panel 隐藏 并且把input高亮去掉
    $("body").on("click",".qrm-lev>li",function () {
        if($(this).parent().parent().next().children(".qrm-lev").html()==""){
            // 去掉输入框的高亮状态
            $(".qrm-pinming-panel").hide();
            $(".qrm-pinming").css("border","1px solid #ddd");
            $(".qrm-pinming").css("background-image","url(images/qrm-arrow-down.png)");
        }

    })
});