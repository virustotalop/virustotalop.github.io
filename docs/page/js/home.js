pageRegistrar.register(new Page("home", () => {
	const element = document.getElementById('projects');
	const createCard = (projectName, icon, description, url) => {
		new CodeCard(projectName, icon, description, url).render(element);
	};
	const parseDescription = (description) => {
		var built = "";
		description.forEach((value) => {
			built += value + ' ';	
		});
		return built;
	};
	$.getJSON("page/json/code-cards.json", (data) => {
		$.each(data, (key, value) => {
			const icon = value['icon'];
			const description = parseDescription(value['description']);
			const url = value['url'];
			createCard(key, icon, description, url);
		});
	});
}));