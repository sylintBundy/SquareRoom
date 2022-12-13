// Handles the saving and retrieval of localStorage, so as to persist it between the two domains.

function messageHandler(event) {
	const {action, key, value} = event.data;
	if (action == 'save') {
		window.localStorage.setItem(key, JSON.stringify(value));
	}
	else if (action == 'get') {
		if (window.localStorage.getItem(key) != null) {
			event.source.postMessage({action: 'returnData', key: key, value: JSON.parse(window.localStorage.getItem(key))}, '*');
		}
		else event.source.postMessage({action: 'returnData', key: key, value: null}, '*');
	}
	else console.error(action + " is not a valid action to iframe.");
}

window.addEventListener("message", messageHandler, false);
