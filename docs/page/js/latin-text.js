pageRegistrar.register(new Page("latin-text", () => {
    const unicode = ['\u1d00','\u0299','\u1d04','\u1d05',
    '\u1d07','\uA730','\u0262','\u029c','\u026a','\u1d0a',
    '\u1d0b','\u029f','\u1d0d','\u0274','\u1d0f','\u1d18',
    '\ua7af','\u0280','\u0073','\u1d1b','\u1d1c','\u1d20',
    '\u1d21','\u0078','\u028f','\u1d22'];
    const convertToUnicode = (text) => {
        text = text.toLowerCase();
        let built = "";
        const start = 97;
        const end = 123;
        for (let i = 0; i < text.length; i++) {
            const charValue = text.charCodeAt(i);
            built += charValue < start || charValue > end ? text[i] : unicode[charValue - 97];
        }
        return built;
    }

    $('#convert-button').click(() => {
        let text = $('#convert-content').val()
        let convertedText = convertToUnicode(text);
        $('#converted').val(convertedText)
    });
}));