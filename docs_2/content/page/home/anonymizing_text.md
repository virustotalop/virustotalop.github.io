+++
title = "Anonymizing Text"
sort_by = "title"
[extra]
url = "https://github.com/virustotalop/anonymizingtext"
+++

A project that attempts to remove author attribution by indentifying stylometry methods in written works. Written as my capstone project at California State University Monterey Bay. Implemented as a browser plugin using [compromise](https://github.com/spencermountain/compromise) for natural language processing. Testing was implemented using: [selenium](https://github.com/SeleniumHQ/selenium) for browser automation, [flask](https://github.com/pallets/flask) for serving a test website, [praw](https://github.com/praw-dev/praw) for scrapping reddit for test data and [PyAutoGUI](https://github.com/asweigart/pyautogui) for interacting with the browser's UI. Data was then analyzed using [textblob](https://github.com/sloria/TextBlob). 