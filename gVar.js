// Handles all function of data persistence.

// The global variable for all data of each of the user's rooms.
let db = [];
let dn = [];
// If the browser doesn't support storage, turn this to true. Can be turn on manually for testing.
let offline = false;

// Check if the browser supports localStorage.
if (typeof(Storage) !== "undefined") {
	// If so, load the localStorage names and the JSON data for each room. Check if forced offline mode is on first.
	if (!offline) {
		if (localStorage.getItem("dataNames") != null) {
			dn = JSON.parse(localStorage.getItem("dataNames"));
		}
		for (var name of dn) {
			db.push(JSON.parse(localStorage.getItem(name)));
		}
	}
} else {
	// Otherwise, switch to offline mode and notify the user.
	offline = true;
	window.alert("Oops!\nIt looks like your browser version doesn't support localStorage, which we need to save your rooms.\nFeel free to use SquareRooom in temporary mode.");
}

function iSave() {
	if (!offline) {
		localStorage.setItem("dataNames", JSON.stringify(dn));
		for (var room of db) {
			localStorage.setItem(room.n, JSON.stringify(room));
		}
	}
	else console.log("Saving failed because the page is in offline mode.");
}

function checkRoomExists(name) {
	for (var room of dn) {
		if (room == name) {
			return true;
		}
	}
	return false;
}

// Table of colors to use
const colors = {
	Black: "000, 000, 010, Black",
	Red: "000, 080, 080, Red",
	Orange: "030, 080, 080, Orange",
	Yellow: "060, 080, 080, Yellow",
	Lime: "090, 080, 080, Lime",
	Green: "120, 080, 080, Green",
	Eucalyptus: "150, 080, 080, Eucalyptus",
	Cyan: "180, 080, 080, Cyan",
	Sky: "210, 080, 080, Sky",
	Blue: "240, 080, 080, Blue",
	Violet: "270, 080, 080, Violet",
	Pink: "300, 080, 080, Pink",
	Magenta: "330, 080, 080, Magenta",
	White: "000, 000, 090, White"
};
