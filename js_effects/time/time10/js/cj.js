// 抽奖
var xinm = new Array();
xinm[0] = "林黛玉"
xinm[1] = "贾宝玉"
xinm[2] = "孙悟空"
xinm[3] = "唐僧"
xinm[4] = "猪八戒"
xinm[5] = "沙和尚"
xinm[6] = "刘德华"
xinm[7] = "梅艳芳"
xinm[8] = "小燕子"
xinm[9] = "苍井空"
xinm[10] = "梁河"
xinm[11] = "张舒省"
xinm[12] = "张梁合"
xinm[13] = "舒凉凉"
xinm[14] = "张飞量"
xinm[15] = "张喝潶"
xinm[16] = "关羽"
xinm[17] = "刘备"
xinm[18] = "曹操"

var phone = new Array();
phone[0] = "15161584615"
phone[1] = "18011111111"
phone[2] = "1581635485"
phone[3] = "13513154899"
phone[4] = "1828647913"
phone[5] = "18024631478"
phone[6] = "18631549875"
phone[7] = "18312345678"
phone[8] = "15800000000"
phone[9] = "13712365487"
phone[10] = "13222225487"
phone[11] = "13233225487"
phone[12] = "13233225487"
phone[13] = "13233225487"
phone[14] = "13233225487"
phone[15] = "13233225487"
phone[16] = "13233225487"
phone[17] = "13233225487"
phone[18] = "13233225487"

var nametxt = $('.name');
var phonetxt = $('.phone');
var pcount = xinm.length - 1; //参加人数
var runing = true;
var td = 10; //从最小奖开始，共10个名额
var num = 0;
var gundong; //名单随机滚动


// 点击开始循环
function start() {
	if (runing) {
		runing = false;
		startNum()
	};
	var timing = setInterval(function () {
		time = timing;
		zd();
	}, 1000)
}

//每次抽完停顿
function reset(){
	startNum();
	var timing = setInterval(function () {
		time = timing;
		zd();
	}, 1000)
}


//循环参加名单
function startNum() {
	// 时时更新pcount人数
	pcount = xinm.length - 1;
	num = Math.floor(Math.random() * pcount);
	nametxt.html(xinm[num]);
	phonetxt.html(phone[num]);
	gundong = setTimeout(startNum, 0);
}
//停止跳动
function stop() {
	clearInterval(gundong);
	gundong = 0;
}

//抽取10个人
function zd() {
	// 10个中奖人选出来后停止定时器
	if (td < 2) {
		clearInterval(time);
		stop()
		runing = true;
		$(".count_down").html("抽奖结束，恭喜获奖者");

	}
	// 打印10个中奖名单
	if (td >= 1) {
        clearInterval(time);
		stop()
		$('.list').prepend("<p>" + td + ' ' + xinm[num] + " -- " + phone[num] + "</p>");
		td -= 1;
	}
	//判断10个后停止
	if(td > 0){
        setTimeout(reset, 2000);
	}

	xinm.splice($.inArray(xinm[num], xinm), 1);
	phone.splice($.inArray(phone[num], phone), 1);
}




// 设置一个毫秒数，开始倒计时
var endDate = 5000; //(后台传入时间)


var second = parseInt(endDate / 1000) % 60;
var minute = parseInt(endDate / 1000 / 60) % 60;
var hour = parseInt(endDate / 1000 / 60 / 60) % 24;
var day = parseInt(endDate / 1000 / 60 / 60 / 24) % 24;


$('#countDown .count_down .second').html(second);
$('#countDown .count_down .minute').html(minute);
$('#countDown .count_down .hour').html(hour);
$('#countDown .count_down .day').html(day);
if (second < 10) {
	$('#countDown .count_down .second').html('0' + second);
}

if (minute < 10) {
	$('#countDown .count_down .minute').html('0' + minute);
}
if (hour < 10) {
	$('#countDown .count_down .hour').html('0' + hour);
}
if (day < 10) {
	$('#countDown .count_down .day').html('0' + day);
}

var timeRun = setInterval(function () {
	second--;
	if (second < 0) {
		minute = minute - 1;
		second = 59;
		if (minute < 0) {
			hour = hour - 1;
			minute = 59;
			if (hour < 0) {
				day = day - 1;
				hour = 23;
			}
		}
	}


	$('#countDown .count_down .second').html(second);
	$('#countDown .count_down .minute').html(minute);
	$('#countDown .count_down .hour').html(hour);
	$('#countDown .count_down .day').html(day);

	// 当 日/时/分/秒都满足小于等于0的时候关闭定时器
	if (second <= 0 && minute <= 0 && hour <= 0 && day <= 0) {
		clearInterval(timeRun);
		$(".count_down").html("正在抽奖，请稍后。。。");
		start()
	}

	if (second < 10) {
		$('#countDown .count_down .second').html('0' + second);
	}

	if (minute < 10) {
		$('#countDown .count_down .minute').html('0' + minute);
	}
	if (hour < 10) {
		$('#countDown .count_down .hour').html('0' + hour);
	}
	if (day < 10) {
		$('#countDown .count_down .day').html('0' + day);
	}
	//  设置倒计时速度   
}, 1000);