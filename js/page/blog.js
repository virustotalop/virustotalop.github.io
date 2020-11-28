//Parse blog
$.getJSON("blog/json/blog.json", function(data) {
	console.log(data);
	const relative = "blog/page/";
	const replaceMap = {
		'<h1': '<div class="justify-content-center row"><h1 class="section-header"',
		'</h1>': '</h1></div>',
		'<p': '<div class="justify-content-center row"><p',
		'</p>': '</div>'
	};

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
			var html = '<div id="' + name + '"' + '>' + converter.makeHtml(data) + '</div>';
			$('#blog-page').append(html)
			console.log(html);
		});
	});
});

//Register blog page
pageRegistrar.register(new Page("blog"));