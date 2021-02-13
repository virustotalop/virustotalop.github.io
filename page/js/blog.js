const relative = "blog/page/";

//Load page
pageRegistrar.register(new Page("blog", () => {
	//Parse blog
	$.getJSON("blog/json/blog.json", (data) => {
		console.log(data);

		$.each(data, (key, value) => {
			

			console.log('key: ' + key);
			var postFileName = value.name;
			var postName = postFileName.replace(".md", "");
			var postTime = new Date(parseInt(value.time));
			var localTime = postTime.toLocaleString();
			var bodyId = postName + '-body';
			var buttonId = postName + '-button';
			var contentId = postName + '-content';
	
			var converter = new showdown.Converter();
			converter.setFlavor('github');

			var blogPost = relative + postFileName;
			$.get(blogPost, (markdown) => {
				var convertedHTML = converter.makeHtml(markdown);
				console.log(convertedHTML);
				var html = '<div class="justify-content-center row card blog-card" id="' + postName + '"' + '>';
				html += '<div id ="' + contentId + '">';  
				html += convertedHTML;
				html += '</div>'
				html += '<p>Posted ' + localTime + '</p>';
				html +=  '<button id="' + buttonId + '" class="btn btn-primary btn-blog-post">Continue Reading</button>'
				html += '</div>';

				$('#blog-page').append(html).ready(() => {
					var contentSection = $('#' + contentId);
					contentSection.children().each((i, element) => {
						$(element).filter('h1').addClass('section-header justify-content-center row');
						if(i > 1) {
							$(element).hide();
						}
					});
					var firstPara = contentSection.find('p').first();
					var firstPrataText = firstPara.text();
					var truncated = truncateText(firstPrataText);
					firstPara.text(truncated);

					$('#' + buttonId).click(() => {
						$("#" + contentId).children().each((i, element) => {
							$(element).show();
							firstPara.text(firstPrataText);
						});
						$('#' + buttonId).hide();
					});
				});
				//https://getbootstrap.com/docs/4.0/components/card/#header-and-footer
			});
		});
	});
}));

function isPunctuation(ch) {
	return ch == '.' || ch == '!' || ch == '?';
}

function truncateText(text) {
	var length = 100;
	if(length >= text.length) {
		length = text.length;
	}
	for(var i = 400; i < text.length; i++) {
		if(isPunctuation(text[i])) {
			length = i + 1;
			break;
		}	
	}
	return text.substring(0, length);
}