// Utils for blog
class BlogUtils {

	static isPunctuation(ch) {
		return ch == '.' || ch == '!' || ch == '?';
	}
	
	static truncateText(text) {
		let length = 400;
		if(length > text.length) {
			return text;
		}
		for(let i = length; i < text.length; i++) {
			if(isPunctuation(text[i])) {
				length = i + 1;
				break;
			}	
		}
		return text.substring(0, length);
	}
}

// Load page
pageRegistrar.register(new Page("blog", () => {
	const relative = "blog/page/";
	const converter = new showdown.Converter();
	converter.setFlavor('github');
	//Parse blog
	$.getJSON("blog/json/blog.json", (data) => {
		console.log(data);
		$.each(data, (key, value) => {	
			console.log('key: ' + key);
			const postFileName = value.name;
			const postName = postFileName.replace(".md", "");
			const postTime = new Date(parseInt(value.time));
			const localTime = postTime.toLocaleString();
			const buttonId = postName + '-button';
			const contentId = postName + '-content';
			const blogPost = relative + postFileName;
			const postTitle = value.title;
			console.log(postTitle);

			$.get(blogPost, (markdown) => {
				const convertedHTML = converter.makeHtml(markdown);
				const jHtml = $(convertedHTML);
				let html = '<div class="justify-content-center card blog-card" id="';
				html += postName + '"' + '>';
				html += '<div class="card-body">';
				html += '<h1 class="blog-h1 justify-content-center row">' + postTitle + "</h1>";  
				html += '<div id ="' + contentId + '" class="justify-content-center">';
				html += '</div>'
				html += '<div>';
				html += '<p>Posted ' + localTime;
				html += "</div>"
				html += '<button id="' + buttonId;
				html += '" class="btn btn-primary btn-blog-post">Continue Reading</button>';
				html += '</div>';
				html += '</div>';

				const parsedHTML = $(html);

				$('#blog-page').append(html).ready(() => {
					const contentSection = $('#' + contentId);
					jHtml.each((index, element) => {
						for(let i = 2; i < 4; i++) {
							$(element).filter('h' + i).addClass('blog-h' + i);
						}
						$(element).filter(':header').addClass('justify-content-center row')
						$(element).filter('pre').each((index, codeBlock) => {
							hljs.highlightBlock(codeBlock);
						});
						if(index == 0) { //Only append first paragraph
							contentSection.append(element);
						}
					});
				
					/*var firstPara = contentSection.find('p').first();
					var firstParaText = firstPara.contents();
					var truncated = truncateText(firstParaText);
					firstPara.contents(truncated);*/

					$('#' + buttonId).click(() => {
						contentSection.empty();
						contentSection.append(jHtml);
						$('#' + buttonId).hide();
					});
				});
			});
		});
	});
	//Highlight all code blocks
	hljs.highlightAll();
}));