// Handles all functions of data persistence, and contains element and color data.

// The global variable for all data of each of the user's rooms.
let databaseRooms = [];
let	databaseNames = {e: []};
// If the browser doesn't support storage, turn this to true. Can be turn on manually for testing.
let offline = false;

// Table of elements. sketch.js handles the drawing.
const elements = [
	["Rectangle (12x12in)", 60, 60, "Rectangle"],
	["Ellipse (12x12in)", 60, 60, "Ellipse"],
	["Twin-size Bed (38x75in)", 190, 375, "Rectangle"],
	["Twin-size Bed XL (38x80in)", 190, 400, "Rectangle"],
	["Full-size Bed (54x75in)", 270, 375, "Rectangle"],
	["Full-size Bed XL (54x80in)", 270, 400, "Rectangle"],
	["Queen-size Bed (60x80in)", 300, 400, "Rectangle"],
	["Olympic Queen-size Bed (66x80in)", 330, 400, "Rectangle"],
	["King-size Bed (76x80in)", 380, 400, "Rectangle"],
	["California King-size Bed ()", 360, 420, "Rectangle"],
	["Small Floating Office Desk (48x24in)", 240, 120, "Rectangle"],
	["Medium Floating Office Desk (60x30in)", 300, 150, "Rectangle"],
	["Large Floating Office Desk (72x36in)", 360, 180, "Rectangle"],
	["Paper Shredder (15x9in)", 75, 45, "Rectangle"],
	["Filing Cabinet (15x29in)", 75, 145, "Rectangle"]
	];

// Table of colors to use
const colors = {
	Carbon: [0, 0, 10, "Carbon"],
	Red: [0, 80, 80, "Red"],
	Orange: [30, 80, 80, "Orange"],
	Yellow: [60, 80, 80, "Yellow"],
	Lime: [90, 80, 80, "Lime"],
	Green: [120, 80, 80, "Green"],
	Eucalyptus: [150, 80, 80, "Eucalyptus"],
	Cyan: [180, 80, 80, "Cyan"],
	Sky: [210, 80, 80, "Sky"],
	Blue: [240, 80, 80, "Blue"],
	Violet: [270, 80, 80, "Violet"],
	Pink: [300, 80, 80, "Pink"],
	Magenta: [330, 80, 80, "Magenta"],
	Snow: [0, 0, 90, "Snow"]
};

// Check if the browser supports localStorage.
if (typeof(Storage) == "undefined" && !offline) {
	offline = true;
	window.alert("Oops!\nIt looks like your browser version doesn't support localStorage, which we need to save your rooms.\nFeel free to use SquareRoom in temporary mode.");
}

function iSave() {
	if (!offline) {
		var iframe = document.querySelector('iframe');
		iframe.contentWindow.postMessage({action: 'save', key: 'dataNames', value: JSON.stringify(databaseNames)}, '*');
		if (databaseRooms.length != 0) {
			for (var room of databaseRooms) {
				iframe.contentWindow.postMessage({action: 'save', key: room.n, value: JSON.stringify(room)}, '*');
			}
		}
	}
	else console.error("Saving failed because the page is in offline mode.");
}

function iLoad() {
	if (!offline) {
		var iframe = document.querySelector('iframe');
		iframe.contentWindow.postMessage({action: 'get', key: 'dataNames'}, '*');
	}
	else console.error("Loading failed because the page is in offline mode.");
}

function iDelete(room) {
	if (!offline) {
		var iframe = document.querySelector('iframe');
		iframe.contentWindow.postMessage({action: 'delete', key: room}, '*')
	}
}

function messageHandler(event) {
	const {action, key, value} = event.data;
	if (action == 'returnData') {
		if (key == 'dataNames' && value != null) {
			databaseNames = JSON.parse(value);
			var iframe = document.querySelector('iframe');
			for (var name of databaseNames.e) {
				iframe.contentWindow.postMessage({action: 'get', key: name}, '*');
			}
			if ($('#roomMenu') != null) {
				refreshList();
			}
			else {

			}
		}
		else if (key == 'dataNames' && value == null) {
			// Nothing happens here.
		}
		else {
			databaseRooms.push(value);
		}
	}
}

function addPrompt() {
	var nm = prompt("Enter your room name:", "New Room");
	if (nm != null && nm != "" && !checkRoomExists(nm) && nm != "dataNames") {
		createRoom(nm);
	}
	else if (checkRoomExists(nm)) {
		window.alert("That room already exists.");
	}
	else if (nm == "dataNames") {
		window.alert("dataNames is an internal name that can't be used.");
	}
}

function createRoom(name) {
	databaseNames.e.push(name);
	var databaseRoom = {n: name, e: [], s: {w: 144, h: 120}, editing: false};
	databaseRooms.push(databaseRoom);
	if (!offline) {
		iSave();
	}
	if ($('#roomMenu') != null) {
		refreshList();
	}
}

function deletePrompt(t) {
	var target = t.target;
	if (target.id == 'deleteBtn') {
		var roomName = target.parentElement.parentElement.firstElementChild.textContent;
		if (window.confirm("Do you want to delete room " + roomName + "?")) {
			deleteRoom(roomName);
		}
	}
}

function deleteRoom(name) {
	iDelete(name);
	for (var i = 0; i < databaseNames.e.length; i++) {
		if (databaseNames.e[i] == name) {
			databaseNames.e.splice(i, 1);
		}
	}
	for (var i = 0; i < databaseRooms.length; i++) {
		if (databaseRooms[i].n == name) {
			databaseRooms.splice(i, 1);
		}
	}
	iSave();
	refreshList();
}

function checkRoomExists(name) {
	for (var room of databaseNames.e) {
		if (room == name) {
			return true;
		}
	}
	return false;
}

window.addEventListener('message', messageHandler, false);
