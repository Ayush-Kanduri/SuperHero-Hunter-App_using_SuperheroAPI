//----------------------------------------------------------------
//Favourite Super Hero Page//
//----------------------------------------------------------------
//Variable Declarations//
const result = document.querySelector(".result");
const template = document.querySelector("[data-template]");
const template2 = document.querySelector("[data-empty]");
//----------------------------------------------------------------
//Function: Renders the Card Templates into the Screen//
const renderCards = (name, image) => {
	const superhero = template.content.cloneNode(true).children[0];
	const img = superhero.querySelector("img");
	const superheroName = superhero.querySelector(".card-title");

	img.src = image;
	img.setAttribute("data-image-url", image);
	superheroName.textContent = name;
	superheroName.setAttribute("data-name", name);

	result.appendChild(superhero);
};
//----------------------------------------------------------------
//Function: Fetch Favourite Super Heroes from Local Storage//
const fetchFavouriteSuperHeroes = (() => {
	const favourites = JSON.parse(localStorage.getItem("favourites"));
	const images = JSON.parse(localStorage.getItem("images"));

	result.querySelectorAll("*").forEach((element) => {
		element.remove();
	});

	if ("favourites" in localStorage) {
		if (favourites.length > 0) {
			for (let favourite of favourites) {
				const name = favourite;
				const image = images.filter((image) => image.name === name)[0]
					.image;
				renderCards(name, image);
			}
		}
	}

	if (favourites.length === 0 || !("favourites" in localStorage)) {
		const superhero = template2.content.cloneNode(true).children[0];
		result.appendChild(superhero);
	}

	result.querySelectorAll(".card").forEach((card) => {
		card.addEventListener("click", (event) => {
			const target = event.target;
			let name = "";

			if (target.classList.contains("card-title")) {
				name = target.getAttribute("data-name");
				localStorage.setItem("superhero", name);
				window.location.href = "/superhero-page.html";
			}
			if (target.classList.contains("card-body")) {
				name = target.children[0].getAttribute("data-name");
				localStorage.setItem("superhero", name);
				window.location.href = "/superhero-page.html";
			}
			if (target.classList.contains("card-img-top")) {
				name =
					target.nextElementSibling.children[0].getAttribute("data-name");
				localStorage.setItem("superhero", name);
				window.location.href = "/superhero-page.html";
			}
			if (target.classList.contains("card")) {
				name = target
					.querySelector(".card-title")
					.getAttribute("data-name");
				localStorage.setItem("superhero", name);
				window.location.href = "/superhero-page.html";
			}
			if (target.classList.contains("btn")) {
				event.preventDefault();
				const name =
					target.previousElementSibling.getAttribute("data-name");
				let favourites = JSON.parse(localStorage.getItem("favourites"));
				let images = JSON.parse(localStorage.getItem("images"));
				favourites = favourites.filter((favourite) => favourite !== name);
				images = images.filter((obj) => obj.name !== name);
				localStorage.setItem("favourites", JSON.stringify(favourites));
				localStorage.setItem("images", JSON.stringify(images));
				window.location.reload();
				return;
			}
		});
	});
})();
