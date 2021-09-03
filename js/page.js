class Page {
	constructor(name, renderer) {
		this.name = name;
		this.renderer = renderer;
		this.loaded = false;
	}

	static fromURL() {
		var loc = "" + window.location;
		var pageIndex = loc.lastIndexOf('#page=');
		if(pageIndex == -1) {
			return null;
		}
		return loc.substring(pageIndex + 6);
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
			return false;
		}
		
		for(var i = 0; i < this.pages.length; i++) {
			var page = this.pages[i];
			if(page.name == name) {
				this.lazyLoadPage(page);
				if(this.currentPage != null) {
					this.hidePage(this.currentPage.name);
				}
				console.log("set current page");
				this.currentPage = page;
				this.updatePage(name);
				return true;
			}
		}
		return false;
	}
	
	register(page) {
		this.pages.push(page);
		var name = page.name;
		var outsideThis = this;
		var poundName = "#" + name;
		$(poundName + "-button").click(() => { //Register current page handler
			outsideThis.setCurrentPage(name);
		});
	}
	
	updatePage(name) {
		this.updateURL(name);
		this.updateTitle(name);
		this.showPage(name);
	}

	updateTitle(name) {
		document.title = name.charAt(0).toUpperCase() + name.substring(1) + " - virustotalop";
	}

	updateURL(name) {
		var href = "" + window.location.href;
		href = href.substring(0, href.lastIndexOf("#"));
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
			let pageName = Page.fromURL();
			if(pageName != null) { //navigating to the same page is handled in the setCurrentPage method
				this.setCurrentPage(pageName);
			}
		});
	}

	lazyLoadPage(page) {
		if(!page.loaded) {
			var pageName = page.name;
			var divName = pageName + "-page";
			$("#pages").append('<div id="' + divName + '" style="display: none;"></div>');
			$("#" + divName).load("page/html/" + pageName + ".html", page.renderer);
			page.loaded = true;
		}
	}
}