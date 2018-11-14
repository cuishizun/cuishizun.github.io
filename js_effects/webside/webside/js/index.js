$(function() {
  document.execCommand("BackgroundImageCache", false, true);
  $('#slides').slidesjs({width: 940,
      height: 368});//{width: $(window).width(),height: $(window).height()}
  var imgobj={
    img1:[0,["g.png","rt.png","l.png"]],
    img2:[0,["rt.png","l.png","g.png"]],
    img3:[0,["l.png","g.png","rt.png"]]
  }
  $("*[id^=showpic]").click(function()
  { 
      showpic($(this).attr("id"));
  });
  function showpic(id) {
    var num=id.charAt(id.length-1);
    $("#"+id).siblings("div").toggleClass("lightgray");
    var curobj=imgobj["img"+num];
    var obj=$("#"+id).siblings("img")[0];
    if (curobj[0]==curobj[1].length-1) 
    {
        curobj[0]=0;
    }
    else
    {
        curobj[0]+=1;
    }
    obj.src="images/"+curobj[1][curobj[0]];
  }
});