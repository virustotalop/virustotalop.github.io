pageRegistrar.register(new Page("base64-encode", () => {
    $('#encode-button').click(() => {
        let text = $('#encode-content').val()
        let encodedText = btoa(text)
        $('#encoded').val(encodedText)
    });
}, Location.DYNAMIC));