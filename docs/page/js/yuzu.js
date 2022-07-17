pageRegistrar.register(new Page("yuzu", () => {
    const table = document.getElementById('games-table');
    const compatMap = {
        '0': 'Perfect',
        '1': 'Great',
        '2': 'Okay',
        '3': 'Bad',
        '4': 'Intro/Menu',
        '5': 'Won\'t Boot'
    }
    const gameMap = {

    }
    //Populate game map with compat
    Object.entries(compatMap).forEach(key => {
        gameMap[key[0]] = []
    })
    $.ajax({
        url: "https://yuzu-emu.org/game/",
        content: document.body
    }).done((data) => {
        const html = $.parseHTML(data);
        $('tr', html).each((index, value) => {
            console.log(value)
            let children = value.children
            if (children.length === 3) {
                let titleDataset = children[0].dataset
                let title = titleDataset.title
                let compatDataset = children[1].dataset
                let compat = compatDataset.compatibility
                if (title !== undefined) {
                    let compatArray = gameMap[compat]
                    if (compatArray !== undefined) {
                        compatArray.push(title)
                    }
                }
            }
        })
        Object.entries(gameMap).forEach(key => {
            let compatNum = key[0]
            let games = key[1]
            games.sort()
            console.log(games)
            let compat = compatMap[compatNum]
            for (let i = 0; i < games.length; i++) {
                let title = games[i]
                console.log(compat)
                $('<tr><td>' + title + '</td><td>' + compat + '</td></tr>').appendTo('#games-table')
            }
        })
    })
}));