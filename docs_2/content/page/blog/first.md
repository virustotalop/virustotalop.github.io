+++
title = "Hello World"
date = 2021-02-14
+++

:rocket: We have lift off! This is the first blog post on my newly redesigned website! I figured what better way to kick off the blog posts besides detailing how the website was built! This website was built primarily using [jquery](https://jquery.com/) for dynamic loading and blog posts are generated using [showdown](https://github.com/showdownjs/showdown). 

## Design Philosophy

The design philosophy for this website has been to try to architect concepts from the ground up as much as possible. While I could have used frameworks such as react or angular to design the website I decided to try to roll my own system instead. The reasons for this being that I don't really like web design but I do like programming and what better to try to enjoy web design besides trying to roll my own system for generating and putting that content on the page. 

## Page Loading

The way the website works from a design standpoint is fairly simple. I have an `index.html` that has the static header and footer that is rendered on every page. Every page is then rendered via their own Javascript file that gets loaded in from the `index.html`. This page loading is done by the `PageRegistrar`

```javascript
class PageRegistrar {
	
	constructor() {
		this.pages = [];
		this.currentPage = null;
		this.registerNavigationHandler();
	}
	register(page) { //When a page is loaded it adds the page to the registrar
		this.pages.push(page); 
		var name = page.name; //Get the name of the page
		var outsideThis = this;
		var poundName = "#" + name;
		$(poundName + "-button").click(() => { //Register page with the menu button
            outsideThis.setCurrentPage(name);
            //When this function is ran the page switch function is performed
		});
    }
}
```

Below is an example of how the home page gets rendered

```javascript
//Load page
pageRegistrar.register(new Page("home", () => {
    //Content goes here
}));
```

When the `register` method gets called the `Page` object for home gets registered as a page. Then when a page is navigated to the page if not already loaded it is then lazily loaded with [jquery](https://jquery.com/).


```javascript
lazyLoadPage(page) {
	if(!page.loaded) { //Perform the check to see if the page is loaded
		var pageName = page.name;
		var divName = pageName + "-page"; //Create page div
		$("#pages").append('<div id="' + divName + '" style="display: none;"></div>');
         $("#" + divName).load("page/html/" + pageName + ".html", page.renderer);
        //Load page via jquery from relavent html file
		page.loaded = true; //Set the page as loaded
	}
}
```

 Even though I had pages that could be dynamically loaded at this point what about those browser navigation buttons? Well as I would learn that was actually pretty easy to implement! Below you can find how I handle forward and back buttons. The gist of is that I use the `popstate` and then extract the page from the url by using a bit of string manipulation.

```javascript
function getPageFromURL() {
	var loc = "" + window.location;
	var pageIndex = loc.indexOf('#page='); //Find index
	if(pageIndex == -1) { //If index is -1 that means the url hasn't been redirected yet
		return null;
	}
	return loc.substring(pageIndex + 6);
}

registerNavigationHandler() { //This handles the navigation buttons
	$(window).on('popstate', (event) => {
		let pageName = getPageFromURL();
		if(pageName != null) {
			this.setCurrentPage(pageName);
		}
	});
}
```

## Building a blog

Building a fully static blog was something I wanted to do but I couldn't find a great way of doing it. I knew of frameworks for fully static websites such as [hugo](https://gohugo.io/) but I didn't want a monolithic framework to build off of. So then I set off with [this issue all the way back in May of 2020](https://github.com/virustotalop/virustotalop.github.io/issues/10). In the end I didn't find a solution directly to my problem but I did manage to hammer my way to a solution when maybe I needed a different tool. In comes [showdown](https://github.com/showdownjs/showdown), [highlightjs](https://github.com/highlightjs/highlight.js/) and [jquery](https://jquery.com/) to the rescue. The blog works by loading a json file that has some metadata about the blog post.

```json
{
	"first": 
	{
		"name": "first-post.md",
		"time": "1610179321635"
	}
}
```

This file has the label for the post, then name of the corresponding file and the time of which the post was created. This data is then loading in via [jquery](https://jquery.com/) 
```javascript
$.getJSON("blog/json/blog.json", (data) => {
    $.each(data, (key, value) => { //Here we parse each post
```

The data from each post is then processed to get the relevant blog post information.
```javascript
var postName = postFileName.replace(".md", "");
var postTime = new Date(parseInt(value.time));
var localTime = postTime.toLocaleString();
```

The blog post is then taken and tranformed with showdown and then formatted.

```javascript
$.get(blogPost, (markdown) => {
    var convertedHTML = converter.makeHtml(markdown);
    //The data is then formatted
    var html = '<div class="justify-content-center row card blog-card" id="';
    html += postName + '"' + '>';
	html += '<div id ="' + contentId + '" class="justify-content-center">';  
	html += convertedHTML;
	html += '</div>'
	html += '<p>Posted ' + localTime + '</p>';
    html += '<button id="' + buttonId;
    html += '" class="btn btn-primary btn-blog-post">Continue Reading</button>';
    html += '</div>';
```

There is probably a better way of doing the html formatting but :man_shrugging:. After the code is formatted the code then gets added to the dom via [jquery](https://jquery.com/) as well as some formatting and changing the display of the post.

```javascript
$('#blog-page').append(html).ready(() => {
    var contentSection = $('#' + contentId);
    contentSection.children().each((index, element) => {
    //Iterate through each child in the blog post
        for(var i = 1; i < 4; i++) {
            $(element).filter('h' + i).addClass('blog-h' + i);
            //Add blog relevant css element to each header 
        }
        //Center each header
        $(element).filter(':header').addClass('justify-content-center row')
        //Highlight each code block with highlight.js
		$(element).filter('pre').each((index, codeBlock) => {
		    hljs.highlightBlock(codeBlock);
        });
        //Hide all elements besides the header and the first paragraph
        if(index > 1) {
            $(element).hide();
        }
        //Handle clicking for the read more button
        $('#' + buttonId).click(() => {
			$("#" + contentId).children().each((i, element) => {
                //Show hidden elements
                $(element).show();
            });
            //Hide button after click
			$('#' + buttonId).hide();
		});
	});
});
```

## Thank you for reading

If you made it this far thank you for reading. Blogging is something I intend on doing in the future because hopefully someone else will find it helpful if they somehow stumble across this as well as it allowing me to reflect on the technical details of different projects. If you want to see anything that I missed or or to try to find any of the **hidden features** you can find the [code here on Github](https://github.com/virustotalop/virustotalop.github.io) I would also like to thank all the people who helped me design or come up with ideas for this website. Check them out, they are all really cool people.

## Credits

Thank you to the all the people who helped with the design of this website.

[@DanHues](https://github.com/DanHues)

[@FelixOBrien](https://github.com/FelixOBrien)

[@haloflooder](https://github.com/haloflooder)

[@lhurt51](https://github.com/lhurt51)

[@magicmq](https://github.com/magicmq)