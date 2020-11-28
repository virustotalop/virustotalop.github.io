class Page {
	constructor(name) {
		this.name = name;
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
		$("#" + name + "-button").click(() => {
			outsideThis.setCurrentPage(name);
		});
	}
	
	showPage(name) {
		$("#" + name + "-page").show();
	}
	
	hidePage(name) {
		$("#" + name + "-page").hide();
	}	
}