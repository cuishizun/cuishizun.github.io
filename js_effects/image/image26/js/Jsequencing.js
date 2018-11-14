/*
 *图片排序及查看
 *j -- 2017-12-20
*/
function Jsequencing(options){
	var defaults={
		listid:"img_ul",//页面图片列表ID
		thumbherf:"",//列表图片前缀
		bigherf:options.thumbherf,//原图前缀
		imgsrcarr:[],//图片数据数组
		jsondata:false,//是否json格式数据
		viewimg:true,//预览/查看图片
		view_toggle:true,//预览切换
		view_zoom:true,//预览缩放
		view_rotate:true,//预览旋转
		showtitle:true,
	};
	var opts = $.extend(defaults,options);
	if((typeof opts.imgsrcarr[0]=='string')&&opts.imgsrcarr[0].constructor==String){
		opts.jsondata=false;
	}else if((typeof opts.imgsrcarr[0]=='object')&&opts.imgsrcarr[0].constructor==Object){
		opts.jsondata=true;
	}else if(opts.imgsrcarr[0]!==undefined){
		alert("数据格式不正确")
	}
	if(!opts.jsondata) opts.showtitle=false;
	//-//-//-//-//
	var box=this.box = $("#"+opts.listid);
	box.append( "<div class='itemlist' style='height:100%'></div>"+
							"<div class='ident'></div>"+
							"<div class='morexy'></div>"
	);
	var itemlist = box.find(".itemlist");
	//item内容
	this.itemhtml=function(imgsrc,imgtitle){
		var titlebox = opts.showtitle ? '<div class="textbox">'+imgtitle+'</div>' : "";
		return '<input class="checkbox" name="" type="checkbox" value="">'+
					 '<div class="picbox">'+
						'<a class="viewimg" href="'+opts.bigherf+imgsrc+'" title="'+imgtitle+'">'+
							'<img src="'+opts.thumbherf+imgsrc+'" ondragstart="return false;" />'+
						'</a>'+
					 '</div>'+titlebox
	};
	//页面dom绘制
	var html='';
	for(var j=0;j<opts.imgsrcarr.length;j++){
		var vimgsrc=opts.showtitle ? opts.imgsrcarr[j].src : opts.imgsrcarr[j];
		var vimgtitle=opts.showtitle ? opts.imgsrcarr[j].title : "";
		var titlebox = opts.showtitle ? '<div class="textbox">'+vimgtitle+'</div>' : "";
		html+='<div class="item" id="'+opts.listid+'_item'+j+'" item="'+j+'">'+this.itemhtml(vimgsrc,vimgtitle)+'</div>';
	}
	itemlist.html(html);
	var box_w = box.width();//取总宽度
	//页面初始化配置
	var item_w,item_h,col_len,few_len,imgnum,box_h;
	this.info=function(fun){
		if(item_w===undefined || item_w===null){
			item_w = itemlist.find(".item").outerWidth(true);//每个item占的横向位置
			item_h = itemlist.find(".item").outerHeight(true);//每个item占的竖向位置
			box.find(".ident").css({height:item_h+"px"});
			box.find(".morexy").css({width:item_w+"px",height:item_h+"px"});
		};
		imgnum = itemlist.find(".item").length;//item数量
		col_len = Math.floor(box_w/item_w);//共分多少列
		few_len = Math.ceil(imgnum/col_len);//共分多少行
		box_h=item_h*few_len+20;
		box.height(box_h+"px");
		return true;
	}.bind(this)
	//绘制/移动
	var draw=this.draw=function(dom,col,few,slidetime){
		dom.css({
			"transition-duration": slidetime+"ms",
			"transform":"translate("+col+"px,"+few+"px)",
		});
	}
	//计算位置
	this.computat=function(index,domid,slidetime){
		var item = $("#"+domid);
		item.attr({
			"item":index,
		});
		if(chekobj[domid]!==undefined){
			chekobj[domid]=index;
		}
		var col_aliquot=index%col_len;
		var row_aliquot=Math.floor(index/col_len);
		var index_col = item_w*(col_aliquot);
		var index_few = item_h*row_aliquot;
		this.draw(item,index_col,index_few,slidetime);
		item.attr({
			"col":index_col,
			"few":index_few
		})
	}.bind(this)
	//调用绘制
	var redraw=this.redraw=function(strati,ilen,slidetime){
		for(var i=strati;i < strati+ilen;i++){
			this.computat(i,opts.listid+"_item"+itemidarr[i],slidetime)
		}
	}.bind(this)
	//首次绘制
	if(this.info(this)){
		var chekobj={};
		var itemidarr=[];
		this.imgnewarr=[];//新数组
		for(var i=0;i<imgnum;i++){ itemidarr.push(i) };
		this.redraw(0,itemidarr.length,0);
	}
	//浏览器尺寸改变时
	$(window).resize(function(){
		box_w = box.width();//取总宽度
		if(this.info(this)){
			this.redraw(0,itemidarr.length,0);
		}
	}.bind(this));
	//批量删除
	this.datadel=function(){
		if(!($.isEmptyObject(chekobj))){
			for(indexi in chekobj){
				var itemi=parseInt(itemlist.find("#"+indexi).attr("item"));
				var arr2=[];
				for(var i=0;i<itemidarr.length;i++){
					if(i==itemi){
						itemidarr[i]=null;
					}else if(itemidarr[i]!=null){
						arr2.push(itemidarr[i]);
					};
				}
				itemlist.find("#"+indexi).remove();
				delete chekobj.indexi;
			}
			itemidarr=arr2;
		}
		this.redraw(0,itemidarr.length,200);
	}.bind(this)
	//清空item
	this.dataempty=function(){
		itemlist.find(".item").remove();
		opts.imgsrcarr.length = 0;
		itemidarr.length = 0;
		chekobj={};
		box_h="20";
		box.height(box_h+"px");
	}.bind(this)
	//添加图片
	this.addimg=function(imgsrc,imgtitle){
		if(opts.jsondata){
			opts.imgsrcarr.push({src:imgsrc,title:imgtitle});
		}else{
			opts.imgsrcarr.push(imgsrc);
		}
		var imgnum=opts.imgsrcarr.length-1;
		itemidarr.push(imgnum);
		var titlebox = opts.showtitle ? '<div class="textbox">'+vimgtitle+'</div>' : "";
		if(imgtitle===undefined) imgtitle="";
		itemlist.append(
			'<div class="item" id="'+opts.listid+'_item'+imgnum+'" item="'+imgnum+'">'+this.itemhtml(imgsrc,imgtitle)+'</div>'
		);
		this.redraw(imgnum,1,0);
		this.info(this);
	}.bind(this)
	//添加图片数组
	this.addimgarr=function(imgobj){
		if(Object.prototype.toString.call(imgobj)=='[object Array]'){
			if(opts.jsondata){
				if(!((typeof imgobj[0]=='object')&&imgobj[0].constructor==Object)){
					alert("数据格式不正确,请传入json格式数据!");
					return;
				}
			}else{
				if(!((typeof imgobj[0]=='string')&&imgobj[0].constructor==String)){
					alert("数据格式不正确,请传入字符串格式数据!");
					return;
				}
			}
			for(var i=0;i<imgobj.length;i++){
				if(opts.jsondata){
					if(imgobj[i].title===undefined) imgobj[i].title="";
					this.addimg(imgobj[i].src,imgobj[i].title);
				}else{
					this.addimg(imgobj[i]);
				}
			}
		}
	}.bind(this)
	//获取最新数组
	this.getnewarr=function(){
		this.imgnewarr.length = 0;
		for(var i=0;i<itemidarr.length;i++){
			this.imgnewarr.push(opts.imgsrcarr[itemidarr[i]])
		}
		console.log(this.imgnewarr);
		return this.imgnewarr;
	}.bind(this)
	//选中input
	itemlist.on("click","input.checkbox",function(){
			var thisid=$(this).parents(".item").attr("id");
			if($(this).prop("checked")){
				var index=parseInt($(this).parents(".item").attr("item"));
				chekobj[thisid]=index;
			}else{
				delete chekobj[thisid];
			}
		}
	)
	//拖动排序
	var stsrtcol,stsrtfew,//初始位置
			mobiexident,mobieyident,//移动标识
			startindex,//当前点击元素的item值
			mulevex,mulevey;//多选框坐标
	var isdrag=false;//是否可以拖动
	var ischange=false;//是否有改动
	var ischek=false;//item是否选中
	var morexy=false;//多选框是否激活
	itemlist.on({
		mousedown:function(e){
			e.preventDefault();
			if(e.target.localName=="input"){
				return false;
			}
			startindex=parseInt($(this).attr("item"));
			$(this).css({"opacity":"0.8","z-index":"10"});
			var startx=e.pageX; 
			var starty=e.pageY;
			isdrag=true;
			stsrtcol=parseInt($(this).attr("col"));
			stsrtfew=parseInt($(this).attr("few"));
			draw(box.find(".ident"),stsrtcol,stsrtfew,0);
			if($(this).find("input.checkbox").prop("checked")){
				ischek=true;
			}else{
				ischek=false;
			}
			$(this).off("mousemove").off("mouseup").off("mouseleave").on({
				mousemove:function(e){
				 if(isdrag){
					var movex=e.pageX;
					var movey=e.pageY;
					var mobiex=stsrtcol+movex-startx;
					var mobiey=stsrtfew+movey-starty;
					if(mobiex>box_w-item_w){
						mobiex=box_w-item_w;
					}else if(mobiex < 0){
						mobiex=0;
					}
					if(mobiey>box_h-item_h){
						mobiey=box_h-item_h;
					}else if(mobiey < 0){
						mobiey=0;
					}
					if(Math.abs(movex-startx)>10||Math.abs(movey-starty)>10){
						ischange=true;
						if(ischek){
							if(!morexy){
								for(arri in chekobj){
									itemlist.find("#"+arri).css({"opacity":"0.25","z-index":"10"});
									draw(itemlist.find("#"+arri),stsrtcol,stsrtfew,300);
								}
								draw(box.find(".morexy"),stsrtcol,stsrtfew,0);
								box.find(".morexy").show();
								mulevex=movex;
								mulevey=movey;
								morexy=true;
							}
						}else{
							draw($(this),mobiex,mobiey,0);
						}
						mobiexident=Math.abs(Math.ceil((mobiex-item_w/2)/item_w));
						mobieyident=Math.abs(Math.ceil((mobiey-item_h/2)/item_h));
						box.find(".ident").show();
						draw(box.find(".ident"),mobiexident*item_w,mobieyident*item_h,0);
					}
				 }
				},
				mouseup:function(e){
				 if(isdrag){
					isdrag=false;
					morexy=false;
					$(this).css({"opacity":"1","z-index":""});
					box.find(".ident").hide();
					draw($(this),stsrtcol,stsrtfew,0);
					if(ischange){
						ischange=false;
						var toposion = mobieyident*col_len+mobiexident;
						var difference=toposion-startindex;
						if(difference > 1){//往后
							var changesitem=itemidarr.splice(startindex,1)[0];
							itemidarr.splice(toposion-1,0,changesitem);
							redraw(startindex,startindex+difference,200);
						}else if(difference < 0){//往前
							var changesitem=itemidarr.splice(startindex,1)[0];
							itemidarr.splice(toposion,0,changesitem);
							difference=Math.abs(difference)+1;
							redraw(toposion,toposion+difference,200);
						}
					}
				 }
				},
				mouseleave:function(e){
				 if(isdrag){
				 	isdrag=false;
					if(!ischek){
						$(this).css({"opacity":"1","z-index":""});
					}
					box.find(".ident").hide();
					draw($(this),stsrtcol,stsrtfew,0);
				 }
				},
			})
		},
	},".item")
	//多选拖动框
	box.find(".morexy").on({
		mousemove:function(e){
			if(morexy){
				var startx=mulevex;
				var starty=mulevey;
				var movex=e.pageX;
				var movey=e.pageY;
				var mobiex=stsrtcol+movex-startx;
				var mobiey=stsrtfew+movey-starty;
				if(mobiex>box_w-item_w){
					mobiex=box_w-item_w;
				}else if(mobiex < 0){
					mobiex=0;
				}
				if(mobiey>box_h-item_h){
					mobiey=box_h-item_h;
				}else if(mobiey < 0){
					mobiey=0;
				}
				draw($(this),mobiex,mobiey,0);
				if(Math.abs(movex-startx)>20||Math.abs(movey-starty)>20){
					ischange=true;
					mobiexident=Math.abs(Math.ceil((mobiex-item_w/2)/item_w));
					mobieyident=Math.abs(Math.ceil((mobiey-item_h/2)/item_h));
					box.find(".ident").show();
					draw(box.find(".ident"),mobiexident*item_w,mobieyident*item_h,0);
				}
			}
		},
		mouseup:function(e){
			if(morexy){
				morexy=false;
				$(this).hide();
				box.find(".ident").hide();
				draw($(this),0,0,0);
				if(ischange){
					ischange=false;
					var toposion = mobieyident*col_len+mobiexident;
					var min=0;
					var max=itemidarr.length;
					if(!($.isEmptyObject(chekobj))){
						var transsh=[];
						min = max;
						max = 0;
						for(indexi in chekobj){
							itemlist.find("#"+indexi).css({"opacity":"1","z-index":""});
							for(var i=0;i<itemidarr.length;i++){
								if(i==chekobj[indexi]){
									min = i < min ? i : min;
									max = i+1 > max ? i+1 : max;
									transsh.push(itemidarr[i]);
									itemidarr[i]=null;
								};
							};
						}
						for(var i=0;i<transsh.length;i++){
							itemidarr.splice(toposion+i,0,transsh[i]);
						}
						transsh.length=0;
						for(var i=itemidarr.length-1;i>=0;i--){
							if(itemidarr[i]==null){
								itemidarr.splice(i,1);
							};
						}
						min = toposion < min ? toposion : min;
						max = toposion > max ? toposion : max;
					}
					redraw(min,max-min,200);
				}
			}
		},
		mouseleave:function(e){
			if(morexy){
				morexy=false;
				$(this).hide();
				box.find(".ident").hide();
				draw($(this),0,0,0);
				for(arri in chekobj){
					var elem = 	itemlist.find("#"+arri);
					var elem_col=elem.attr("col");
					var elem_few=elem.attr("few");
					itemlist.find("#"+arri).css({"opacity":"1","z-index":""});
					draw(itemlist.find("#"+arri),elem_col,elem_few,300);
				}
			}
		},
	})
	//预览/查看图片
	var ismove=false;
	var eimgx,eimgy;
	itemlist.on({
		click:function(e){
			e.preventDefault();
			if(!ismove){
				var item=parseInt($(this).parents(".item").attr("item"));
				chakshow(item)
			};
		},
		mousedown:function(e){
			eimgx=e.pageX;
			eimgy=e.pageY;
			ismove=false;
		},
		mouseup:function(e){
			eimgx=Math.abs(e.pageX-eimgx);
			eimgy=Math.abs(e.pageY-eimgy);
			ismove=false;
			if(eimgx > 5 || eimgy > 5) ismove=true;
		},
		mouseleave:function(){
			ismove=false;
		},
	},"a");
	//查看图片dom添加
	if(opts.viewimg){
		var chak_btn="";
		if(opts.view_toggle) chak_btn+='<button class="chak_prev">上一个</button><button class="chak_next">下一个</button>';
		if(opts.view_rotate) chak_btn+='<button class="chak_turn_l">向左转</button><button class="chak_turn_r">向右转</button>';
		chak_btn+='<button class="chak_close">关闭</button>';
		box.append(
			'<div class="chak_box">'+
				'<div class="chak_title"></div>'+
				'<div class="chak_img">'+
					'<img draggable="false" src="" ondragstart="return false;" />'+
				'<p></p></div>'+
				'<div class="chak_btn">'+chak_btn+'</div>'+
			'</div>'
		);
		var chak_box=box.find(".chak_box");
		chak_box.on({click:function(e){
			chakhide();
		}});
		chak_box.find(".chak_img > img").on({click:function(e){
			e.stopPropagation();
		}});
		if(opts.view_toggle){//是否可切换图片
			chak_box.find(".chak_prev").on({click:function(e){
				e.stopPropagation();
				var item = parseInt(chak_box.find(".chak_img").attr("item"))-1;
				chakshow(item);
			}});
			chak_box.find(".chak_next").on({click:function(e){
				e.stopPropagation();
				var item = parseInt(chak_box.find(".chak_img").attr("item"))+1;
				chakshow(item);
			}});
		};
		//查看图片
		var isview=false;
		var pisshow=false;
		var chakshow=function(imgitem){
			isview=true;
			var chak_ptog=function(text){
				var chak_p=chak_box.find(".chak_img > p");
				if(!pisshow){
					pisshow=true;
					chak_p.html(text).show();
					setTimeout(function(){
						pisshow=false;
						chak_p.hide();
					},1000);
				}
			}
			if(imgitem<0){
				chak_ptog("已经是第一张图片");
				return;
			}else if(imgitem > itemidarr.length-1){
				chak_ptog("已经是最后一张图片");
				return;
			}else{
				chak_box.find(".chak_img > p").hide()
			}
			var viewimgdom=itemlist.find(".item[item='"+imgitem+"'] .viewimg")
			var imgsrc = viewimgdom.attr("href");
			var imgtitle=viewimgdom.attr("title");
			chak_box.find(".chak_img").attr("item",imgitem);
			chak_box.find(".chak_img > img").attr({"src":imgsrc,"style":""});
			chak_box.find(".chak_title").html(imgtitle);
			$("body").css({"overflow":"hidden"});
			$("body",parent.document).css({"overflow":"hidden"});
			chak_box.show();
		};
		//关闭图片查看
		var chakhide=this.chakhide=function(){
			isview=false;
			chak_box.find(".chak_img").attr("item","");
			chak_box.find(".chak_img > img").attr("src","");
			$("body").css({"overflow":"auto"});
			chak_box.hide();
		};
		//预览图片缩放
		if(opts.view_zoom){
			var viewimg_zoom=function(solls,zoomval){//缩放
				var imgdom = chak_box.find(".chak_img > img");
				var img = new Image(); 
				img.src =imgdom.attr("src"); 
				var imgWidth = img.width; //图片实际宽度
		    var ckimg_w=parseInt(imgdom.width());
		    imgdom.css({"max-width":imgWidth+"px","max-height":"none"});
		    solls>0 ? ckimg_w+=zoomval : ckimg_w-=zoomval;
		    imgdom.css({"width":ckimg_w+"px"});
			};
			chak_box.find(".chak_img > img").on({//拖动
				click:function(event){
					event.stopPropagation();
				},
			  mousedown:function(e){
					viewmove=true;
					var marginx=parseInt($(this).css("margin-left"));
					var marginy=parseInt($(this).css("margin-top"));
					var _x=e.pageX-marginx; 
					var _y=e.pageY-marginy;
					$(this).off("mousemove").on({
						mousemove:function(e){
							if(viewmove){ 
								var x=e.pageX-_x;
								var y=e.pageY-_y;
								$(this).css({
									"margin-top":y+"px",
									"margin-left":x+"px"
								});
							} 
						}
					});
				},
				mouseup:function(e){
					viewmove=false;
				},
				mouseout:function(e){
					viewmove=false;
				},
			});
			//滚轮事件添加
			$(document).on('mousewheel', function(event){
				if(isview){
			    var solls=event.originalEvent.wheelDelta;
			    viewimg_zoom(solls,50);
				}
			});
			document.addEventListener("DOMMouseScroll", function (event) {//ff
				if(isview){
			    var solls=event.detail;
			    solls=0-solls;
				  viewimg_zoom(solls,50);
				}
			});
		};
		//预览图片旋转
		if(opts.view_rotate){
			//旋转角度
			function getmatrix(a,b,c,d,e,f){
				var aa=Math.round(180*Math.asin(a)/ Math.PI);  
				var bb=Math.round(180*Math.acos(b)/ Math.PI);  
				var cc=Math.round(180*Math.asin(c)/ Math.PI);  
				var dd=Math.round(180*Math.acos(d)/ Math.PI);  
				var deg=0;
				if(aa==bb||-aa==bb){  
				    deg=dd;  
				}else if(-aa+bb==180){  
				    deg=180+cc;  
				}else if(aa+bb==180){  
					deg=360-cc||360-dd;  
				}  
				return deg>=360?0:deg;
			}
			var chak_turn=function(dom,step){
				var _img=chak_box.find(".chak_img > img");
		    var deg=eval('get'+_img.css('transform'));
		    _img.css({'transform':'translate(-50%,-50%) rotate('+(deg+step)%360+'deg)'});
				dom.attr({"disabled":"true"});
				setTimeout(function(){
					dom.removeAttr("disabled");
				},60)
			}
			//向左转
			chak_box.find(".chak_turn_l").on({click:function(e){
				e.stopPropagation();
				chak_turn($(this),-90)
			}});
			//向右转
			chak_box.find(".chak_turn_r").on({click:function(e){
				e.stopPropagation();
				chak_turn($(this),90)
			}});
		}
	}
}
