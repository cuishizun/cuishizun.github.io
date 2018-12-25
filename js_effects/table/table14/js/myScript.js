/**
 * author: 至尊小斌
 * email: 1051496078@qq.com
 * 有问题请发邮箱...
 */

var one,two; // 保存两次选中的单元格
var shift = false; // 是否按住shift

/**
* 改变行头索引的背景  1  2  3  4 ...
* @param obj 所属行 tr
* @param row 所包括行数
*/
function changeRowBack(obj, row){
	obj.children('.rownum').css({'background':'#c1e282'});
	if(row > 1){
		changeRowBack(obj.next(), row-1);
	}
}

/**
* 改变列头索引的背景 A  B  C  D ...
* @param obj 所在单元格 td
* @param col 所包括列数
*/
function changeColBack(obj, col){
	obj.css('background','#c1e282');
	if(col > 1){
		changeColBack(obj.next(), col-1);
	}
}

// 清空背景
function clearRowBack(obj, row){
	obj.children('.rownum').css({'background':'none'});
	if(row > 1){
		changeRowBack(obj.next(), row-1);
	}
}

function clearColBack(obj, col){
	obj.css('background','none');
	if(col > 1){
		changeColBack(obj.next(), col-1);
	}
}

/**
* 渲染样式
* @param obj 要渲染的td
*/
function addStyle(obj){
	changeRowBack(obj.parent(), obj.attr('rowspan')==undefined?1:obj.attr('rowspan'));
	changeColBack(obj.parent().parent().children('.thead').children('.'+obj.attr('class').split(' ')[0]), obj.attr('colspan')==undefined?1:obj.attr('colspan'));
	obj.addClass('select_td');
}

// 将字符串转成int数据
function getNum(val){
	return parseInt(val);
}

/**
 * 选择行列边界范围内所有单元格
 * @param tb 所属 table
 * @param minRow 最小行
 * @param minCol 最小列
 * @param maxRow 最大行
 * @param maxCol 最大列
 */
function selectRowCol(tb, minRow, minCol, maxRow, maxCol){
	tb.find('tr').not('.thead').each(function(){
		$(this).find('td').not('.rownum').each(function(){
			var td = $(this);
			// 遍历行列范围内
			if(getNum(td.attr('row')) >= minRow && getNum(td.attr('row')) <= maxRow 
				&& getNum(td.attr('col')) >= minCol && getNum(td.attr('col')) <= maxCol){
				addStyle(td);
				
				// 判断单元格是否跨行列,并验证所跨行列是否超过最大
				if(td.attr('rowspan') != undefined && getNum(td.attr('rowspan')) > 1){
					if((getNum(td.attr('row'))+getNum(td.attr('rowspan'))-1) > maxRow){
						selectRowCol(tb, minRow, minCol, getNum(td.attr('row'))+getNum(td.attr('rowspan'))-1, maxCol);
					}
				}
				if(td.attr('colspan') != undefined && getNum(td.attr('colspan')) > 1){
					if((getNum(td.attr('col'))+getNum(td.attr('colspan'))-1) > maxCol){
						selectRowCol(tb, minRow, minCol, maxRow, getNum(td.attr('col'))+getNum(td.attr('colspan'))-1);
					}
				}
			} else{
				// 遍历跨行的单元格
				if(td.attr('rowspan') != undefined && getNum(td.attr('rowspan')) > 1){
					var row = getNum(td.attr('row'))+getNum(td.attr('rowspan'))-1;
//					alert(td.html());
					// 判断行是否跨入区域内
					if(row >= minRow && row <= maxRow && 
						getNum(td.attr('col')) >= minCol && getNum(td.attr('col')) <= maxCol){
						selectRowCol(tb, getNum(td.attr('row')), minCol, maxRow, maxCol);
					}
				}
				
				// 遍历跨列的单元格
				if(td.attr('colspan') != undefined && getNum(td.attr('colspan')) > 1){
					var col = getNum(td.attr('col'))+getNum(td.attr('colspan'))-1;
					// 判断列是否跨入区域内
					if(col >= minCol && col <= maxCol && 
						getNum(td.attr('row')) >= minRow && getNum(td.attr('row')) <= maxRow){
						selectRowCol(tb, minRow, getNum(td.attr('col')), maxRow, maxCol);
					}
				}
				
				// 同时跨行列
				if(td.attr('rowspan') != undefined && getNum(td.attr('rowspan')) > 1 &&
					td.attr('colspan') != undefined && getNum(td.attr('colspan')) > 1){
					if(row >= minRow && row <= maxRow && col >= minCol && col <= maxCol){
						selectRowCol(tb, getNum(td.attr('row')), getNum(td.attr('col')), maxRow, maxCol);
					}
				}
			}
		})
	})
}

