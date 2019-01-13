(function ($) {
    "use strict";

    var db, menus = [],
        t, i = 0,
        menuId;
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
            if (!thisDB.objectStoreNames.contains("menu_store")) {

                //使用key生成器
                var menu_store = thisDB.createObjectStore("menu_store", {
                    keyPath: "menuId",
                    autoIncrement: true
                });
                //索引
                //os.createIndex(索引名称，列，指定某个列是否是唯一)
                menu_store.createIndex("name", "name", {
                    unique: true
                });
                menu_store.createIndex("count", "count", {
                    unique: false
                });
            }
            if (!thisDB.objectStoreNames.contains("menu_type")) {

                //使用key生成器
                var menu_type = thisDB.createObjectStore("menu_type", {
                    keyPath: "menuId",
                    autoIncrement: true
                });
                //索引
                //os.createIndex(索引名称，列，指定某个列是否是唯一)
                menu_type.createIndex("name", "name", {
                    unique: true
                });
                menu_type.createIndex("count", "count", {
                    unique: false
                });
            }
            if (!thisDB.objectStoreNames.contains("menu_name")) {

                //使用key生成器
                var menu_name = thisDB.createObjectStore("menu_name", {
                    keyPath: "menuId",
                    autoIncrement: true
                });
                //索引
                //os.createIndex(索引名称，列，指定某个列是否是唯一)
                menu_name.createIndex("name", "name", {
                    unique: true
                });
                menu_name.createIndex("count", "count", {
                    unique: false
                });
            }
            if (!thisDB.objectStoreNames.contains("music")) {

                //使用key生成器
                var music = thisDB.createObjectStore("music", {
                    keyPath: "musicId",
                    autoIncrement: true
                });
                //索引
                //os.createIndex(索引名称，列，指定某个列是否是唯一)
                music.createIndex("name", "name", {
                    unique: false
                });
                music.createIndex("singer", "singer", {
                    unique: false
                });

                music.createIndex("time", "time", {
                    unique: false
                });

                music.createIndex("src", "src", {
                    unique: false
                });

                music.createIndex("img", "img", {
                    unique: false
                });

                music.createIndex("lrc", "lrc", {
                    unique: false
                });

                music.createIndex("type", "type", {
                    unique: false
                });
            }
        }

        openRequest.onsuccess = function (e) {

            db = e.target.result;

            //监听事件
            document.querySelector("#showMenu").addEventListener("click", showMenu, false);
            document.querySelector("#stopMenu").addEventListener("click", stopMenu, false);
            document.querySelector("#menu_store").addEventListener("click", getRestaurant, false);
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
        var name = $("#name").val(),
            tableName;
        // 对象 = db.事物（将要处理的数组，事物类型）
        if ($('[name=menu]').filter((index, ret) => ret.checked)[0].value === '0') {
            tableName = 'menu_store';
        } else if ($('[name=menu]').filter((index, ret) => ret.checked)[0].value === '1') {
            tableName = 'menu_type';
        } else {
            tableName = 'menu_name';
        }
        var transaction = db.transaction([tableName], "readwrite");
        //设置存储对象people为为读写操作，然后使用objectStore指定要操作的存储对象，存在变量restaurant
        var restaurantStore = transaction.objectStore(tableName);

        //设置添加数据
        var menu = {
            name,
            count: 0,
            created: moment().format('YYYY-MM-DD HH:mm:ss')
        }

        //声明一个普通的javascript对象,使用restaurant的add方法 增加这个对象到对象存储中
        var request = restaurantStore.add(menu);

        //增加数据是异步操作，增加两个事件监听
        request.onerror = function (e) {
            throw e;
        }

        request.onsuccess = function () {
            menus.push(menu);
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

    function skew() {
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
    //列表查询
    function getRestaurant(e) {
        $('.addForm').addClass('hide');
        $('#befAddRestaurant').removeClass('hide');
        var s = "",
            tableName;
        menus = [];
        if ($('[name=menu]').filter((index, ret) => ret.checked)[0].value === '0') {
            tableName = 'menu_store';
        } else if ($('[name=menu]').filter((index, ret) => ret.checked)[0].value === '1') {
            tableName = 'menu_type';
        } else {
            tableName = 'menu_name';
        }
        db.transaction([tableName], "readonly").objectStore(tableName).openCursor().onsuccess = function (e) {
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
            skew();
        }
    }

    //清空restaurant
    function delRestaurant(e) {
        var transaction = db.transaction(["menu_store"], "readwrite");
        var restaurantStore = transaction.objectStore('menu_store');
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
                $("#chooseCount").html(menus[i].count);
                menuId = menus[i].menuId;
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
        if (t) {
            clearInterval(t);
            t = 0;
            upgradeRestaurant();
        } else {
            alert('请重新点菜');
        }
    }

    //更新
    function upgradeRestaurant(e) {
        var name = $("#chooseName").html(),
            count = parseInt($("#chooseCount").html()) + 1,
            tableName;
        if (name === "") return;
        if ($('[name=menu]').filter((index, ret) => ret.checked)[0].value === '0') {
            tableName = 'menu_store';
        } else if ($('[name=menu]').filter((index, ret) => ret.checked)[0].value === '1') {
            tableName = 'menu_type';
        } else {
            tableName = 'menu_name';
        }
        var transaction = db.transaction([tableName], "readwrite");
        var store = transaction.objectStore(tableName);
        var ret = {
            menuId,
            name,
            count,
            created: moment().format('YYYY-MM-DD HH:mm:ss')
        };
        var request = store.put(ret);

        request.onsuccess = function () {
            getRestaurant();
        };
    }
})(jQuery);