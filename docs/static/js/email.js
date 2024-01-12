function email() {
    const emailAnchor = document.getElementById('email-anchor');
    if(emailAnchor.href.endsWith("#")) {
        let email = "virus";
        email += "total";
        email += "op";
        const hostName = "gmail.com"
        emailAnchor.href = "mailto:" + email + "@" + hostName;
    }
    emailAnchor.click();
}