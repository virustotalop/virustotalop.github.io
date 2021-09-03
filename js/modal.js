class Modal {
		
	constructor(id, title, body) {
		this.id = id;
		this.title = title;
		this.body = body;
	}
	
	create(element) {
		let html = '<div id="' + this.id + '" class="modal" tabindex="-1" role="dialog">' +
		'<div class="modal-dialog" role="document">' +
		'<div class="modal-content">' +
		'<div class="modal-header">' +
		'<h5 class="modal-title">' + this.title + '</h5>' +
		'<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
		'</button>' +
		'</div>' +
		'<div class="modal-body">' +
		'<p>' + this.body + '</p>' +
		'</div>' +
		'<div class="modal-footer">' +
		'<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>';
		
		element.innerHTML = element.innerHTML + html;
	}
}