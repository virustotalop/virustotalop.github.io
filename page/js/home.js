//Load page
pageRegistrar.register(new Page("home", () => {

	//Get projects element
	var element = document.getElementById('projects');

	//Generate code cards
	new CodeCard('AnonymizingText', 'fas fa-envelope-open-text', 'A project to attempt to remove author attribution.', 'https://github.com/virustotalop/AnonymizingText').render(element);
	new CodeCard('ClassyJava', 'fas fa-book', 'A wip Java programming textbook.', 'https://github.com/virustotalop/classyjava').render(element);
	new CodeCard('Codecard', 'fas fa-code', 'The code cards you see on this website.', 'https://github.com/ravenlab/codecard').render(element);
	new CodeCard('Commander', 'fas fa-terminal', 'A platform agnostic Minecraft command framework.', 'https://github.com/ravenlab/commander').render(element);
	new CodeCard('DynamicGui', 'fas fa-window-maximize', 'A plugin to make writing menus for Minecraft easy.', 'https://www.github.com/ClubObsidian/DynamicGui').render(element);
	new CodeCard('DynamicGuiParser', 'fas fa-project-diagram', 'Next generation parser for DynamicGui using AST.', 'https://github.com/ClubObsidian/DynamicGuiParser').render(element);
	new CodeCard('Hydra', 'fas fa-clone', 'An application server for event-driven programming.', 'https://github.com/ClubObsidian/hydra').render(element);
	new CodeCard('Poseidon', 'fas fa-plug', 'A plugin platform that is to be implemented in Hydra.', 'https://github.com/ClubObsidian/poseidon').render(element);
	new CodeCard('Random.js', 'fas fa-random', 'A port of Java\'s Random class to Javascript.', 'https://github.com/virustotalop/random.js').render(element);
	new CodeCard('Trident', 'fas fa-bolt', 'A fast eventbus that uses bytecode generation.', 'https://github.com/ClubObsidian/trident').render(element);
	new CodeCard('Wrappy', 'fas fa-file', 'A configuration library for yaml, xml, json and hocon.', 'https://github.com/ClubObsidian/wrappy').render(element);	

	//Register home page

	//Set current page to home page
	pageRegistrar.setCurrentPage("home"); 
}));