/*模拟数据*/
lables = {
	LYDatas:[
		{txt: '高端装备',state : false,type : 0,id:111},
		{txt: '电子信息',state:false,type : 0,id:112}, 
		{txt: '北斗导航',state:false,type : 0,id:113}, 
		{txt: '模拟训练器',state:false,type : 0,id:114}, 
		{txt: '人工影响天气',state:false,type : 0,id:115}, 
		{txt: '新材料新能源',state:false,type : 0,id:116}, 
		{txt: '智能制造',state:false,type : 0,id:117}, 
		{txt: '其他',state:false,type : 0,id:118}, 
	],
	LXDatas:[
		{txt: '整机产品',state:false,type : 1,id:211},
		{txt: '软件产品',state:false,type : 1,id:212}, 
		{txt: '电子产品',state:false,type : 1,id:213}, 
		{txt: '机电产品',state:false,type : 1,id:214}, 
		{txt: '光电产品',state:false,type : 1,id:215}, 
		{txt: '液压产品',state:false,type : 1,id:216}, 
		{txt: '化工',state:false,type : 1,id:217}, 
		{txt: '材料制品',state:false,type : 1,id:218}, 
		{txt: '核心技术',state:false,type : 1,id:219}, 
		{txt: '检测设备',state:false,type : 1,id:220}, 
		{txt: '标准件/通用件',state:false,type : 1,id:221}, 
		{txt: '其他',state:false,type : 1,id:222}, 
	],
}
Degions = {
	DegionsDatas:[
		{value: 'much',texts: '全部',},
		{value: 'BJ',texts: '北京',}, 
		{value: 'SH',texts: '上海',}, 
		{value: 'WH',texts: '武汉',}, 
		{value: 'CD',texts: '成都',}, 
	]
}
Conditions = {
	ConditionDatas:[
		{val: 'TJ',txt: '推荐',arrow : false,arrowState : false,TJarrowState : true,},
		{val: 'XL',txt: '销量',arrow : false,arrowState : false,TJarrowState : false,}, 
		{val: 'JG',txt: '价格',arrow : false,arrowState : false,TJarrowState : false,}, 
		{val: 'GZ',txt: '关注',arrow : false,arrowState : false,TJarrowState : false,}, 
	]
}
myGoods = {
	    	Goods:[
	    		{"name" : '继电器型开关指令板卡' , "src" : "../img/CivilMilitaryIntegration/img1.jpg" , "price" : 123},
	    		{"name" : 'HBC-GR/B系列霍尔电流传感器' , "src" : "../img/CivilMilitaryIntegration/img2.jpg" , "price" :346 },
	    		{"name" : '军民商城.htm' , "src" : "../img/CivilMilitaryIntegration/img1.jpg" , "price" : 5789},
	    		{"name" : '继电器型开关指令板卡' , "src" : "../img/CivilMilitaryIntegration/img2.jpg" , "price" : 345},
	    	]
	    }
