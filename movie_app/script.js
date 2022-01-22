const API_KEY = "d66d0a7d";

const fetchResult = async (searchTerm) => {
	const res = await fetch(
		`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`
	);
	const movies = await res.json();
	console.log(movies);
};

const input = document.querySelector("input");

//What this function will do is call the fetchResult again and again as the user types and make request i.e for each word pressed and this is not good

// const onInput = (e) => {
// 	fetchResult(e.target.value);
// };

//Here on this line of code what we do is make sure that the function fetchResult is called only after a second user stops typing
let timeoutId;

const onInput = (e) => {
	if (timeoutId) {
		clearTimeout(timeoutId);
	}
	timeoutId = setTimeout(() => {
		fetchResult(e.target.value);
	}, 1000);
};

input.addEventListener("input", onInput);
