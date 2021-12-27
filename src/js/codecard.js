class CodeCard {
    constructor(title, icon, description, url) {
        this.title = title;
        this.icon = icon;
        this.description = description;
        this.url = url.toLowerCase();
        this.parsePlatform(url);
    }
    parsePlatform(url) {
        if (url.startsWith("https://github.com") || url.startsWith("https://www.github.com")) {
            this.platform = "Github";
            this.repoIcon = "fab fa-github";
        }
        else if (url.startsWith("https://gitlab.com") || url.startsWith("https://www.gitlab.com")) {
            this.platform = "Gitlab";
            this.repoIcon = "fab fa-gitlab";
        }
    }
    render(element) {
        var html = '<div class="card code-card">' +
            '<div class="card-body">' +
            '<h5 class="card-title"><i class="' + this.icon + '"></i> ' + this.title + '</h5>' +
            '<p class="card-text">' + this.description + '</p>' +
            '<a href="' + this.url + '" target="_blank" class="btn btn-primary font"><i class="' + this.repoIcon + '"></i> View on ' + this.platform + '</a>';
        element.innerHTML = element.innerHTML + html;
    }
}