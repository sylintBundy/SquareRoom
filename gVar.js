// Script responsible for all classes, variables, and functions that are needed between both pages.

// The global variable for all data of each of the user's rooms.
let db;
let offline = true;

// Table of colors to use
const colors = {
	"Black": "0, 0, 10",
	"Red": "0, 80, 80",
	"Orange": "30, 80, 80",
	"Yellow": "60, 80, 80",
	"Lime": "90, 80, 80",
	"Green": "120, 80, 80",
	"Eucalyptus": "150, 80, 80",
	"Cyan": "180, 80, 80",
	"Sky": "210, 80, 80",
	"Blue": "240, 80, 80",
	"Violet": "270, 80, 80",
	"Pink": "300, 80, 80",
	"Magenta": "330, 80, 80",
	"White": "0, 0, 90"
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
