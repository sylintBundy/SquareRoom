// Handles the responsive UI of the homepage, and contains calls to editing page.

pageNumber = 1;
let roomMenu = document.getElementById('roomMenu');

$(function() {
	pageSetup();
	$('#createRoom').on('click', addPrompt);
	$('#tempEditor').on('click', toTempEdit);
})

function pageSetup() {
	iLoad();
	refreshList();
}

function refreshList() {
	clearList();
	if (fullData.dataNames == null || fullData.dataNames.length == 0) {
		var nrText = document.createElement('p');
		nrText.textContent = 'Looks like you have no rooms! Create one with the "+" button above.';
		nrText.setAttribute('id', 'noroom');
		nrText.setAttribute('style', 'text-align:center');
		roomMenu.appendChild(nrText);
	} else {
		for (var room of fullData.dataNames) {
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
	if (target.id == 'editBtn') {
		var roomName = target.parentElement.parentElement.firstElementChild.textContent;
		var parameters = new URLSearchParams();
		parameters.append("editingRoom", roomName);
		location.href = "editpage/index.html?" + parameters.toString();
	}
}

function toTempEdit() {
	location.href = "editpage/index.html";
}

roomMenu.addEventListener('click', function(t) {linkToEdit(t)});
roomMenu.addEventListener('click', function(t) {deletePrompt(t)});
