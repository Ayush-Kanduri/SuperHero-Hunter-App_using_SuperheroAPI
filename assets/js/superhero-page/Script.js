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
//Function: Toggle the Favourites Heart Icon//
const heartToggle = (favouriteBtn, name) => {
	let arr = [];
	let item = name.trim().toLowerCase();
	//If Favourites exist in localStorage
	if ("favourites" in localStorage) {
		//Convert the string to array
		arr = JSON.parse(localStorage.getItem("favourites"));
		//If the superhero is already in the favourites
		if (arr.includes(item)) {
			favouriteBtn.style.color = "red";
		}
		//If the superhero is not in the favourites
		else {
			favouriteBtn.style.color = "black";
		}
	}
	//If Favourites don't exist in localStorage
	else {
		favouriteBtn.style.color = "black";
	}
};
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
		// console.log(superheroList);

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
			const toast = superhero.querySelector(".toast");
			const name = superhero.querySelector("#name");
			const image = superhero.querySelector("#image img");
			const favouriteBtn = superhero.querySelector("#info .fav-btn");
			const progressBar = superhero.querySelectorAll(".progress-bar");
			const sections = superhero.querySelectorAll("section");
			let i = 0;

			name.textContent = superheroList[0].name;
			image.src = superheroList[0].image.url;
			favouriteBtn.setAttribute("data-id", superheroList[0].id);
			favouriteBtn.setAttribute(
				"data-image-url",
				superheroList[0].image.url
			);

			heartToggle(favouriteBtn, superheroList[0].name);

			favouriteBtn.addEventListener("click", (event) => {
				let arr = [];
				let images = [];
				let item = superheroList[0].name.trim().toLowerCase();
				let url = favouriteBtn.getAttribute("data-image-url");
				toast.children[0].children[0].textContent = item;

				//If Favourites exist in localStorage
				if ("favourites" in localStorage) {
					//Convert the string to array
					arr = JSON.parse(localStorage.getItem("favourites"));
					//Convert the string to array
					images = JSON.parse(localStorage.getItem("images"));

					//If the superhero is already in the favourites
					if (arr.includes(item)) {
						//Remove the superhero from the favourites
						arr = arr.filter((i) => i !== item);
						//Remove the superhero image URL from the favourites
						images = images.filter((obj) => obj.name !== item);
						//Change color of the heart icon
						favouriteBtn.style.color = "black";
						//Change toast message
						toast.children[1].children[0].textContent =
							"Removed from Favourites !!!";
					}
					//If the superhero is not in the favourites
					else {
						//Push the favourite superhero to the array
						arr.push(item);
						//Push the favourite superhero image URL to the array
						images.push({ name: item, image: url });
						//Change color of the heart icon
						favouriteBtn.style.color = "red";
						//Change toast message
						toast.children[1].children[0].textContent =
							"Added to Favourites !!!";
					}
				}
				//If Favourites don't exist in localStorage
				else {
					//Push the favourite superhero to the array
					arr.push(item);
					//Push the favourite superhero image URL to the array
					images.push({ name: item, image: url });
					//Change color of the heart icon
					favouriteBtn.style.color = "red";
					//Change toast message
					toast.children[1].children[0].textContent =
						"Added to Favourites !!!";
				}

				//Convert the array to string and store it in localStorage
				localStorage.setItem("favourites", JSON.stringify(arr));
				//Convert the array to string and store it in localStorage
				localStorage.setItem("images", JSON.stringify(images));
				//Show the toast
				toast.classList.add("show", "fadeLeft");
				//Hide the toast after 3 seconds
				setTimeout(() => {
					toast.classList.remove("show", "fadeLeft");
				}, 3000);
			});

			for (let key in superheroList[0].powerstats) {
				let val = superheroList[0].powerstats[key];
				if (
					val === "null" ||
					val === undefined ||
					val === "undefined" ||
					val === null
				) {
					val = "NA";
				}
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

			// console.log("One Superhero Found", superheroList[0]);
			searchResult.appendChild(superhero);
			return;
		} else {
			console.log("Multiple Superheroes Found", superheroList);
		}
	} catch (error) {
		console.log("Error in fetching the Searched Super Hero !!!", error);
	}
})();
