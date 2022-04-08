//----------------------------------------------------------------
//Super Hero Display Page//
//----------------------------------------------------------------
//Variable Declarations//
const searchResultTitle = document.querySelector("#search-result-title");
const searchResult = document.querySelector("#search-result");
const template1 = document.querySelector("[data-superhero-template]");
const template2 = document.querySelector("[data-nothing-template]");
const template3 = document.querySelector("[data-superheroes-template]");
//----------------------------------------------------------------
//Function: To perform multiple Tasks & Actions//
const actions = (() => {
	//Sets the Search Result Title
	searchResultTitle.textContent = `Search Results for '${localStorage.getItem(
		"superhero"
	)}'`;
})();
//----------------------------------------------------------------
//Function: Fetches the Searched Superhero//
const fetchSearchedHero = (async () => {
	try {
		const value = localStorage.getItem("superhero").toLowerCase();
		const url = `https://superheroapi.com/api/125001886776752/search/${value}`;
		const response = await fetch(url);
		const data = await response.json();

		searchResult.querySelectorAll("*").forEach((child) => child.remove());

		if (data.response === "error") {
			console.log("Error: " + data.error);
			const superhero = template2.content.cloneNode(true).children[0];
			searchResult.appendChild(superhero);
			return;
		}

		const superheroList = data.results;
		console.log(superheroList);

		if (
			superheroList.length === 0 ||
			superheroList === undefined ||
			superheroList === null ||
			superheroList === "null" ||
			superheroList === "undefined"
		) {
			const superhero = template2.content.cloneNode(true).children[0];
			searchResult.appendChild(superhero);
			return;
		}

		if (superheroList.length === 1) {
			const superhero = template1.content.cloneNode(true).children[0];
			const name = superhero.querySelector("#name");
			const image = superhero.querySelector("#image img");
			const progressBar = superhero.querySelectorAll(".progress-bar");
			const sections = superhero.querySelectorAll("section");
			let i = 0;

			name.textContent = superheroList[0].name;
			image.src = superheroList[0].image.url;
			for (let key in superheroList[0].powerstats) {
				const val = superheroList[0].powerstats[key];
				progressBar[i].style.width = `${val}%`;
				progressBar[i].setAttribute("aria-valuenow", `${val}`);
				progressBar[i].textContent = `${val}%`;
				progressBar[i].parentElement.previousElementSibling.textContent =
					key.toLowerCase();
				i++;
			}

			for (let k = 1; k < 5; k++) {
				for (let j = 1; j < sections[k].children.length; j++) {
					let ele = sections[k].children[j].children[0];
					let val = ele.textContent.toLowerCase();
					let key = val.split(":").join("").trim();
					let content;
					switch (k) {
						case 1:
							content = superheroList[0].biography[key];
							break;
						case 2:
							content = superheroList[0].appearance[key];
							break;
						case 3:
							content = superheroList[0].connections[key];
							break;
						case 4:
							content = superheroList[0].work[key];
							break;
						default:
							content = "";
					}

					if (
						content === "null" ||
						content === null ||
						content === "undefined" ||
						content === undefined ||
						content === "" ||
						content === "-" ||
						content === " " ||
						content === "NA"
					) {
						content = "Not Available";
					}
					if (typeof content === "object") {
						content = content.join(", ");
					}
					ele.textContent = val.split("-").join(" ");
					ele.parentElement.append(content);
				}
			}

			console.log("One Superhero Found", superheroList[0].work);
			searchResult.appendChild(superhero);
			return;
		} else {
			console.log("Multiple Superheroes Found", superheroList);
		}
	} catch (error) {
		console.log("Error in fetching the Searched Super Hero !!!");
	}
})();
