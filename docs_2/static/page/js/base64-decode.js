pageRegistrar.register(new Page("base64-decode", () => {
    $('#decode-button').click(() => {
        let text = $('#decode-content').val()
        let decodedText = atob(text)
        $('#decoded').val(decodedText)
    });
}, Location.DYNAMIC));