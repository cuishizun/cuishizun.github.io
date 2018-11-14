$(function(){
	
	var li=$('li'),
		arr=[
				['img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg'],
				['img/5.jpg','img/6.jpg','img/7.jpg','img/8.jpg'],
				['img/9.jpg','img/10.jpg','img/12.jpg','img/13.jpg'],
				['img/14.jpg','img/15.jpg','img/16.jpg','img/17.jpg'],
				['img/18.jpg','img/19.jpg','img/20.jpg','img/21.jpg'],
				['img/22.jpg','img/23.jpg','img/24.jpg','img/25.jpg']
			]
	
	for(var i=0;i<li.length;i++){
		li.eq(i).transform({
			rotate:5*i-5+'deg'
		})
	}


	
	var ind=-1;
	
	
	
	$('.right').on('click',function(){
		ind++;
		if(ind>=arr.length)ind=0;
		
		li.children('img').transform({'origin':['600px','500px']}).animate({'rotate':'90deg'},1000,function(){
			$(this).remove()
		});
		
		
		for(var i=0;i<4;i++){
			li.eq(i).append('<img src="'+arr[ind][i]+'" />')	
		}
		
		li.children('img').transform({
			'origin':['600px','500px'],'rotate':'-90deg'
		}).animate({'rotate':'0deg'},1000)
		
		
	})
	$('.left').on('click',function(){
		ind--;
		if(ind<0) ind=arr.length-1;
		
		li.children('img').transform({'origin':['600px','500px']}).animate({'rotate':'-90deg'},1000,function(){
			$(this).remove()
		});
		
		for(var i=0;i<4;i++){
			li.eq(i).append('<img src="'+arr[ind][i]+'" />')	
		}
		
		li.children('img').transform({
			'origin':['600px','500px'],'rotate':'90deg'
		}).animate({'rotate':'0deg'},1000)
		
	})
	
	
})