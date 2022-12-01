// Sets up and continuously draws the canvas, and handles all click events.

function setup() {
	var space = rm.s;
	var cnv = createCanvas(space.w, space.h);
	cnv.mousePressed(handleClick);
	cnv.mouseReleased(stopDragging);
	colorMode(HSB, 360, 100, 100, 100);
	frameRate(30);
	rectMode(CENTER);
	ellipseMode(CENTER);
	angleMode(DEGREES);
}

function draw() {
	background(0, 0, 80);
	var elementList = rm.e;
	for (var i = 0; i < elementList.length; i++) {
		var element = elementList[i];
		var shapeType;
		var shapeWidth;
		var shapeDepth;
		push();
		noStroke();
		translate(element.px, element.py);
		rotate(element.r);
		var color = colors[element.c];
		fill(color[0], color[1], color[2], 80);
		for (var shape of elements) {
			if (shape[0] == element.s) {
				shapeType = shape[3];
				shapeWidth = shape[1];
				shapeDepth = shape[2];
			}
		}
		if (shapeType == "Rectangle") {
			rect(0, 0, element.sx * shapeWidth, element.sy * shapeDepth);
		}
		else if (shapeType == "Ellipse") {
			ellipse(0, 0, element.sx * shapeWidth, element.sy * shapeDepth);
		}
		pop();
		// If the element is selected, create a highlighter box and measuring text
		if (i == selElement) {
			push();
			noFill();
			translate(element.px, element.py);
			rotate(element.r);
			strokeWeight(5);
			rect(0,0, element.sx * shapeWidth, element.sy * shapeDepth);
			pop();
		}
	}
	if (mode == 2 && clickPos.x != -1 && clickPos.y != -1) {
		push();
		noStroke();
		fill(0, 0, 10, 100);
		ellipse(clickPos.x, clickPos.y, 15, 15);
		ellipse(mouseX, mouseY, 15, 15);
		pop();
		push();
		strokeWeight(5);
		noFill();
		line(clickPos.x, clickPos.y, mouseX, mouseY);
		var dist = Math.sqrt(Math.pow(Math.abs(mouseX - clickPos.x), 2) + Math.pow(Math.abs(mouseY - clickPos.y), 2)) / 5;
		dist = dist.toFixed(2);
		document.getElementById('toolDistance').innerHTML = "<b>Measuring Length:</b> " + dist + "in";
		document.getElementById('toolWidth').innerHTML = "Measuring Width: " + abs(mouseX - clickPos.x) / 5 + "in";
		document.getElementById('toolHeight').innerHTML = "Measuring Depth: " + abs(mouseY - clickPos.y) / 5 + "in";
	}
}

function handleClick() {
	if (mode == 0) {
		clickPos.x = mouseX;
		clickPos.y = mouseY;
		for (var i = 0; i < rm.e.length; i++) {
			if (checkPosition(rm.e[i], mouseX, mouseY)) {
				if (selElement == i) {
					dragging = true;
				}
				selElement = i;
				updateFields(selElement);
				break;
			}
			if (i == rm.e.length - 1) {
				if (mouseY >= 0) {
					selElement = -1;
					updateFields(selElement);
				}
			}
		}
	}
	else if (mode == 2 && mouseX >= 0 && mouseX <= rm.s.w && mouseY >= 0 && mouseY <= rm.s.h) {
		clickPos.x = mouseX;
		clickPos.y = mouseY;
	}
}

function stopDragging() {
	dragging = false;
}

// Allows the user to drag around elements
function mouseDragged() {
	if (dragging) {
		var diffX = mouseX - clickPos.x;
		var diffY = mouseY - clickPos.y;
		var element = rm.e[selElement];
		element.px += diffX;
		element.py += diffY;
		enforceBounds(element);
		updateFields(selElement);
		clickPos.x = mouseX;
		clickPos.y = mouseY;
	}
}

function reshapeRoom() {
	rm.s.w = parseFloat(document.getElementById('widthField').value) * 5;
	rm.s.h = parseFloat(document.getElementById('depthField').value) * 5;
	rm.s.d = parseFloat(document.getElementById('doorField').value) * 5;
	resizeCanvas(rm.s.w, rm.s.h);
	for (var element of rm.e) {
		enforceBounds(element);
	}
}