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