/**
* 选中区域
* @param  first  第一个单元格
* @param  last  第二个单元格
*/
function selectArea(first, last){
	// 获取所在表格
	var tb = first.parent().parent();
	
	// 1. last 在 first 左边
	if(first.attr('row') == last.attr('row') && getNum(first.attr('col')) > getNum(last.attr('col'))){
		// 交换last 与 first
		selectArea(last, first);
		return;
	}
	
	// 2. last 在 first 右边
	if(first.attr('row') == last.attr('row') && getNum(first.attr('col')) < getNum(last.attr('col'))){
		var minRow = getNum(first.attr('row'));
		var minCol = getNum(first.attr('col'));
		var maxRow = getNum(last.attr('row'));
		var maxCol = getNum(last.attr('col'));
		
		tb.find('tr').not('.thead').each(function(){
			var tr = $(this);
			if(getNum(tr.attr('row')) >= minRow && getNum(tr.attr('row')) <= maxRow){
				tr.find('td').not('.rownum').each(function(){
					var td = $(this);
					if(getNum(td.attr('col')) >= minCol && getNum(td.attr('col')) <= maxCol){
						// 判断 first 与 last 之间是否存在跨行单元格
						if(td.attr('rowspan') != undefined && getNum(td.attr('rowspan')) > 1){
							if((getNum(td.attr('row'))+getNum(td.attr('rowspan'))-1) > maxRow){
								maxRow = getNum(td.attr('row'))+getNum(td.attr('rowspan'))-1;
							}
						}
					}
				})
			}
		})
		// 判断 last 是否跨列
		if(last.attr('colspan') != undefined && getNum(last.attr('colspan')) > 1){
			maxCol += (getNum(last.attr('colspan'))-1);
		}
		selectRowCol(tb, minRow, minCol, maxRow, maxCol);
		return;
	}
	
	// 3. last 在 first 之上
	if(first.attr('col') == last.attr('col') && first.attr('row') > last.attr('row')){
		// 交换last 与 first
		selectArea(last, first);
		return;
	}
	
	// 4. last 在 first 之下
	if(getNum(first.attr('col')) == getNum(last.attr('col')) && getNum(first.attr('row')) < getNum(last.attr('row'))){
		var minRow = getNum(first.attr('row'));
		var minCol = getNum(first.attr('col'));
		var maxRow = getNum(last.attr('row'));
		var maxCol = getNum(last.attr('col'));
		
		tb.find('tr').not('.thead').each(function(){
			var tr = $(this);
			if(getNum(tr.attr('row')) >= minRow && getNum(tr.attr('row')) <= maxRow){
				tr.find('td').not('.rownum').each(function(){
					var td = $(this);
					// 判断 first 与 last 之间是否存在跨列单元格
					if(getNum(td.attr('col')) >= minCol && getNum(td.attr('col')) <= maxCol){
						if(td.attr('colspan') != undefined && getNum(td.attr('colspan')) > 1){
							if((getNum(td.attr('col'))+getNum(td.attr('colspan'))-1) > maxCol){
								maxCol = getNum(td.attr('col'))+getNum(td.attr('colspan'))-1;
							}
						}
					}
				})
			}
		})
		// 判断 last 是否跨行
		if(last.attr('rowspan') != undefined && getNum(last.attr('rowspan')) > 1){
			maxRow += (getNum(last.attr('rowspan'))-1);
		}
		selectRowCol(tb, minRow, minCol, maxRow, maxCol);
		return;
	}
	
	// 5. last 在 first 左上
	if(getNum(first.attr('row')) > getNum(last.attr('row')) && getNum(first.attr('col')) > getNum(last.attr('col'))){
		// 交换last 与 first
		selectArea(last, first);
		return;
	}
	
	// 6. last 在 first 右下
	if(getNum(first.attr('row')) < getNum(last.attr('row')) && getNum(first.attr('col')) < getNum(last.attr('col'))){
		var minRow = getNum(first.attr('row'));
		var minCol = getNum(first.attr('col'));
		var maxRow = getNum(last.attr('row'));
		var maxCol = getNum(last.attr('col'));
		
		tb.find('tr').not('.thead').each(function(){
			var tr = $(this);
			if(getNum(tr.attr('row')) >= minRow && getNum(tr.attr('row')) <= maxRow){
				tr.find('td').not('.rownum').each(function(){
					var td = $(this);
					// 判断 first 与 last 之间是否存在跨行列单元格
					if(getNum(td.attr('col')) >= minCol && getNum(td.attr('col')) <= maxCol){
						if(td.attr('colspan') != undefined && getNum(td.attr('colspan')) > 1){
							if((getNum(td.attr('col'))+getNum(td.attr('colspan'))-1) > maxCol){
								maxCol = getNum(td.attr('col'))+getNum(td.attr('colspan'))-1;
							}
						}
						if(td.attr('rowspan') != undefined && getNum(td.attr('rowspan')) > 1){
							if((getNum(td.attr('row'))+getNum(td.attr('rowspan'))-1) > maxRow){
								maxRow = getNum(td.attr('row'))+getNum(td.attr('rowspan'))-1;
							}
						}
					}
				})
			}
		})
		
		selectRowCol(tb, minRow, minCol, maxRow, maxCol);
		return;
	}
	
	// 7. last 在 first 右上
	if(getNum(first.attr('row')) > getNum(last.attr('row')) && getNum(first.attr('col')) < getNum(last.attr('col'))){
		// 交换last 与 first
		selectArea(last, first);
		return;
	}
	
	// 8. last 在 first 左下
	if(getNum(first.attr('row')) < getNum(last.attr('row')) && getNum(first.attr('col')) > getNum(last.attr('col'))){
		var minRow = getNum(first.attr('row'));
		var minCol = getNum(last.attr('col'));
		var maxRow = getNum(last.attr('row'));
		var maxCol = getNum(first.attr('col'));
		
		tb.find('tr').not('.thead').each(function(){
			var tr = $(this);
			if(getNum(tr.attr('row')) >= minRow && getNum(tr.attr('row')) <= maxRow){
				tr.find('td').not('.rownum').each(function(){
					var td = $(this);
					// 判断 first 与 last 之间是否存在跨行列单元格
					if(getNum(td.attr('col')) >= minCol && getNum(td.attr('col')) <= maxCol){
						if(td.attr('colspan') != undefined && getNum(td.attr('colspan')) > 1){
							if((getNum(td.attr('col'))+getNum(td.attr('colspan'))-1) > maxCol){
								maxCol = getNum(td.attr('col'))+getNum(td.attr('colspan'))-1;
							}
						}
						if(td.attr('rowspan') != undefined && getNum(td.attr('rowspan')) > 1){
							if((getNum(td.attr('row'))+getNum(td.attr('rowspan'))-1) > maxRow){
								maxRow = getNum(td.attr('row'))+getNum(td.attr('rowspan'))-1;
							}
						}
					}
				})
			}
		})
		
		selectRowCol(tb, minRow, minCol, maxRow, maxCol);
		return;
	}
}

