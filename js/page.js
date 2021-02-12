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
				this.currentPage = p;
				this.showPage(name);
				var href = "" + window.location.href;
				href = href.substring(0, href.indexOf("#"));
				var loc = href + "#page=" + name;
				window.location = loc;
				break;
			}
		}
	}
	
	register(page) {
		this.pages.push(page);
		var name = page.name;
		var outsideThis = this;
		var poundName = "#" + name;
		$(poundName + "-button").click(() => {
			outsideThis.setCurrentPage(name);
		});
		var divName = name + "-page";
		$("#pages").append('<div id="' + divName + '" style="display: none;"></div>');
		$("#" + divName)
		.load("page/html/" + name + ".html", page.renderer);
	}
	
	showPage(name) {
		$("#" + name + "-page").show();
	}
	
	hidePage(name) {
		$("#" + name + "-page").hide();
	}	
}