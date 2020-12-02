//Load page
pageRegistrar.register(new Page("blog", () => {
	//Parse blog
	$.getJSON("blog/json/blog.json", function(data) {
		console.log(data);
		const relative = "blog/page/";
		const replaceMap = {
			'<h1': '<div class="justify-content-center row"><h1 class="section-header"',
			'</h1>': '</h1></div>',
			'<p': '<div class="justify-content-center card-body row"><p',
			'</p>': '</div>'
		};
		//https://getbootstrap.com/docs/4.0/components/card/#header-and-footer

		const bindings = Object.keys(replaceMap)
		.map(key => ({
			type: 'output',
			regex: new RegExp(`${key}`, 'g'),
			replace: `${replaceMap[key]}`
		}));

		var converter = new showdown.Converter({extensions:[bindings]});
		converter.setFlavor('github');

		$.each(data, function(key, value) {
			var name = value.name;
			var blogPost = relative + name;
			$.get(blogPost, function(data) {
				var convertedHTML = converter.makeHtml(data);
				var html = '<div class="justify-content-center row blog-card card" id="' + name + '"' + '>';
				html+= convertedHTML;
				html+=  '<a href="#" class="btn btn-primary">Go to post</a>'
				html += '</div>';
				$('#blog-page').append(html);
				console.log(data);
			});
		});
	});
}));