// 点击单元格
function clickTd(){
	$('#content').find('td').not('.rownum,.colnum').click(function(){
		// 按住shift 点击第2个单元格
		if(one != undefined && one != null){
			if(shift){
				two = $(this);
			} else{
				two = null;
				one = $(this); // 保存点击的第一个单元格
			}
		}else{
			one = $(this); // 保存点击的第一个单元格
			two = null;
		}
		// 清除所有样式
		$('#content').find('td').removeClass('select_td').css({'background':'none'});
		
		// 点击最左上角空白
		if($(this).attr('id') == 'none'){
			one = null;
		}
		
		if(one != undefined && one != null){
			addStyle(one);
		}
		if(two != undefined && two != null){
			// 选取两个单元格之间的单元格
			// 1.获取第一个单元格行列
			var oneRow = one.parent().children('.rownum').html();
			var oneCol = one.parent().parent().children('.thead').children('.'+one.attr('class').split(' ')[0]).html();
			
			// 2.获取第二个单元格行列
			var twoRow = two.parent().children('.rownum').html();
			var twoCol = two.parent().parent().children('.thead').children('.'+two.attr('class').split(' ')[0]).html();
			$('#coordinate').html(oneCol + oneRow + "," + twoCol + twoRow);
			
			selectArea(one, two);
		}
		
		// 渲染选中格子的样式
		$('#content').find('table').find('.select_td').css({'background':'#d1e2ec'});
		
		$('#select').empty();
		// 获取选中区域的单元格
		var tb = one.parent().parent();
		var newTb = $('<table>').attr({'border':1,'cellspacing':0,'cellpadding':0}).appendTo($('#select'));
		
		// 渲染新的表格
		tb.find('.select_td').each(function(){
			var td = $(this);
			var newTd = $('<td>').html(td.html());
			if(td.attr('colspan') != undefined){
				newTd.attr('colspan', td.attr('colspan'));
			}
			if(td.attr('rowspan') != undefined){
				newTd.attr('rowspan', td.attr('rowspan'));
			}
			
			var newTr = newTb.find('tr[row="'+ td.attr('row') +'"]');
			if(newTr.attr('row') == undefined){
				newTb.append($('<tr>').attr('row',td.attr('row')).append(newTd));
			} else{
				newTd.appendTo(newTr);
			}
		})
	})
}

