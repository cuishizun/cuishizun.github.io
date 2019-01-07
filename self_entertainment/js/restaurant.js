(function ($) {
    "use strict";

    var db, menus = [],
        t, i = 0;
    //检测浏览器是否支持 indexedDBOk
    function indexedDBOk() {
        return "indexedDB" in window;
    }

    document.addEventListener("DOMContentLoaded", function () {
        // indexedDB.deleteDatabase('self_entertainment');
        //判断 indexedDBOk 支持 是/否？
        if (!indexedDBOk) return;

        //打开数据库  这个变量其中一个属性是一个已存在的对象存储list,名为objectStoreNames
        var openRequest = indexedDB.open("self_entertainment", 1);

        openRequest.onupgradeneeded = function (e) {

            var thisDB = e.target.result;
            //通过contains方法检车某个对象是否已经存在了，如果不存在则可进行创建
            if (!thisDB.objectStoreNames.contains("restaurant")) {

                //使用key生成器
                var os = thisDB.createObjectStore("restaurant", {
                    autoIncrement: true
                });
                //索引
                //os.createIndex(索引名称，列，指定某个列是否是唯一)
                os.createIndex("name", "name", {
                    unique: true
                });
                os.createIndex("count", "count", {
                    unique: false
                });
            }
        }

        openRequest.onsuccess = function (e) {

            db = e.target.result;

            //监听事件
            document.querySelector("#showMenu").addEventListener("click", showMenu, false);
            document.querySelector("#stopMenu").addEventListener("click", stopMenu, false);
            document.querySelector("#restaurant").addEventListener("click", getRestaurant, false);
            document.querySelector("#menuType").addEventListener("click", getRestaurant, false);
            document.querySelector("#menuName").addEventListener("click", getRestaurant, false);
            document.querySelector("#addRestaurant").addEventListener("click", addRestaurant, false);
            document.querySelector("#cancel").addEventListener("click", cancelAddRestaurant, false);
            document.querySelector("#befAddRestaurant").addEventListener("click", befAddRestaurant, false);
            document.querySelector("#delRestaurant").addEventListener("click", delRestaurant, false);

        }

        openRequest.onerror = function (e) {
            //Do something for the error
        }


    }, false);

    function addRestaurant() {
        var name = $("#name").val();
        // 对象 = db.事物（将要处理的数组，事物类型）

        var transaction = db.transaction(["restaurant"], "readwrite");
        //设置存储对象people为为读写操作，然后使用objectStore指定要操作的存储对象，存在变量restaurant
        var restaurantStore = transaction.objectStore("restaurant");

        //设置添加数据
        var restaurant = {
            name: name,
            count: 0,
            created: new Date()
        }

        //声明一个普通的javascript对象,使用restaurant的add方法 增加这个对象到对象存储中
        var request = restaurantStore.add(restaurant);

        //增加数据是异步操作，增加两个事件监听
        request.onerror = function (e) {
            throw e;
        }

        request.onsuccess = function () {
            menus.push(restaurant);
            getRestaurant();
        }
    }

    function cancelAddRestaurant() {
        $('#befAddRestaurant').removeClass('hide');
        $('.addForm').addClass('hide');
        $("#name").val('');
    }

    function befAddRestaurant() {
        $('#befAddRestaurant').addClass('hide');
        $('.addForm').removeClass('hide');
        $("#name").val('');
    }

    //列表查询
    function getRestaurant() {
        $('.addForm').addClass('hide');
        $('#befAddRestaurant').removeClass('hide');
        var s = "";
        db.transaction(["restaurant"], "readonly").objectStore("restaurant").openCursor().onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                var namestr = '';
                for (var i = 0; i < cursor.value['name'].length; i++) {
                    if (i === cursor.value['name'].length - 1) {
                        namestr += '<span class="last">' + cursor.value['name'][i] + '</span>';
                    } else {
                        namestr += '<span>' + cursor.value['name'][i] + '</span>';
                    }
                }
                s += namestr + '<a class="badge">' + cursor.value['count'] + '</a>&nbsp;';
                menus.push(cursor.value);
                cursor.continue();
            }
            document.querySelector(".skew-title").innerHTML = s;

            /* 折纸效果 */
            $('.skew-title').children('span').hover((function () {
                var $el, n;
                $el = $(this);
                n = $el.index() + 1;
                $el.addClass('flat');
                if (n % 2 === 0) {
                    return $el.prev().addClass('flat');
                } else {
                    if (!$el.hasClass('last')) {
                        return $el.next().addClass('flat');
                    }
                }
            }), function () {
                return $('.flat').removeClass('flat');
            });
        }
    }

    //清空restaurant
    function delRestaurant(e) {
        var transaction = db.transaction(["restaurant"], "readwrite");
        var restaurantStore = transaction.objectStore('restaurant');
        restaurantStore.clear();
        $('#befAddRestaurant').removeClass('hide');
        $('.addForm').addClass('hide');
        $('.skew-title,#name').html();
        menus = [];
        stopMenu();
    }

    function showMenu() {
        if (menus.length) {
            clearInterval(t);
            t = setInterval(function () {
                $("#chooseName").html(menus[i].name);
                $("#chooseNum").html(menus[i].count);
                i++;
                if (i == menus.length) {
                    i = 0;
                }
                if (menus.length === 1) {
                    stopMenu();
                }
            }, 30);
        } else {
            alert('暂无数据');
        }
    }

    function stopMenu() {
        clearInterval(t);
        upgradeRestaurant();
    }

    //更新
    function upgradeRestaurant(e) {
        var name = $("#chooseName").html(),
            count = parseInt($("#chooseNum").text()) + 1;
        if (name === "") return;
        var transaction = db.transaction(["restaurant"], "readwrite");
        var store = transaction.objectStore("restaurant");
        /* var ret = {
            name,
            count,
            created: new Date()
        }; */
        var request = store.get(name);

        request.onsuccess = function (e) {
            // var result = e.target.result;
            var delRequest = store.clear();
            delRequest.onsuccess = function (e) {
                var ret = {
                    name,
                    count,
                    created: new Date()
                };
                // result.count += 1;
                store.add(ret);
                getRestaurant();
            };
        };
    }
})(jQuery);