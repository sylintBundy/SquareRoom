// Handles the interactive fields above the canvas

$(function() {
	pageSetup();
	$('.modeSwitch').on('click', changeMode);
})

function pageSetup() {
	refreshOptions();
	document.getElementById('addItem').addEventListener('click', addElement);
	var propertyFields = document.querySelectorAll('.propField');
	for (var field of propertyFields) {
		field.addEventListener('change', changeElement);
	}
}

function refreshOptions() {
	var elementList = document.getElementById('objectMenu');
	var colorList = document.getElementById('colorMenu');
	for (var item of elements) {
		var newItem = document.createElement('option');
		newItem.value = item[0];
		newItem.textContent = item[0];
		elementList.appendChild(newItem);
	}
	for (var color in colors) {
		var newItem = document.createElement('option');
		newItem.value = color;
		newItem.textContent = color;
		colorList.appendChild(newItem);
	}
}

function changeMode(t) {
	if (mode != t.target.value) {
		var buttons = document.querySelectorAll('.modeSwitch');
		for (var button of buttons) {
			button.setAttribute('style', 'border-bottom-style: none');
		}
		if (mode == 0) {
			document.getElementById('addItem').removeEventListener('click', addElement);
			var propertyFields = document.querySelectorAll('.propField');
			for (var field of propertyFields) {
				field.removeEventListener('change', changeElement);
			}
			clickPos.x = -1;
			clickPos.y = -1;
		}
		else if (mode == 1) {
			var propertyFields = document.querySelectorAll('.roomField');
			for (var field of propertyFields) {
				field.removeEventListener('change', reshapeRoom);
			}
		}
		else {
			clickPos.x = -1;
			clickPos.y = -1;
		}
		mode = t.target.value;
		if (mode == 0) {
			document.getElementById('manipMenu').innerHTML = "<label>Add an Object...</label><br><select id='objectMenu'></select><button id='addItem'>Add</button><br><br><div class='editRow'><div id='elName'><label>Object Name</label><br><input id='nameField' class='propField' value='Object Name'></div><div id='colors'><label>Color</label><br><select id='colorMenu' class='propField'></select></div><div><label>Rotation</label><br><input id='rotationField' class='propField' type='number' value=0></div></div><br><br><div class='editRow'><div><label>X Position (in)</label><br><input id='xPosField' class='propField' type='number' value=0></div><div><label>X Scale</label><br><input id='xScaleField' class='propField' type='number' value=1></div><div><label>Y Position (in)</label><br><input id='yPosField' class='propField' type='number' value=0></div><div><label>Y Scale</label><br><input id='yScaleField' class='propField' type='number' value=1></div></div>"
			refreshOptions();
			document.getElementById('elementMode').style = "border-bottom-style: solid";
			document.getElementById('addItem').addEventListener('click', addElement);
			document.getElementById('deleteItem').addEventListener('click', removeElement);
			var propertyFields = document.querySelectorAll('.propField');
			for (var field of propertyFields) {
				field.addEventListener('change', changeElement);
			}
		}
		else if (mode == 1) {
			document.getElementById('manipMenu').innerHTML = "<div class='editRow3'><div id='roomWidth'><label>Room Width (in)</label><br><input id='widthField' class='roomField' type='number'></div><div id='roomDepth'><label>Room Depth (in)</label><br><input id='depthField' class='roomField' type='number'></div><div id='doorWidth'><label>Doorframe Width (in)</label><br><input id='doorField' class='roomField' type='number'></div></div>"
			document.getElementById('widthField').value = rm.s.w / 5;
			document.getElementById('depthField').value = rm.s.h / 5;
			document.getElementById('doorField').value = rm.s.d / 5;
			document.getElementById('roomMode').style = "border-bottom-style: solid";
			var propertyFields = document.querySelectorAll('.roomField');
			for (var field of propertyFields) {
				field.addEventListener('change', reshapeRoom);
			}
			selElement = -1;
		}
		else {
			document.getElementById('manipMenu').innerHTML = "<label>Click on two points in the canvas to measure the length!</label><div id='infoRow'><div id='toolDistance'><b>Measuring Length:</b></div><div id='toolWidth'>Measuring Width:</div><div id='toolHeight'>Measuring Depth:</div></div>";
			document.getElementById('measureMode').style = "border-bottom-style: solid";
		}
	}
}

function addElement() {
	if (document.getElementById('objectMenu').value != null) {
		var newElement = {
			n: document.getElementById('nameField').value,
			s: document.getElementById('objectMenu').value,
			px: document.getElementById('xPosField').value * 5,
			py: document.getElementById('yPosField').value * 5,
			sx: document.getElementById('xScaleField').value,
			sy: document.getElementById('yScaleField').value,
			r: document.getElementById('rotationField').value,
			c: document.getElementById('colorMenu').value
		};
	}
	rm.e.push(newElement);
}

function changeElement() {
	if (selElement != -1) {
		var element = rm.e[selElement];
		element.n = document.getElementById('nameField').value;
		element.px = parseFloat(document.getElementById('xPosField').value) * 5;
		element.py = parseFloat(document.getElementById('yPosField').value) * 5;
		element.sx = parseFloat(document.getElementById('xScaleField').value);
		element.sy = parseFloat(document.getElementById('yScaleField').value);
		element.r = parseFloat(document.getElementById('rotationField').value);
		element.c = document.getElementById('colorMenu').value;
	}
}

function removeElement() {
	rm.e.splice(selElement, 1);
	selElement = -1;
	updateFields(selElement);
}