// 鼠标移动到表格触发事件
function hoverTable(){
	$('#content').find('table').hover(function(){
		var tb = $(this);
		// 按住shift
		$(document).keydown(function(event){
			if(event.keyCode == 16 || event.keyCode == '16'){
				tb.css('cursor','crosshair');
				shift = true;
			}
		})
		// 释放shift
		$(document).keyup(function(event){
			if(event.keyCode == 16 || event.keyCode == '16'){
				tb.css('cursor','default');
				shift = false;
			}
		})
	})
}

// 表格数据是一个 json数组, 数组每一项代表一个 excel工作表
// 这个数据可以连接后台解析excel文件拼接成 json 数据
var tbData = [{"sheetNum":1,"sheetName":"hello","maxCol":6,"sheet":[{"rownum":1,"cols":[{"text":"个人信息","colspan":6,"colnum":1,"rowspan":1}]},{"rownum":2,"cols":[{"text":"姓名","colspan":1,"colnum":1,"rowspan":3},{"text":"年龄","colspan":2,"colnum":2,"rowspan":1},{"text":"专业","colspan":3,"colnum":4,"rowspan":1}]},{"rownum":3,"cols":[{"text":"岁","colspan":2,"colnum":2,"rowspan":1},{"text":"软工","colspan":1,"colnum":4,"rowspan":2},{"text":"选修","colspan":2,"colnum":5,"rowspan":1}]},{"rownum":4,"cols":[{"text":"成年","colnum":2},{"text":"未成年","colnum":3},{"text":"计科","colnum":5},{"text":"网络","colnum":6}]},{"rownum":5,"cols":[{"text":"张三","colnum":1},{"text":"21.0","colnum":2},{"text":" ","colnum":3},{"text":"软1","colnum":4},{"text":" ","colnum":5},{"text":"网1","colnum":6}]},{"rownum":6,"cols":[{"text":"李四","colnum":1},{"text":" ","colnum":2},{"text":"17.0","colnum":3},{"text":" ","colnum":4},{"text":"计1","colnum":5},{"text":"网1","colnum":6}]},{"rownum":7,"cols":[{"text":"王五","colnum":1},{"text":" ","colnum":2},{"text":"16.0","colnum":3},{"text":"软2","colnum":4},{"text":" ","colnum":5},{"text":"网2","colnum":6}]},{"rownum":8,"cols":[{"text":"赵六","colnum":1},{"text":"18.0","colnum":2},{"text":" ","colnum":3},{"text":" ","colnum":4},{"text":"计2","colnum":5},{"text":"网2","colnum":6}]}]},
{"sheetNum":2,"sheetName":"two","maxCol":2,"sheet":[{"rownum":1,"cols":[{"text":"aa","colspan":2,"colnum":1,"rowspan":2}]},{"rownum":2,"cols":[]},{"rownum":3,"cols":[{"text":"bb","colnum":1},{"text":"cc","colspan":1,"colnum":2,"rowspan":2}]},{"rownum":4,"cols":[{"text":"dd","colnum":1}]},{"rownum":5,"cols":[{"text":"ee","colspan":2,"colnum":1,"rowspan":1}]}]},
{"sheetNum":3,"sheetName":"test","maxCol":7,"sheet":[{"rownum":1,"cols":[{"text":"A1-F1","colspan":6,"colnum":1,"rowspan":1},{"text":"G1","colnum":7}]},{"rownum":2,"cols":[{"text":"A2-B2","colspan":2,"colnum":1,"rowspan":1},{"text":"C2-C3","colspan":1,"colnum":3,"rowspan":2},{"text":"D2","colnum":4},{"text":"E2-E3","colspan":1,"colnum":5,"rowspan":2},{"text":"F2","colnum":6},{"text":"G2","colnum":7}]},{"rownum":3,"cols":[{"text":"A3","colnum":1},{"text":"B3","colnum":2},{"text":"D3","colnum":4},{"text":"F3-G3","colspan":2,"colnum":6,"rowspan":1}]},{"rownum":4,"cols":[{"text":"A4-C5","colspan":3,"colnum":1,"rowspan":2},{"text":"D4-E4","colspan":2,"colnum":4,"rowspan":1},{"text":"F4-F5","colspan":1,"colnum":6,"rowspan":2},{"text":"G4","colnum":7}]},{"rownum":5,"cols":[{"text":"D5","colnum":4},{"text":"E5","colnum":5},{"text":"G5-G6","colspan":1,"colnum":7,"rowspan":2}]},{"rownum":6,"cols":[{"text":"A6","colnum":1},{"text":"B6-B7","colspan":1,"colnum":2,"rowspan":2},{"text":"C6","colnum":3},{"text":"D6","colnum":4},{"text":"E6-E7","colspan":1,"colnum":5,"rowspan":2},{"text":"F6","colnum":6}]},{"rownum":7,"cols":[{"text":"A7","colnum":1},{"text":"C7-D7","colspan":2,"colnum":3,"rowspan":1},{"text":"F7-G8","colspan":2,"colnum":6,"rowspan":2}]},{"rownum":8,"cols":[{"text":"A8","colnum":1},{"text":"B8","colnum":2},{"text":"C8","colnum":3},{"text":"D8-E8","colspan":2,"colnum":4,"rowspan":1}]}]}
];

