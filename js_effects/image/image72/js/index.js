(function(){var $wrap=$(".wrapper");init();function init(){setTimeout(function(){$wrap.removeClass("init");},200)
bindEvent();}
function bindEvent(){$(".item").on("click",function(){$(this).addClass("active");$wrap.addClass("startShowItem");})
$(".close").on("click",function(e){e.stopPropagation();console.log(123)
$(".active").removeClass("active");$wrap.removeClass("startShowItem");})}})();