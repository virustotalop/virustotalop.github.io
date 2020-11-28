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
		console.log(this.pages);
		console.log("name: " + name);
		for(var p in this.pages) {
			if(p.name == name) {
				console.log("name: " + name);
				if(this.currentPage != null) {
					console.log("before hide");
					this.hidePage(this.currentPage.name);
					console.log("Should be hidden");
				}
				console.log("Current page: " + this.currentPage);
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