function loadExcelTable(){
	$('#nav_box').empty();
	$('#content').empty();

	for(var i=0; i<tbData.length; i++){
		// 创建导航
		var li = $('<li>').appendTo($('#nav_box'));
		// 创建面板
		var tabPane = $('<div>').attr('id','sheet_'+tbData[i].sheetNum).addClass('tab-pane fade').appendTo($('#content'));
		$('<a>').attr({'href':'#sheet_'+tbData[i].sheetNum,'data-toggle':'tab'}).html(tbData[i].sheetName).appendTo(li);
		if(i == 0){
			li.addClass('active');
			tabPane.addClass('in active');
		}
		
		// 填充数据
		var tb = $('<table>').attr({'border':1,'cellspacing':0,'cellpadding':0}).appendTo(tabPane);
		var thead = $('<tr>').addClass('thead').append($('<td>').attr('id','none').html(' ')).appendTo(tb); 
		for(var j=0; j<tbData[i].maxCol; j++){
			$('<td>').addClass('colnum_'+(j+1) + ' colnum').html(String.fromCharCode(j+65)).appendTo(thead);
		}
		
		var sheet = tbData[i].sheet;
		// 渲染一个工作表
		for(var j=0; j<sheet.length; j++){
			var tr = $('<tr>').attr('row',j+1).appendTo(tb);
			var cols = sheet[j].cols;
			$('<td>').addClass('rownum').html(j+1).appendTo(tr);
			for(var k=0; k<cols.length; k++){
				var td = $('<td>').addClass('colnum_'+cols[k].colnum).html(cols[k].text).appendTo(tr);
				// 标记所在行列号
				td.attr({'row':j+1, 'col':cols[k].colnum});
				if(cols[k].colspan != undefined && cols[k].rowspan != undefined){
					td.attr({'rowspan':cols[k].rowspan, 'colspan':cols[k].colspan});
				}
			}
		}
	}
	hoverTable();
	clickTd();
}