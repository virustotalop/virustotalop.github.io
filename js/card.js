class Card {
	
	constructor(title, icon, description, url)
	{
		this.title = title;
		this.icon = icon;
		this.description = description;
		this.url = url;
	}
	
	render(element)
	{
		var html = '<div class="card github-card">' +
		'<div class="card-body">' + 
		'<h5 class="card-title"><i class="' + this.icon + '"></i> ' + this.title + '</h5>' +
		'<p class="card-text">' + this.description + '</p>' +
		'<a href="' + this.url +'" target="_blank" class="btn btn-primary font"><i class="fab fa-github"></i> View on Github</a>';
		element.innerHTML = element.innerHTML + html;
	}
}