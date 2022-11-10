pageSetup();

function pageSetup() {
	var colorList = document.getElementById('colorMenu');
	for (var color in colors) {
		var newItem = document.createElement('option');
		newItem.setAttribute('value', color);
		newItem.innerHTML = color;
		colorList.appendChild(newItem);
	}
}
