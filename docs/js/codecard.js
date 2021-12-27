var codeCardGlobalHeaderSize = 'h5';

class CodeCard {
    constructor(title, icon, description, url, headerSize) {
        this.title = title;
        this.icon = icon;
        this.description = description;
        this.url = url.toLowerCase();
        this.headerSize = headerSize;
        this.parsePlatform(url);
    }
    
    parsePlatform(url) {
        const lowerURL = url.toLowerCase();
        if(lowerURL.includes("github.com")) {
            this.platform = "Github";
            this.repoIcon = "fab fa-github";
        } else if(lowerURL.includes("gitlab.com")) {
            this.platform = "Gitlab";
            this.repoIcon = "fab fa-gitlab";
        }
    }

    render(element) {
        const headerSize = this.headerSize !== null && this.headerSize !== undefined ? this.headerSize : codeCardGlobalHeaderSize;
        var html = ('<div class="card code-card">' +
            '<div class="card-body">' +
            '<hsize class="card-title"><i class="' + this.icon + '"></i> ' + this.title + '</hsize>' +
            '<p class="card-text">' + this.description + '</p>' +
            '<a href="' + this.url + '" target="_blank" class="btn btn-primary font"><i class="' + this.repoIcon + '"></i> View on ' + this.platform + '</a>')
            .replaceAll("hsize", headerSize);
        element.innerHTML = element.innerHTML + html;
    }
}