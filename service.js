const apiUrl = 'http://localhost:3000/';

export function getAllColumns(){
	return fetch(apiUrl+'columns', {
	    method: 'GET',
	    headers: {'Content-Type': 'application/json'}
	}).then(response => response.json())
}

export function getAllCards(){
	return fetch(apiUrl+'cards', {
	    method: 'GET',
	    headers: {'Content-Type': 'application/json'}
	}).then(response => response.json())
}
