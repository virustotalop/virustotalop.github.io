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
		$(poundName + "-page")
		.load("page/content/" + name + ".html", page.renderer);
	}
	
	showPage(name) {
		$("#" + name + "-page").show();
	}
	
	hidePage(name) {
		$("#" + name + "-page").hide();
	}	
}