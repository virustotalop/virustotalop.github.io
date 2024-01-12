+++
title = "Here Be Dragons"
date = 2024-01-12
[extra]
page_id="here-be-dragons"
+++

:dragon: Here be dragons! We are in uncharted territory... err at least I am! I decided to redo my personal website again because there were a few things I wasn't happy with. The performance of using a lot of JavaScript where things could be built and then deployed led to my decision to start looking into static website generators. I've used a few static website generators before those being: Hugo, Jekyll and MkDocs. I gravitated towards Hugo again but after some trouble getting things on first run working I decided to look for an alternative and I landed on this [blog post by Gitlab.](https://about.gitlab.com/blog/2022/04/18/comparing-static-site-generators/) I had never heard of [Zola](https://www.getzola.org/) before so I decided to look at the documentation and it looked like just what I was looking for. So off I went getting it running in docker.

## So many things to do

I wasn't sure what direction exactly I wanted to go in when I decided to redo my website but I had a few issues issues that I wanted to tackle.

1. Blog performance
2. Code card performance
3. The ability to keep the website a SPA 

## Performance

The blog system and code cards were built using a very similar system. The general idea is that the content is taken from JSON and markdown files in the case of the blog and then the elements were inserting into the dom. The issue with this is that numerous inserts on page load would slow down page loads and in the case of the blog the content inserts into the dom could be quite large.

To try to work against this performance issue the idea was just to compile the content before it is ever served to the user, similar to server side rendering but without the server. So instead of loading in content from JSON and markdown files when the web page is being loaded we just pre-render everything that would be put on the page. Below is an example of before and after how code cards were loaded.

### Before

```javascript
	const element = document.getElementById('open-source-projects');
	const createCard = (projectName, description, url) => {
		new CodeCard(projectName, description, url).render(element);
	};
	const parseDescription = (description) => {
		let built = "";
		description.forEach((value) => {
			built += value + ' ';	
		});
		return built;
	};
	$.getJSON("page/json/code-cards.json", (data) => {
		$.each(data, (key, value) => {
			const description = parseDescription(value['description']);
			const url = value['url'];
			createCard(key, description, url);
		});
	});
```

### After

```html
<div id="open-source-projects" class="card-section justify-content-center row">
	{% block content %}
	{% for page in section.pages %}
	<div class="card code-card">
		<div class="card-body">
			<h4 class="card-title text-center">{{ page.title | safe}}</h4>
			<p class="card-text">{{ page.content | safe}}</p>
		</div>
		<a href="{{ page.extra.url }}" target="_blank" class="btn btn-primary font"> <i class="fab fa-github"></i> View
			on Github </a>
	</div>
	{% endfor %}
	{% endblock content %}
</div>
```

### Results

Well.... I don't have any real performance metrics yet but from the limited testing I have done with Lighthouse metrics the page load for the blog is very fast scoring a 99 as of writing this blog post. I may write a more detailed blog post later but this refactor was done primarily because I could see the writing on the wall for performance. The blog was the most egregious violation of performance, I was able to mostly solve this by making the content truncate but I wasn't happy with the implementation and it felt *hacky* at best. That being said the blog has been redesigned for now to only show the post's title, publication date and a button to read more. This will likely be redone later to restore something similar to the previous solution but built ahead of time.

## SPA (single page application) Framework

I was able to keep my previous SPA framework that I built and use it mostly the same. There were some things that needed to be done like telling pages where to load from since zola puts them in a different location. In the future the SPA framework does need to be cleaned up since I currently have instances like this in the code still.

```javascript
pageRegistrar.register(new Page("blog", () => {}, Location.STATIC));
```

Eventually I will convert all the pages to zola or they may all be by the time this actually gets published to my site. When all the pages are converted I should just then be able to have something like the below.

```javascript
pageRegistrar.register(new Page("blog"));
```

Over time I'm sure I will probably add more properties but I would like to fully remove the JavaScript rendering system I built.

## So Long and Thanks for all the Fish

Well if you actually decided to read this than thank you! I don't think anyone is actually going to read this but putting some of the technical details from things I work on into writing gives me some interesting ideas and allows me to reflect on the work that I've done. *Pssst* hit ↑ ↑ ↓ ↓ ← → ← → B A [Enter]