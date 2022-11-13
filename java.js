$(function() {
	adjustHeader();
	$('#newRoom').on('click', addPrompt);
	$('#createRoom').on('click', addPrompt);
})

function adjustHeader() {
	var footer = document.querySelector('footer');
	var difference = 0;
	console.log(footer.offsetTop);
	if (footer.offsetTop < window.innerHeight - 70) {
		difference = footer.offsetTop - window.innerHeight - 70;
	}
	footer.setAttribute('style', 'top:' + difference + 'px');
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
	var databaseRoom = {n: name, e: {}, s: {}};
	db.push(databaseRoom);
	dn.push(name);
	console.log(dn);
	if (!offline) {
		iSave();
	}
	if ($('#roomMenu') != null) {
		refreshList();
	}
}

window.addEventListener("resize", adjustHeader());
