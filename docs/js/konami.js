//↑↑↓↓←→←→BA 
const code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let currentIndex = -1;
$(document).keydown((event) => {
    const which = event.which;
    if(which == code[currentIndex + 1]) {
        currentIndex += 1;
    } else {
        currentIndex = -1;
    }

    if(currentIndex == (code.length - 1)) {
        console.log('You win!');
        currentIndex = -1;
        document.getElementById('konami').play();
    } 
});