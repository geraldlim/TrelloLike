const apiUrl = 'http://localhost:3000/';

export function getAllColumns(){
	return fetch(apiUrl+'columns', {
	    method: 'GET',
	    headers: {'Content-Type': 'application/json'}
	}).then(response => response.json())
}

export function addColumn(column){
	return fetch(apiUrl+'columns', {
	    method: 'POST',
	    headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(column)
	}).then(response => response.json())
}

export function editColumn(column){
	return fetch(apiUrl+'columns/'+column.id, {
	    method: 'PUT',
	    body: JSON.stringify(column),
	    headers: {'Content-Type': 'application/json'},
	}).then(response => response.json())
}

export function deleteColumn(columnId){
	return fetch(apiUrl+'columns/'+columnId, {
	    method: 'DELETE',
	    headers: {'Content-Type': 'application/json'},
	}).then(response => response.json())
}

export function getAllCards(){
	return fetch(apiUrl+'cards', {
	    method: 'GET',
	    headers: {'Content-Type': 'application/json'}
	}).then(response => response.json())
}