myShowgoods = {
	    	showgoods:[
	    		{"value" : 'BJ' ,"name" : '军民商城' , "src" : "../img/CivilMilitaryIntegration/img3.jpg" , "price" : '面议' ,"evaluate":'1023+',"pog":'兵器一院','oldbuy':1,'watchNum':1234,'likeImg' : '../img/CivilMilitaryIntegration/Collection.jpg' , },
	    		{"value" : 'SH' ,"name" : '军民商城' , "src" : "../img/CivilMilitaryIntegration/img4.jpg" , "price" : 2 ,"evaluate":'200+',"pog":'兵器二院','oldbuy':2,'watchNum':23,'likeImg' : '../img/CivilMilitaryIntegration/Collection.jpg'},
	    		{"value" : 'SH' ,"name" : '军民商城' , "src" : "../img/CivilMilitaryIntegration/img3.jpg" , "price" : 4 ,"evaluate":'300+',"pog":'兵器三院','oldbuy':13,'watchNum':56,'likeImg' : '../img/CivilMilitaryIntegration/Collection.jpg'},
	    		{"value" : 'BJ' ,"name" : '军民商城' , "src" : "../img/CivilMilitaryIntegration/img4.jpg" , "price" : 6,"evaluate":'4325+',"pog":'兵器一院','oldbuy':34,'watchNum':43,'likeImg' : '../img/CivilMilitaryIntegration/Collection.jpg'},
	    		{"value" : 'WH' ,"name" : '军民商城' , "src" : "../img/CivilMilitaryIntegration/img3.jpg" , "price" : '面议' ,"evaluate":'24+',"pog":'兵器四院','oldbuy':5,'watchNum':23,'likeImg' : '../img/CivilMilitaryIntegration/Collection.jpg'},
	    		{"value" : 'CD' ,"name" : '军民商城' , "src" : "../img/CivilMilitaryIntegration/img4.jpg" , "price" : 9 ,"evaluate":'324+',"pog":'兵器六院','oldbuy':6,'watchNum':34,'likeImg' : '../img/CivilMilitaryIntegration/Collection.jpg'},
	    		{"value" : 'WH' ,"name" : '军民商城' , "src" : "../img/CivilMilitaryIntegration/img3.jpg" , "price" : 17 ,"evaluate":'1345+',"pog":'兵器六院','oldbuy':11,'watchNum':54,'likeImg' : '../img/CivilMilitaryIntegration/Collection.jpg'},
	    		{"value" : 'CD' ,"name" : '军民商城' , "src" : "../img/CivilMilitaryIntegration/img4.jpg" , "price" : "面议" ,"evaluate":'2342+',"pog":'兵器一院','oldbuy':41,'watchNum':65,'likeImg' : '../img/CivilMilitaryIntegration/Collection.jpg'},
	    	]
	    }



	var vm = new Vue({
	el: "#myVue",
	data: {
		showgood:myShowgoods.showgoods,
		
		LYdatas : lables.LYDatas ,		//领域数据
		LXdatas : lables.LXDatas ,		//类型数据
		mygoods : myGoods.Goods , 		//广告数据
		degions : Degions.DegionsDatas ,//地区数据
		conditiondatas : Conditions.ConditionDatas ,//条件筛选数据
		
		lableColor : false ,			//标签选择样式
		isShowYesLY : false ,       	//领域默认确定是灰色，只有选中服务才会变色
		isShowYesLX : false ,			//类型默认确定是灰色，只有选中服务才会变色
		
		mult0:0,						//0是领域多选 、领域删除
		mult1:1,						//1是类型多选、类型删除
		
		multLYState : false ,   	    //领域多选按钮状态
		multsLYState : false,			//领域多选选择内容状态
		multLXState : false , 	        //类型多选按钮状态
		multsLXState: false ,			//类型多选选择内容状态
		
		RedioLYState : false ,     	 	//领域单选是否选中
		RedioLXState: false ,			//类型单选是否选中
		
		LYredioID:'',					//单选领域id
		LXredioID:'',					//单选类型id
		LYmultArrID:[],					//多选领域id
		LXmultArrID:[],					//多选类型id
		
		LYredio : '' ,             		//领域单选值
		LXredio : '' ,            		//类型单选值
		LYmultArr : [] ,				//多选值的数组
		LXmultArr : [] ,				//多选值的数组
		
		screenValue:'',
		form: {
        	region: '',
         				
        },
       
        regionArr : [] , 					//地区筛选临时数组
        regionState : 0 ,					//地区的状态：0.全部  1.地区条件筛选
        
        arrowState : false , 				//默认箭头状态
        conditionsValue : '',				//筛选类型
        oldbuyArr : [] , 					//销量临时数组
        TJarrowState : false ,				//推荐单独样式
        LikeArr:[],							//喜欢物品的数据
        
        toggleShow:'',						//加入购物车或者面议询价
        dialogVisible: false,				//对话框显示状态
        goodNums:1, 						//对话框中的购买数量
        stepSelect:1,						//对话框中的步骤
        stepdesc: '请输入您要采购的说明'	,	//对话框中的采购说明
        currentPage1: 5,					//总页数
        pageSize : '',						//页码数据总数
        NowPage :'',                        //当前页
        ImgSrc:"",
        
	},
	
	methods: {
		initPage: function (NowPage,pageSize) {
            let self = this;
            console.log(self.LYredioID)
            console.log(self.LXredioID)
            console.log(self.LYmultArrID)
            console.log(self.LXmultArrID)
            $.ajax({
                method: 'post',
                url: '/manage/projects/search',
                data: {
                        LYredioID: self.LYredioID, 			//领域单选值
                        LXredioID: self.LXredioID, 			//类型单选值
                        LYmultArrID: self.LYmultArrID,		//领域多选值
                        LXmultArrID: self.LXmultArrID,		//类型多选值
                        conditionsValue: self.conditionsValue,//推荐、价格、关注、销量筛选值
                        region: self.form.region,		//地区筛选值
                        screenValue: self.screenValue,  //用户搜索值
                        LikeArr: self.LikeArr,  		//用户收藏商品信息
                        NowPage: NowPage,				//当前页
                        pageSize: pageSize				//总页数
                    },
                    success:function(response){
                    self.projectList = response.myShowgoods;
                    }
                })
        },
		ImgHeight:function(e){
			var el = e.target;
		    $(el).css('height',  $(el).width())
		},
		//加入收藏函数
		addLike:function(item){
			this.LikeArr.push(item)
			item.likeImg = "../img/CivilMilitaryIntegration/blue.jpg";
			this.initPage(this.NowPage,this.pageSize)
			console.log(this.LikeArr)
		},
		//标签选择函数
		lableclick : function(lables,index){
			//判断lables.type： 0为领域数据  1为类型数据
			if(lables.type == 0){
				var _this = this;
				//判断this.multState： false为多选按钮没有点击  true为多选按钮已点击
				if(_this.multLYState == false){
					_this.LYmultArr.length = 0;
					_this.LYmultArrID.length = 0;
					_this.multLYState = false;
					_this.multsLYState = false;
					_this.clearColor(lables.type);
					_this.RedioLYState = true;
					lables.state = true;
					_this.LYredio = lables.txt;
					_this.LYredioID = lables.id;
					this.initPage(this.NowPage,this.pageSize)
				}else if(_this.multLYState == true){
					if($.inArray(lables.txt, _this.LYmultArr) == -1 ) {
						_this.isShowYesLY = true;
						lables.state = true;
						_this.multsLYState = true;
						_this.LYmultArr.push(lables.txt);
						_this.LYmultArrID.push(lables.id);
					}else{
						_this.alertShow(lables);
					}
				}else{
					alert("未知错误！")
				}
			}else if(lables.type == 1){
				var _this = this;
				//判断this.multState： false为多选按钮没有点击  true为多选按钮已点击
				if(_this.multLXState == false){
					
					_this.LXmultArr.length = 0;
					_this.LXmultArrID.length = 0;
					_this.multLXState = false;
					_this.multsLXState = false;
					_this.clearColor(lables.type);
					_this.RedioLXState = true;
					lables.state = true;
					_this.LXredio = lables.txt;
					_this.LXredioID = lables.id;
					this.initPage(this.NowPage,this.pageSize);
				}else if(_this.multLXState == true){
					if($.inArray(lables.txt, _this.LXmultArr) == -1) {
						_this.isShowYesLX = true;
						lables.state = true;
						_this.multsLXState = true;
						_this.LXmultArr.push(lables.txt);
						_this.LXmultArrID.push(lables.id)
					}else{
						_this.alertShow(lables);
					}
				}else{
					_this.unknownalertShow()
				}
			}else{
				_this.unknownalertShow()
			}
		},
		//多选按钮
		multclick : function(mult){
			if(mult == 0){
				this.LYredioID = '';
				this.RedioLYState = false;
				this.multsLYState = false;
				/*this.multLXState = false;*/
				this.LYmultArr.length = 0;
				this.LYmultArrID.length = 0;
				this.multLYState = true;
				this.clearColor(mult);
			}else if(mult == 1){
				this.LXredioID = '';
				this.RedioLXState = false;
				this.multsLXState = false;
				this.LXmultArr.length = 0;
				this.LXmultArrID.length = 0;
				/*this.multLYState = false;*/
				this.multLXState = true;
				this.clearColor(mult);
			}
		},
		//取消按钮
		cancelMuti : function(mult){
			if(mult == 0){
				this.multLYState = false;
				this.multsLYState = false;
				this.LYmultArr.length = 0;
				this.LYmultArrID.length = 0;
				this.clearColor(mult);
			}else if(mult == 1){
				this.multLXState = false;
				this.multsLXState = false;
				this.LXmultArr.length = 0;
				this.LXmultArrID.length = 0;
				this.clearColor(mult);
			}else{
				this.unknownalertShow()
			}
		},
		//确定按钮
		yesIdo : function(mult){
			if(mult == 0){
				this.multLYState = false;
				this.initPage(this.NowPage,this.pageSize)
			}else if(mult == 1){
				this.multLXState = false;
				this.initPage(this.NowPage,this.pageSize)
			}else{
				this.unknownalertShow()
			}
		},
		//删除标签
		closeLable : function(mult){
			if(mult == 0){
				this.LYmultArr.length = 0 ; 
				this.LYmultArrID.length = 0;
				this.RedioLYState = false;
				this.multLYState = false;
				this.multsLYState = false;
				this.clearColor(mult);
				this.initPage(this.NowPage,this.pageSize)
			}else if(mult == 1){
				this.LXmultArr.length = 0 ; 
				this.LXmultArrID.length = 0 ; 
				this.RedioLXState = false;
				this.multsLXState = false;
				this.clearColor(mult);
				this.initPage(this.NowPage,this.pageSize)
			}
		},
		//清除单选标签选择
		clearColor : function(typeNum){
			if(typeNum == 0){
				this.isShowYesLY = false;
				var _this = this;
				for(x in _this.LYdatas){
					_this.LYdatas[x].state = false;
				}
			}else if(typeNum == 1){
				this.isShowYesLX = false;
				var _this = this;
				for(y in _this.LXdatas){
					_this.LXdatas[y].state = false;
				}
			}else{
				this.unknownalertShow()
			}
		},
		//地区筛选
		screenRegion : function(){
			console.log(this.form.region);
			var _this =this;
			this.regionArr.length=0;
			if(this.form.region == "much"){
				_this.regionState = 0;
				this.initPage(this.NowPage,this.pageSize)
			}else{
				this.regionState = 1;
				for(x in this.showgood){
					if(this.showgood[x].value == _this.form.region){
						_this.regionArr.push(this.showgood[x]);
					}
				}
				this.initPage(this.NowPage,this.pageSize)
			}		
		},
		//conditions.arrow == false 为向上  conditions.arrow == true 为向下
		//推荐，销量，价格，关注函数入口
		conditionScreen : function(conditions){
			this.conditionsValue = conditions.val + conditions.arrow;
			console.log(this.conditionsValue)
			if(conditions.val == 'TJ'){
				this.clearArrowState();
				conditions.TJarrowState = true;
				this.initPage(this.NowPage,this.pageSize)
			}else{
				this.clearArrowState();
				conditions.arrowState = true;
				conditions.arrow = !conditions.arrow;
				this.sortScreen(conditions);//前端筛选入口
				this.initPage(this.NowPage,this.pageSize)
			}
		},
		//推荐，销量，价格，关注排序函数
		sortScreen : function(conditions){
			var _this = this;
			_this.oldbuyArr.length = 0;
			if(conditions.val == 'TJ'){
				
			}else if(conditions.val == 'XL'){
				if(conditions.arrow == false){
				console.log(conditions.txt + conditions.arrow + "递增")
				_this.showgood.sort(function(a,b){return a.oldbuy-b.oldbuy});
				_this.regionArr.sort(function(a,b){return a.oldbuy-b.oldbuy});
				console.log(_this.showgood)
				}else if(conditions.arrow == true){
					console.log(conditions.txt + conditions.arrow + "递减")
					_this.showgood.sort(function(a,b){return b.oldbuy-a.oldbuy});
					_this.regionArr.sort(function(a,b){return b.oldbuy-a.oldbuy});
					console.log(_this.showgood)
				}
			}else if(conditions.val == 'JG'){
				if(conditions.arrow == false){
				console.log(conditions.txt + conditions.arrow + "递增")
				_this.showgood.sort(function(a,b){return a.price-b.price});
				_this.regionArr.sort(function(a,b){return a.price-b.price});
				console.log(_this.showgood)
				}else if(conditions.arrow == true){
					console.log(conditions.txt + conditions.arrow + "递减")
					_this.showgood.sort(function(a,b){return b.price-a.price});
					_this.regionArr.sort(function(a,b){return b.price-a.price});
					console.log(_this.showgood)
				}
			}else if(conditions.val == 'GZ'){
				if(conditions.arrow == false){
				console.log(conditions.txt + conditions.arrow + "递增")
				_this.showgood.sort(function(a,b){return a.watchNum-b.watchNum});
				_this.regionArr.sort(function(a,b){return a.watchNum-b.watchNum});
				console.log(_this.showgood)
				}else if(conditions.arrow == true){
					console.log(conditions.txt + conditions.arrow + "递减")
					_this.showgood.sort(function(a,b){return b.watchNum-a.watchNum});
					_this.regionArr.sort(function(a,b){return b.watchNum-a.watchNum});
					console.log(_this.showgood)
				}
			}else{}
		},
		//清除其他筛选条件按钮
		clearArrowState : function(){
			for(x in this.conditiondatas){
				this.conditiondatas[x].arrowState = false;
				this.conditiondatas[x].TJarrowState = false;
			}
		},
		screenClick(ev) {
	        console.log(this.screenValue);
	        this.initPage(this.NowPage,this.pageSize)
	    },
	    //判断询价和加入购物车函数
	    toggleClicik:function(price){
	    	if(price == '面议'){
	    		return this.toggleShow = false;
	    	}else{
	    		
	    		return this.toggleShow = true;
	    	}
	    },
	    //加入购物车函数
	    addcart:function(Src){
	    	this.ImgSrc = Src
			console.log(this.ImgSrc)
	    },
	    //询价函数
	    handleClose(done) {
	        this.$confirm('确认关闭？')
	          .then(_ => {
	            done();
	          })
	          .catch(_ => {});
	      },
	      //对话框中的购买数量
	      handleChange(value) {
	        console.log(value);
	      },
		//分页尺寸函数
		handleSizeChange(val) {
			this.pageSize = val;
        	console.log(this.pageSize + "条");
        	this.initPage(this.NowPage,this.pageSize)
     	},
     	//分页点击改变函数
        handleCurrentChange(val) {
        	this.NowPage = val
        	console.log(this.NowPage);
        	this.initPage(this.NowPage,this.pageSize)
        },
		//提示函数
		alertShow(lables) {
			this.$alert("您已经选择过  (" + lables.txt + ")  选项，请重新选择！", '提示', {
				confirmButtonText: '确定',
				callback: action => {
					this.$message({
						type: 'info',
						message: `请重新选择筛选条件!`
					});
				}
			});
		},
		unknownalertShow() {
			this.$alert("未知错误，请联系管理员！", '提示', {
				confirmButtonText: '确定',
				callback: action => {
					this.$message({
						type: 'info',
						message: `请重新选择筛选条件!`
					});
				}
			});
		},
		//对话框的确定
		successClcik:function() {
			this.dialogVisible = false
	        this.$message({
	          message: '恭喜你，发送询价成功',
	          type: 'success'
	        });
      },
	},
	filters : {
		multFilter : function(value){
			return " [ " + value + " ] "
		},
		myMoney : function(value){
			if(value == '面议'){
				return value
			}else{
				return "￥" + value;
			}
			
		}
	}
})
$(window).resize(function() {
	$(".goodShowImg").css('height', $(".goodShowImg").width())
})

		