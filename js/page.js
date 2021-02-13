function getPageFromURL() {
	var loc = "" + window.location;
	var pageIndex = loc.indexOf('#page=');
	if(pageIndex == -1) {
		return null;
	}
	return loc.substring(pageIndex + 6);
}


class Page {
	constructor(name, renderer) {
		this.name = name;
		this.renderer = renderer;
	}
}

class PageRegistrar {
	
	constructor() {
		this.pages = [];
		this.currentPage = null;
		this.registerNavigationHandler();
	}
	
	getCurrentPage() {
		return this.currentPage;
	}

	setCurrentPage(name) {
		if(this.currentPage != null && this.currentPage.name == name) {
			return;
		}
		
		for(var i = 0; i < this.pages.length; i++) {
			var p = this.pages[i];
			if(p.name == name) {
				if(this.currentPage != null) {
					this.hidePage(this.currentPage.name);
				}
				console.log("set current page");
				this.currentPage = p;
				this.updatePage(name);
				break;
			}
		}
	}
	
	register(page) {
		this.pages.push(page);
		var name = page.name;
		var outsideThis = this;
		var poundName = "#" + name;
		$(poundName + "-button").click(() => { //Register current page handler
			outsideThis.setCurrentPage(name);
		});
		var divName = name + "-page";
		$("#pages").append('<div id="' + divName + '" style="display: none;"></div>');
		$("#" + divName)
		.load("page/html/" + name + ".html", page.renderer);
	}
	
	updatePage(name) {
		this.updateURL(name);
		this.updateTitle(name);
		this.showPage(name);
	}

	updateTitle(name) {
		document.title = "Page - " + name;
	}

	updateURL(name) {
		var href = "" + window.location.href;
		href = href.substring(0, href.indexOf("#"));
		var loc = href + "#page=" + name;
		window.location = loc;
	}

	showPage(name) {
		$("#" + name + "-page").show();
	}
	
	hidePage(name) {
		$("#" + name + "-page").hide();
	}	

	registerNavigationHandler() { //Handle forward and back buttons
		$(window).on('popstate', (event) => {
			let pageName = getPageFromURL();
			if(pageName != null) { //navigating to the same page is handled in the setCurrentPage method
				this.setCurrentPage(pageName);
			}
		});
	}
}