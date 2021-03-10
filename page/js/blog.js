//Load page
pageRegistrar.register(new Page("blog", () => {
	const relative = "blog/page/";
	const converter = new showdown.Converter();
	converter.setFlavor('github');
	//Parse blog
	$.getJSON("blog/json/blog.json", (data) => {
		console.log(data);
		$.each(data, (key, value) => {	
			console.log('key: ' + key);
			var postFileName = value.name;
			var postName = postFileName.replace(".md", "");
			var postTime = new Date(parseInt(value.time));
			var localTime = postTime.toLocaleString();
			var buttonId = postName + '-button';
			var contentId = postName + '-content';
			var blogPost = relative + postFileName;

			$.get(blogPost, (markdown) => {
				var convertedHTML = converter.makeHtml(markdown);
				console.log('converted html: ' + convertedHTML);
				var html = '<div class="justify-content-center card blog-card" id="';
				html += postName + '"' + '>';
				html += '<div class="card-body">';
				html += '<div id ="' + contentId + '" class="justify-content-center">';  
				html += convertedHTML;
				html += '</div>'
				html += '<div>';
				html += '<p>Posted ' + localTime;
				html += "</div>"
				html += '<button id="' + buttonId;
				html += '" class="btn btn-primary btn-blog-post">Continue Reading</button>';
				html += '</div>';
				html += '</div>';

				var parsedHTML = $(html);
				parsedHTML.hide();

				$('#blog-page').append(parsedHTML).ready(() => {
					var contentSection = $('#' + contentId);
					contentSection.children().each((index, element) => {
						for(var i = 1; i < 4; i++) {
							$(element).filter('h' + i).addClass('blog-h' + i);
						}
						$(element).filter(':header').addClass('justify-content-center row')
						$(element).filter('pre').each((index, codeBlock) => {
							hljs.highlightBlock(codeBlock);
							console.log('code block');
						});

						if(index > 1) {
							$(element).hide();
						}
					});

					/*var firstPara = contentSection.find('p').first();
					var firstParaText = firstPara.contents();
					var truncated = truncateText(firstParaText);
					firstPara.contents(truncated);*/

					$('#' + buttonId).click(() => {
						$("#" + contentId).children().each((i, element) => {
							$(element).show();
							//firstPara.contents(firstParaText);
						});
						$('#' + buttonId).hide();
					});
					$("#" + postName).show();
				});
			});
		});
	});
	//Highlight all code blocks
	hljs.highlightAll();
}));

function isPunctuation(ch) {
	return ch == '.' || ch == '!' || ch == '?';
}

function truncateText(text) {
	var length = 400;
	if(length > text.length) {
		return text;
	}
	for(var i = length; i < text.length; i++) {
		if(isPunctuation(text[i])) {
			length = i + 1;
			break;
		}	
	}
	return text.substring(0, length);
}