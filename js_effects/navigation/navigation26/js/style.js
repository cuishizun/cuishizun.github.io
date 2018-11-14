$(function() {

	$(".header-cell .header-cell-li .header-cell-li-tittle").mouseenter(function() {
		$(this).children(".ink").addClass("animate");
		$(this).parent().siblings().children().children(".ink").removeClass("animate");
	})
	$(".header-cell").mouseleave(function() {
		$('.header-cell-li-tittle').children().removeClass("animate");
	})
	$('.nav ul li').on('click', function() {
		$(this).addClass('nav_active');
		$(this).siblings().removeClass('nav_active');
	}).on('mouseenter', function() {
		$(this).children().children('span').addClass('nav_animate');
		$(this).siblings().children().children('span').removeClass('nav_animate');

	})
	$('.nav').on('mouseleave', function() {
		$('.nav_table_cell_link').children('span').removeClass('nav_animate');
	})

	$('.shake').on('mouseenter', function() {

		$(this).addClass('nav_shake_animate');
		$(this).parents().parents().siblings().children().children('span').removeClass('nav_shake_animate');

	})
	$('.nav_shake').on('mouseleave', function() {
		$('.shake').removeClass('nav_shake_animate');
	})
})