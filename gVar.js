// Script responsible for all classes, variables, and functions that are needed between both pages.

// The global variable for all data of each of the user's rooms.
let db = [];
let	dn = [];
let offline = false;

// Check if the browser supports localStorage.
if (typeof(Storage) !== "undefined") {
	// If so, load the localStorage names and the JSON data for each room.
} else {
	// Otherwise, switch to offline mode and notify the user.
	offline = true;
	window.alert("Oops!\nIt looks like your browser version doesn't support localStorage, which we need to save your rooms.\nFeel free to use SquareRooom in temporary mode.");
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

class Room {
	constructor(name) {
		this.name = name;
	}
}

class Object {
	constructor(shape, name) {
		this.shape = shape;
		this.name = name;
		this.posx = 0;
		this.posy = 0;
		this.scalex = 1;
		this.scaley = 1;
	}
}
