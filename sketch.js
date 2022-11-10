function setup() {
	createCanvas(windowWidth, 800);
	colorMode(HSB, 0, 80, 80);
}

function draw() {
	background(220);
	circle(20, 20, 20);
	square(40, 10, 20);
	triangle(70, 30, 80, 10, 90, 30);
}

function windowResized() {
	resizeCanvas(windowWidth, 800);
}
