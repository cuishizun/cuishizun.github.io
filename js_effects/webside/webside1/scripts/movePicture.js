//图片移动
$(function () {
    var count = $(".prolist_content ul li").length;//获取有多少图片
    var pagecount = Math.ceil(count / 4); //获取总页数 count/4 取整
    var width = $(".prolist").width() //获取div的宽度
    var page = 1;//定义一个默认的页数
    // var $prolist = $(".prolist").width();//打开图片所在的位置

    //点想右的时候 动画向右   每次点击页面都+1 当达到最后一行的  当前的页数变成第一页 
 

    $(".goRight").click(function () {
        if (page == pagecount) {
            $(".prolist_content").animate({ left: 0 }, 800)
            page = 1;
        }
        else {
            $(".prolist_content").animate({ left: '-=' + width }, 800)
            page++;
        }

    })

    $(".goLeft").click(function () {
        if (page == 1) {
            $(".prolist_content").animate({ left: -width * (pagecount - 1) }, 800)
            page = pagecount;

        } else {
            $(".prolist_content").animate({
                left: '+=' + width
            }, 800)
            page--;
        }
    })


})