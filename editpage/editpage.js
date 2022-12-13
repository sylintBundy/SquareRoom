// Handles the interactive fields above the canvas

pageNumber = 2;

$(function() {
	pageSetup();
	$('.modeSwitch').on('click', changeMode);
	$('#returnMenu').on('click', returnToMenu);
	$('#saveButton').on('click', iSave);
})

function pageSetup() {
	var parameters = new URLSearchParams(window.location.search);
	editingPage = parameters.get("editingRoom");
	if (editingPage == null) {
		offline = true;
	}
	iLoad();
	refreshOptions();
	document.getElementById('addItem').addEventListener('click', addElement);
	document.getElementById('deleteItem').addEventListener('click', removeElement);
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
			document.getElementById('manipMenu').innerHTML = "<div id='topRow'><div id='ojMenu'><label>Add an Object...</label><br><select id='objectMenu'></select></div><div id='addBtn'><br><button id='addItem'>Add</button></div><div id='rmvBtn'><br><button id='deleteItem'>Remove</button></div></div><br><br><div class='editRow'><div id='elName'><label>Object Name</label><br><input id='nameField' class='propField' value='Object Name'></div><div id='colors'><label>Color</label><br><select id='colorMenu' class='propField'></select></div><div><label>Rotation</label><br><input id='rotationField' class='propField' type='number' value=0></div></div><br><br><div class='editRow'><div><label>X Position (in)</label><br><input id='xPosField' class='propField' type='number' value=0></div><div><label>X Size (in)</label><br><input id='xScaleField' class='propField' type='number' value=1></div><div><label>Y Position (in)</label><br><input id='yPosField' class='propField' type='number' value=0></div><div><label>Y Size (in)</label><br><input id='yScaleField' class='propField' type='number' value=1></div></div>";
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
			document.getElementById('manipMenu').innerHTML = "<div class='editRow2'><div id='roomWidth'><label>Room Width (in)</label><br><input id='widthField' class='roomField' type='number'></div><div id='roomDepth'><label>Room Depth (in)</label><br><input id='depthField' class='roomField' type='number'></div></div>";
			document.getElementById('widthField').value = rm.s.w / 5;
			document.getElementById('depthField').value = rm.s.h / 5;
			document.getElementById('roomMode').style = "border-bottom-style: solid";
			var propertyFields = document.querySelectorAll('.roomField');
			for (var field of propertyFields) {
				field.addEventListener('change', reshapeRoom);
			}
			selElement = -1;
		}
		else {
			document.getElementById('manipMenu').innerHTML = "<label>Click on two points in the canvas to measure the length!</label><div id='infoRow'><div id='toolDistance'><b>Measuring Length:</b></div></div>";
			document.getElementById('measureMode').style = "border-bottom-style: solid";
		}
	}
}

function addElement() {
	if (document.getElementById('objectMenu').value != null) {
		var newElementShape = document.getElementById('objectMenu').value;
		var newShapeData;
		for (var element of elements) {
			if (element[0] == newElementShape) {
				newShapeData = element;
				break;
			}
		}
		var newElement = {
			n: document.getElementById('nameField').value,
			s: newShapeData[0],
			px: parseFloat(document.getElementById('xPosField').value) * 5,
			py: parseFloat(document.getElementById('yPosField').value) * 5,
			sx: newShapeData[1],
			sy: newShapeData[2],
			r: parseFloat(document.getElementById('rotationField').value),
			c: document.getElementById('colorMenu').value
		};
		enforceBounds(newElement);
	}
	rm.e.push(newElement);
}

function changeElement() {
	if (selElement != -1) {
		var element = rm.e[selElement];
		element.n = document.getElementById('nameField').value;
		element.px = parseFloat(document.getElementById('xPosField').value) * 5;
		element.py = parseFloat(document.getElementById('yPosField').value) * 5;
		element.sx = parseFloat(document.getElementById('xScaleField').value) * 5;
		element.sy = parseFloat(document.getElementById('yScaleField').value) * 5;
		element.r = parseFloat(document.getElementById('rotationField').value);
		element.c = document.getElementById('colorMenu').value;
	}
}

function removeElement() {
	if (selElement != -1) {
		rm.e.splice(selElement, 1);
		selElement = -1;
		updateFields(selElement);
	}
}

function returnToMenu() {
	iSave();
	location.href = "../index.html";
}
