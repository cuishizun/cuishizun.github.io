// 导出生成json文件
function downloadJson() {
    var tableName = ['menu_store', 'menu_type', 'menu_name', 'music'];
    for (let i = 0; i < tableName.length; i++) {
        db.transaction([tableName[i]], "readonly").objectStore(tableName[i]).getAll().onsuccess = function (e) {
            var alldata = e.target.result;
            if (alldata.length) {
                debugger;
                let blob = new Blob([JSON.stringify(alldata)], {
                    type: ""
                });
                saveAs(blob, `${tableName[i]}.json`);
            }
        }
    }
}

var src, filename;
$('#file').change(function () {
    var oFReader = new FileReader();
    var file = document.getElementById('file').files[0];
    filename = file.name.split('.')[0];
    oFReader.readAsDataURL(file);
    oFReader.onloadend = function (oFRevent) {
        src = oFRevent.target.result;
    }
});

function recoverJson() {
    $.ajax({
        url: src,
        type: 'GET',
        dataType: 'json',
        data: '',
        success: function (data) {
            if (data.length) {
                var transaction = db.transaction([filename], "readwrite");
                //设置存储对象people为为读写操作，然后使用objectStore指定要操作的存储对象，存在变量restaurant
                var restaurantStore = transaction.objectStore(filename), request;

                //设置添加数据
                restaurantStore.clear();
                for (let i = 0; i < data.length; i++) {
                    //声明一个普通的javascript对象,使用restaurant的add方法 增加这个对象到对象存储中
                    request = restaurantStore.add(data[i]);

                    //增加数据是异步操作，增加两个事件监听
                    request.onerror = function (e) {
                        throw e;
                    }

                    request.onsuccess = function () {
                        if (i === data.length - 1) {
                            window.location.reload();
                            alert('恢复成功');
                        }
                    }
                }
            }
        }
    });
}

function clearJson() {
    window.indexedDB.deleteDatabase('self_entertainment');
    window.location.reload();
}