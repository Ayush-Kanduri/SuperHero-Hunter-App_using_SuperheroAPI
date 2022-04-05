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
	//Function: Handles the Click Events//
	const handleClick = (event) => {
		//Fetch the clicked element
		const target = event.target;
		console.log(target);
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
	//Function: Initializes the Superhero Hunter App//
	const initializeApp = () => {
		//Click Event Delegation
		document.addEventListener("click", handleClick);
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
