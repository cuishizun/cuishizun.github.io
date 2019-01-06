(function ($) {
    "use strict";

    var db;
    //检测浏览器是否支持 indexedDBOk
    function indexedDBOk() {
        return "indexedDB" in window;
    }

    document.addEventListener("DOMContentLoaded", function () {

        //判断 indexedDBOk 支持 是/否？
        if (!indexedDBOk) return;

        //打开数据库  这个变量其中一个属性是一个已存在的对象存储list,名为objectStoreNames
        var openRequest = indexedDB.open("self_entertainment", 1);

        openRequest.onupgradeneeded = function (e) {

            var thisDB = e.target.result;
            //通过contains方法检车某个对象是否已经存在了，如果不存在则可进行创建
            if (!thisDB.objectStoreNames.contains("restaurant")) {

                //使用key生成器
                var os = thisDB.createObjectStore("restaurant", { autoIncrement: true });
                //索引
                //os.createIndex(索引名称，列，指定某个列是否是唯一)
                os.createIndex("name", "name", { unique: true });
            }
        }

        openRequest.onsuccess = function (e) {

            db = e.target.result;

            //监听添加事件
            document.querySelector("[name=menu]").addEventListener("click", getRestaurant, false);
            document.querySelector("#addRestaurant").addEventListener("click", addRestaurant, false);
            document.querySelector("#befAddRestaurant").addEventListener("click", befAddRestaurant, false);
            document.querySelector("#delRestaurant").addEventListener("click", delRestaurant, false);

        }

        openRequest.onerror = function (e) {
            //Do something for the error
        }


    }, false);

    function addRestaurant(e) {
        var name = $("#name").val();
        // 对象 = db.事物（将要处理的数组，事物类型）

        var transaction = db.transaction(["restaurant"], "readwrite");
        //设置存储对象people为为读写操作，然后使用objectStore指定要操作的存储对象，存在变量restaurant
        var restaurantStore = transaction.objectStore("restaurant");

        //设置添加数据
        var restaurant = {
            name: name,
            created: new Date()
        }

        //声明一个普通的javascript对象,使用restaurant的add方法 增加这个对象到对象存储中
        var request = restaurantStore.add(restaurant);

        //增加数据是异步操作，增加两个事件监听
        request.onerror = function (e) {
        }

        request.onsuccess = function (e) {
            getRestaurant(e);
        }
    }

    function befAddRestaurant(e) {
        debugger
        $('#befAddRestaurant').addClass('hide');
        $('.addForm').removeClass('hide');
        $("#name").val('');
    }

    //列表查询
    function getRestaurant(e) {
        if (e.target.value === "0") {
            $('.addForm').addClass('hide');
            $('#befAddRestaurant').removeClass('hide');
        } else if (e.target.value === "1") {
            $('.addTForm').addClass('hide');
            $('#befAddRType').removeClass('hide');
        } else {
            $('.addNForm').addClass('hide');
            $('#befAddName').removeClass('hide');
        }
        var s = "";
        db.transaction(["restaurant"], "readonly").objectStore("restaurant").openCursor().onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                s += cursor.value['name'] + ' ';
                cursor.continue();
            }
            document.querySelector(".menu").innerHTML = s;
        }
    }

    //清空restaurant
    function delRestaurant(e) {
        var transaction = db.transaction(["restaurant"], "readwrite");
        var restaurantStore = transaction.objectStore('restaurant');
        restaurantStore.clear();
        if (document.querySelector("#getRestaurant").checked) {
            $('.addForm,#befAddRestaurant').removeClass('hide');
        } else {
            $('.addForm,#befAddRestaurant').addClass('hide');
        }
        document.querySelector(".menu").innerHTML = '';
    }

    function showNames() {
        if (students.length) {
            clearInterval(t);
            t = setInterval(function () {
                document.getElementById("names").innerHTML = students[i].name;
                i++;
                if (i == students.length) {
                    i = 0;
                }
            }, 30);
        } else {
            alert('请先输入');
        }
    }
})(jQuery);