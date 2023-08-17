pageRegistrar.register(new Page("home", () => {
	const element = document.getElementById('open-source-projects');
	const createCard = (projectName, description, url) => {
		new CodeCard(projectName, description, url).render(element);
	};
	const parseDescription = (description) => {
		let built = "";
		description.forEach((value) => {
			built += value + ' ';	
		});
		return built;
	};
	$.getJSON("page/json/code-cards.json", (data) => {
		$.each(data, (key, value) => {
			const description = parseDescription(value['description']);
			const url = value['url'];
			createCard(key, description, url);
		});
	});
}));