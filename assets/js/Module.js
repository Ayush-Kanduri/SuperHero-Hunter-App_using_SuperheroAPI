//Revealing Module Pattern using IIFE Module Design Pattern//
//----------------------------------------------------------------
let superHeroApp = (() => {
	//Variable Declarations//
	const videos = document.getElementsByTagName("video");
	let i = 0;
	//----------------------------------------------------------------
	//Function: Plays the Superhero Intro Videos in the Background//
	const videoPlay = () => {
		if ("videoIndex" in localStorage) {
			//If videoIndex exists in localStorage
			i = parseInt(localStorage.getItem("videoIndex"));
			//Only 4 Videos exists
			if (i < 4) {
				i += 1;
			} else {
				i = 0;
			}
		} else {
			//If videoIndex doesn't exist in localStorage
			i = -1;
		}

		//Sets the videoIndex in localStorage
		localStorage.setItem("videoIndex", i);
		console.log("videoIndex: ", i);

		//Starts playing the video on every logo click
		if (i !== -1) {
			videos[i].classList.remove("hide");
			videos[i].play();
			//If video ends then hide the video
			if (videos[i].ended) {
				videos[i].currentTime = 0;
				videos[i].pause();
				videos[i].classList.add("hide");
			}
		}
	};
	//----------------------------------------------------------------
	//Function: Fetches all the Superheroes//
	const fetchSuperhero = async (value) => {
		//Fetching the Superheroes from the Superhero API
		const url = `https://superheroapi.com/api/125001886776752/search/${value}`;
		const response = await fetch(url);
		const data = await response.json();
		const superheroList = data.results;
		console.log(superheroList);
	};
	//----------------------------------------------------------------
	//Function: Handles the Click Events//
	const handleClick = (event) => {
		//Fetch the clicked element
		const target = event.target;
		//If the clicked element is a Wrapper Container (Left/Right of Nav Links)
		if (target.id === "wrapper") {
			//Toggles the video on and off
			let i = parseInt(localStorage.getItem("videoIndex"));
			if (i !== -1) {
				if (videos[i].paused) {
					videos[i].play();
				} else {
					videos[i].pause();
				}
			}
		}
	};
	//----------------------------------------------------------------
	/*Debounce is a mechanism which forces a Function/API-Call to wait 
	a certain amount of time before running again. This is used to 
	prevent the API-Call from being called multiple times.*/

	//Function: Debouncing mechanism for the API Calls//
	const debounce = (callback, delay = 250) => {
		let timeoutID;
		//Returns a function
		return (...value) => {
			//If there is a previous timeoutID then clear it, so that if we stop typing then only it registers the input as the final word after the delay & displays it.
			clearTimeout(timeoutID);
			//Set the timeoutID along with running the callback with a delay
			timeoutID = setTimeout(() => {
				callback(...value);
			}, delay);
		};
	};
	//----------------------------------------------------------------
	//Function: It is used to invoke debounce() & receives a function in return//
	const search = debounce((value) => {
		fetchSuperhero(value);
	}, 250);
	//----------------------------------------------------------------
	//Function: Handles the Click Events//
	const handleInput = (event) => {
		//Value of the input field as we type
		const value = event.target.value;
		search(value);
	};
	//----------------------------------------------------------------
	//Function: Initializes the Superhero Hunter App//
	const initializeApp = () => {
		//Click Event Delegation
		document.addEventListener("click", handleClick);
		//Input Event Listener
		document.addEventListener("input", handleInput);
		//Runs on every Window Load/Reload
		window.onload = () => {
			//Runs the videoPlay function
			videoPlay();
		};
	};
	//----------------------------------------------------------------
	return {
		initialize: initializeApp,
	};
})();
//----------------------------------------------------------------
