// Contains methods and fields that are needed by both sketch.js and editpage.js.
// The current room that can be edited.
let rm = {};
let sampleJSON = {
	n: "Testing Room",
	e: [
		{n: "Square", s: "Rectangle (12x12in)", px: 120, py: 70, sx: 1, sy: 1, r: 0, c: "Red"}, 
		{n: "Rectangle", s: "Rectangle (12x12in)", px: 120, py: 180, sx: 2, sy: 1, r: 0, c: "Lime"},
		{n: "Circle", s: "Ellipse (12x12in)", px: 120, py: 290, sx: 1, sy: 1, r: 0, c: "Sky"},
		{n: "Ellipse", s: "Ellipse (12x12in)", px: 120, py: 400, sx: 2, sy: 1, r: 0, c: "Violet"}
	],
	s: {w: 720, h: 600, d: 180}
};
let selElement = -1;
// The editing mode
let mode = 0;
// Used for dragging elements
let dragging = false;
let clickPos = {x: -1, y: -1};

if (offline) {
	rm = sampleJSON;
}

function checkPosition(el, mx, my) {
	var shapeX;
	var shapeY;
	// Find the matching dimension data
	for (var element of elements) {
		if (element[0] == el.s) {
			shapeX = element[1];
			shapeY = element[2];
			break;
		}
	}
	// Determine if the cursor is in the element's hitbox
	var minX = el.px - (el.sx * shapeX / 2);
	var maxX = el.px + (el.sx * shapeX / 2);
	var minY = el.py - (el.sy * shapeY / 2);
	var maxY = el.py + (el.sy * shapeY / 2);
	if (mx >= minX && mx <= maxX && my >= minY && my <= maxY) {
		return true;
	}
	return false;
}

function enforceBounds(element) {
	if (element.px < 0) {
		element.px = 0;
	}
	else if (element.px > rm.s.w) {
		element.px = rm.s.w;
	}
	if (element.py < 0) {
		element.py = 0;
	}
	else if (element.py > rm.s.h) {
		element.py = rm.s.h;
	}
}

function updateFields(idx) {
	var element;
	if (idx != -1) {
		element = rm.e[idx];
	}
	else {
		element = {n: "New Object", s: "Rectangle", px: 0, py: 0, sx: 1, sy: 1, r: 0, c: "Carbon"};
	}
	document.getElementById('nameField').value = element.n;
	document.getElementById('colorMenu').value = element.c;
	document.getElementById('rotationField').value = element.r;
	document.getElementById('xPosField').value = element.px / 5;
	document.getElementById('xScaleField').value = element.sx;
	document.getElementById('yPosField').value = element.py / 5;
	document.getElementById('yScaleField').value = element.sy;
}