//----------------------------------------------------------------
//Super Hero Display Page//
//----------------------------------------------------------------
//Variable Declarations//
const searchResultTitle = document.querySelector("#search-result-title");
//----------------------------------------------------------------
//Function: To perform multiple Tasks & Actions//
const actions = (() => {
	//Sets the Search Result Title
	searchResultTitle.textContent = `Search Results for '${localStorage.getItem(
		"superhero"
	)}'`;
})();
