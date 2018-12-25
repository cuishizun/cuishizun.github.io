<?php 
// include config with database definition
include('config.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<meta name="author" content="Darko Bunic"/>
		<meta name="description" content="Drag and drop table content with JavaScript"/>
		<link rel="stylesheet" href="style.css" type="text/css" media="screen" />
		<script type="text/javascript" src="../drag.js"></script>
		<!-- initialize drag and drop -->
		<script type="text/javascript">
			window.onload = function () {
				// initialization
				REDIPS.drag.init();
				// dragged elements can be placed to the empty cells only (disable more than one element in the same table cell)
				REDIPS.drag.drop_option = 'single';
				// set hover color
				REDIPS.drag.hover_color = '#9BB3DA';
				// don't ask on delete
				REDIPS.drag.trash_ask = false;
				// after element is dropped, print message
				REDIPS.drag.myhandler_dropped = function () {
					var obj         = REDIPS.drag.obj;						// reference to the dragged OBJect
					var obj_old     = REDIPS.drag.obj_old;					// reference to the original object
					var target_cell = REDIPS.drag.target_cell;				// reference to the Target cell
					var target_row  = REDIPS.drag.target_cell.parentNode;	// reference to the Target row
					var marked_cell = REDIPS.drag.marked_cell;				// reference to the meaning (deny/allow) of marked cells
					var mark_cname  = REDIPS.drag.mark_cname;				// reference to the name of marked cells
					var i, obj_new, mark_found, id;							// local variables
					// if checkbox is checked and original element is "clone" type then clone school subject to the week
					if (document.getElementById('week').checked === true && obj_old.className.indexOf('clone') > -1) {
						// loop through table cells
						for (i = 0; i < target_row.cells.length; i++) {
							// skip table cell where DIV element is dropped
							if (target_cell === target_row.cells[i]){
								continue;
							}
							// skip if table cell is not empty
							if (target_row.cells[i].childNodes.length > 0) {
								continue;
							}
							// search for 'mark' class name
							mark_found = target_row.cells[i].className.indexOf(mark_cname) > -1 ? true : false;
							// if current cell is marked and access type is 'deny' or current cell isn't marked and access type is 'allow'
							// then skip this table cell
							if ((mark_found === true && marked_cell === 'deny') || (mark_found === false && marked_cell === 'allow')) {
								continue;
							}
							// clone DIV element
							obj_new = obj.cloneNode(true);
							// set id (first two characters are id of original element)
							id = obj.id.substring(0, 2);
							// set id for cloned element
							obj_new.id = id + 'c' + REDIPS.drag.cloned_id[id];
							// set reference to the DIV container 
							obj_new.redips_container = obj.redips_container;
							// increment cloned_id for cloned element
							REDIPS.drag.cloned_id[id] += 1;
							// set onmousedown event for cloned object
							obj_new.onmousedown = REDIPS.drag.handler_onmousedown;
							// append to the table cell
							target_row.cells[i].appendChild(obj_new);
						}
					}
					// print message only if target and source table cell differ
					if (REDIPS.drag.target_cell !== REDIPS.drag.source_cell) { 
						print_message('Content has been changed (do not forget to save)!');
					}
				}
				// after element is deleted from the timetable, print message
				REDIPS.drag.myhandler_deleted = function () {
					print_message('Content has been deleted (do not forget to save)!');
				}
			}
			// save elements and their positions
			function save() {
				// scan second table (timetable)
				var content = REDIPS.drag.save_content(1);
				window.location.href= 'save.php?' + content;
			}
			// print message
			function print_message (message) {
				document.getElementById('message').innerHTML = message;
			}
				
		</script>
		<title>www.redips.net</title>
	</head>
	<body>
		<center>
			<h1><a href="http://www.redips.net/javascript/drag-and-drop-table-content/">www.redips.net</a></h1>
			<h2>Example 3: School timetable</h2>
		</center>
		<div id="main_container">
			<!-- tables inside this DIV could have draggable content -->
			<div id="drag">
	
				<!-- left container -->
				<div id="left">
					<table id="table1">
						<colgroup>
							<col width="100"/>
						</colgroup>
						<tbody>
							<?php subjects() ?>
							<tr><td class="trash" title="Trash">Trash</td></tr>
						</tbody>
					</table>
				</div><!-- left container -->
				
				<!-- right container -->
				<div id="right">
					<table id="table2">
						<colgroup>
							<col width="50"/>
							<col width="100"/>
							<col width="100"/>
							<col width="100"/>
							<col width="100"/>
							<col width="100"/>
						</colgroup>
						<tbody>
							<tr>
								<!-- if checkbox is checked, clone school subjects to the whole table row  -->
								<td class="mark blank"><input id="week" type="checkbox" title="Apply school subjects to the week"/></td>
								<td class="mark dark">Monday</td>
								<td class="mark dark">Tuesday</td>
								<td class="mark dark">Wednesday</td>
								<td class="mark dark">Thursday</td>
								<td class="mark dark">Friday</td>
							</tr>

							<?php timetable('08:00', 1) ?>
							<?php timetable('09:00', 2) ?>
							<?php timetable('10:00', 3) ?>
							<?php timetable('11:00', 4) ?>
							<?php timetable('12:00', 5) ?>
							<tr>
								<td class="mark dark">13:00</td>
								<td class="mark lunch" colspan="5">Lunch</td>
							</tr>
							<?php timetable('14:00', 7) ?>
							<?php timetable('15:00', 8) ?>
							<?php timetable('16:00', 9) ?>
						</tbody>
					</table>
				</div><!-- right container -->
			</div><!-- drag container -->
			<br/>
			<div id="message">Please drag school subjects to the timetable</div>
			<div class="button_container">
				<input type="button" value="Save" class="button" onclick="save()" title="Save timetable"/>
			</div>
		</div><!-- main container -->
	</body>
</html>