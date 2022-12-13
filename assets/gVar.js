// Handles all functions of data persistence, and contains element and color data.

// The global variable for all data of each of the user's rooms.
let fullData = {dataNames: []};
let databaseRooms = [];
let	databaseNames = {e: []};
let pageNumber = null;
let editingPage = null;
let rm = {n: "Default Room", e: [], s: {w: 720, h: 600}};
// If the browser doesn't support storage, turn this to true. Can be turn on manually for testing.
let offline = false;
// GitHub merges the pages into one domain, but can't work with PostMessage API, so systems have to be different.
// Turn this on if the pages share a domain, otherwise turn it off.
let githubMode = true;
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
	["California King-size Bed (72x84in)", 360, 420, "Rectangle"],
	["Common Crib (28x52in)", 140, 260, "Rectangle"],
	["Standard Three-Seat Sofa (84x40in)", 420, 200, "Rectangle"],
	["Loveseat (52x33in)", 260, 165, "Rectangle"],
	["Small Floating Office Desk (48x24in)", 240, 120, "Rectangle"],
	["Medium Floating Office Desk (60x30in)", 300, 150, "Rectangle"],
	["Large Floating Office Desk (72x36in)", 360, 180, "Rectangle"],
	["Common Printer (18x24in)", 90, 120, "Rectangle"],
	["Common Paper Shredder (15x9in)", 75, 45, "Rectangle"],
	["Letter-Size Filing Cabinet (15x29in)", 75, 145, "Rectangle"],
	["Legal-Size Filing Cabinet (18x29in)", 90, 145, "Rectangle"],
	["Lateral Filing Cabinet (30x18in)", 150, 90, "Rectangle"],
	["Small Flat Filing Cabinet (38x26in)", 190, 130, "Rectangle"],
	["Medium Flat Filing Cabinet (44x32in)", 220, 160, "Rectangle"],
	["Large Flat Filing Cabinet (50x38in)", 250, 190, "Rectangle"],
	["Small Drafting Board (48x30in)", 240, 150, "Rectangle"],
	["Medium Drafting Board (60x36in)", 300, 180, "Rectangle"],
	["Large Drafting Board (72x42in)", 360, 210, "Rectangle"]
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
		if (githubMode) {
			window.localStorage.setItem("fullData", JSON.stringify(fullData));
		}
		else {
			var iframe = document.querySelector('iframe');
			iframe.contentWindow.postMessage({action: 'save', key: 'fullData', value: JSON.stringify(fullData)}, '*');
		}
	}
	else console.warn("Saving failed because the page is in offline mode.");
}

function iLoad() {
	if (!offline) {
		if (githubMode) {
			var data = JSON.parse(window.localStorage.getItem("fullData"));
			if (data != null) {
				handleLoad(data);
			}
		}
		else {
			var iframe = document.querySelector('iframe');
			iframe.contentWindow.postMessage({action: 'get', key: 'fullData'}, '*');
		}
	}
	else console.warn("Loading failed because the page is in offline mode.");
}

function handleLoad(data) {
	var names = data.dataNames;
	for (var name of names) {
		fullData.dataNames.push(name);
		fullData[name] = data[name];
		if (name == editingPage) {
			rm = fullData[name];
		}
	}
	if (pageNumber == 1) {
		refreshList();
	}
}

function messageHandler(event) {
	const {action, key, value} = event.data;
	if (action == 'returnData') {
		if (key == 'fullData' && value != null) {
			handleLoad(JSON.parse(value));
		}
	}
}

function addPrompt() {
	var nm = prompt("Enter your room name:", "New Room");
	if (nm != null && nm != "" && !checkRoomExists(nm) && nm != "dataNames" && nm != "selectedRoom") {
		createRoom(nm);
	}
	else if (checkRoomExists(nm)) {
		window.alert("That room already exists.");
	}
	else if (nm == "dataNames") {
		window.alert("dataNames is an internal name that can't be used.");
	}
	else if (nm == "selectedRoom") {
		window.alert("selectedRoom is an internal name that can't be used.");
	}
}

function createRoom(name) {
	fullData.dataNames.push(name);
	fullData[name] = {n: name, e: [], s: {w: 720, h: 600}};
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
	for (var i = 0; i < fullData.dataNames.length; i++) {
		if (fullData.dataNames[i] == name) {
			fullData.dataNames.splice(i, 1);
		}
	}
	delete fullData[name];
	iSave();
	refreshList();
}

function checkRoomExists(name) {
	if (fullData[name] != null) {
		return true;
	}
	return false;
}

window.addEventListener('message', messageHandler, false);
