/*模拟数据*/
var addressdatas = {
	addressdata:[
		{
			name:"吴浩然",
			city:"1",
			erae : '1',
			minerae : '1',
			maxnerae:'嘉园一里9号楼3',
			selectedOptions:[1,1,1],
			phone:18347460829,
			addressDefult:false,
			addressIsShow:false,
			isShowDefult:false,
		},
		{
			name:"张三",
			city:"1",
			erae : '1',
			minerae : '1',
			selectedOptions:[1,1,1],
			maxnerae:'嘉园一里9号楼3',
			phone:18347460829,
			addressDefult:false,
			addressIsShow:false,
			isShowDefult:false,
		},
		{
			name:"李四",
			city:"1",
			erae : '1',
			minerae : '1',
			maxnerae:'嘉园一里9号楼3',
			selectedOptions:[1,1,1],
			phone:18347460829,
			addressDefult:false,
			addressIsShow:false,
			isShowDefult:false,
		},
		{
			name:"王五",
			city:"1",
			erae : '1',
			minerae : '1',
			selectedOptions:[1,1,1],
			maxnerae:'嘉园一里9号楼3',
			phone:18347460829,
			addressDefult:false,
			addressIsShow:false,
			isShowDefult:false,
		},
		{
			name:"老刘",
			city:"2",
			erae : '2',
			minerae : '2',
			selectedOptions:[2,2,2],
			maxnerae:'嘉园一里9号楼3',
			phone:18347460829,
			addressDefult:true,
			addressIsShow:false,
			isShowDefult:true,
		},
	
	]
}
var vm = new Vue({
	el: "#myVue",
	data: {
		 /*数据源*/
		 CityInfo: CityInfo,//地区数据
		 form: {
	         	city : '',
				erae : '',
				minerae : '',
				selectedOptions: [],//地区筛选数组
        },
	},
	methods: {
		handleChange(value) {
			this.form.city = this.form.selectedOptions[0];
			this.form.erae = this.form.selectedOptions[1]
			this.form.minerae = this.form.selectedOptions[2]
     	},
	},
	/*金额过滤器*/
	filters:{
		myAddressCity:function(value){
			for(y in this.CityInfo){
				if(this.CityInfo[y].value == value){
					return value = this.CityInfo[y].label
				}
			}
		},
		myAddressErae:function(value){
			for(y in this.CityInfo){
				for(z in this.CityInfo[y].children){
					if(this.CityInfo[y].children[z].value == value && value!=undefined){
						return value = this.CityInfo[y].children[z].label;
					}
				}
			}
		},
		myAddressMinerae:function(value){
			for(y in this.CityInfo){
				for(z in this.CityInfo[y].children){
					for(i in this.CityInfo[y].children[z].children){
						if(this.CityInfo[y].children[z].children[i].value == value && value!=undefined){
							return value = this.CityInfo[y].children[z].children[i].label
						}
					}
				}
			}
		},
	},
});
