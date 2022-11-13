let roomMenu = document.getElementById('roomMenu');

$(function() {
	pageSetup();
})

function pageSetup() {
	refreshList();
}

function refreshList() {
	clearList();
	if (dn == null || dn.length == 0) {
		var nrText = document.createElement('p');
		nrText.textContent = 'Looks like you have no rooms! Create one with the "+" button above.';
		nrText.setAttribute('id', 'noroom');
		nrText.setAttribute('style', 'text-align:center');
		roomMenu.appendChild(nrText);
	} else {
		for (var room of dn) {
			var roomBox = document.createElement('div');
			roomBox.setAttribute('class', 'listedRoom');
			var nameLabel = document.createElement('label');
			nameLabel.setAttribute('id', 'rmName');
			nameLabel.textContent = room;
			roomBox.appendChild(nameLabel);
			var buttons = document.createElement('div');
			buttons.setAttribute('id', 'buttons');
			roomBox.appendChild(buttons);
			var editButton = document.createElement('img');
			editButton.setAttribute('id', 'editBtn');
			editButton.setAttribute('src', 'assets/edit.png');
			editButton.setAttribute('width', '50px');
			editButton.setAttribute('height', '50px');
			buttons.appendChild(editButton);
			var deleteButton = document.createElement('img');
			deleteButton.setAttribute('id', 'deleteBtn');
			deleteButton.setAttribute('src', 'assets/delete.png');
			deleteButton.setAttribute('width', '50px');
			deleteButton.setAttribute('height', '50px');
			buttons.appendChild(deleteButton);
			roomMenu.appendChild(roomBox);
		}
	}
}

function clearList() {
	var nrText = document.getElementById('noroom');
	if (nrText != null) {
		nrText.remove();
	}
	var roomList = document.querySelectorAll('.listedRoom');
	for (var room of roomList) {
		room.innerHTML = '';
		room.remove();
	}
}

function linkToEdit(t) {
	var target = t.target;
	if (target.getAttribute('id') == 'editBtn') {
		var roomName = target.parentElement.parentElement.firstElementChild.textContent;
	}
}

function deletePrompt(t) {
	var target = t.target;
	if (target.getAttribute('id') == 'deleteBtn') {
		var roomName = target.parentElement.parentElement.firstElementChild.textContent;
		if (window.confirm("Do you want to delete room " + roomName + "?")) {
			deleteRoom(roomName);
		}
	}
}

function deleteRoom(name) {
	for (var i = 0; i < dn.length; i++) {
		if (dn[i] == name) {
			dn.splice(i, 1);
		}
	}
	for (var i = 0; i < db.length; i++) {
		if (db[i].n == name) {
			db.splice(i, 1);
		}
	}
	iSave();
	refreshList();
}

roomMenu.addEventListener('click', function(t) {linkToEdit(t)});
roomMenu.addEventListener('click', function(t) {deletePrompt(t)});