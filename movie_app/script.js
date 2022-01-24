const API_KEY = "d66d0a7d";

const fetchResult = async (searchTerm) => {
	const res = await fetch(
		`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`
	);
	const movies = await res.json();

	if (movies.Error) {
		return [];
	}

	return movies.Search;
};

//What this function will do is call the fetchResult again and again as the user types and make request i.e for each word pressed and this is not good

// const onInput = (e) => {
// 	fetchResult(e.target.value);
// };

/*Here on this line of code what we do is make sure that the function fetchResult is called only after a second user stops typing
 The whole process is called debouncing an input which is waiting for some time to pass after the last event to actually do something
*/

/* What is happening on the code below is that we take setTimeout for the fetchResult and then after that it returns an Id and we store it
and after doing that we take that timeout and clearTimeout and then we do this until the user doesn't type for one second
*/
// const onInput = (e) => {
// 	if (timeoutId) {
// 		clearTimeout(timeoutId);
// 	}
// 	timeoutId = setTimeout(() => {
// 		fetchResult(e.target.value);
// 	}, 1000);
// };

//? The debounce function is used for reusing the concept of debounce , it takes a function as a agrument and return a function
// const debounce = (func, delay = 1000) => {
// 	let timeoutId;
// return (args1, args2, args3) {
//     timeoutId = setTimeout(() => func(args1, args2,args3), 1000)
// }
// Same as the above just lets helps us because we don't know the no. of agruments to the function
// 	return (...args) => {
// 		if (timeoutId) {
// 			clearTimeout(timeoutId);
// 		}
// 		timeoutId = setTimeout(() => func.apply(null, args), delay);
// 	};
// };

const root = document.querySelector(".autoComplete");

root.innerHTML = `
	<label>
	<b>Search for a move</b>
	</label>
	<input class="input" />
	<div class="results"></div>
`;

const input = document.querySelector(".input");
const results = document.querySelector(".results");

const onInput = async (e) => {
	const movies = await fetchResult(e.target.value);

	results.innerHTML = ""; // This clear the results div so that after every request the movies doesn't get appened to the bottom of the list

	movies.map((movie) => {
		const option = document.createElement("a");

		option.classList.add("result");

		results.classList.add("is_active");

		const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;

		option.innerHTML = `
			<img class="image" src="${imgSrc}"	/>
			<p>${movie.Title}</p>
		`;

		option.addEventListener("click", () => {
			results.classList.remove("is_active");
			input.value = movie.Title;
			onMovieClick(movie);
		});

		document.querySelector(".results").appendChild(option);
	});
};

input.addEventListener("input", debounce(onInput));

//? This below code allows us to click anywhere on the page where the results are not present and that will close the dropdown
document.addEventListener("click", (event) => {
	if (!root.contains(event.target)) {
		results.classList.remove("is_active");
	}
});

const onMovieClick = async (movie) => {
	const res = await fetch(
		`http://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
	);
	const movieDetails = await res.json();

	console.log(movieDetails);
	document.querySelector(".summary").innerHTML = movieTemplate(movieDetails)
};

const movieTemplate = (movieDetails) => {
	return `	
	<div>
		<div>
			<img src="${movieDetails.Poster}" alt="">
		</div>
		<div>
			<h2>${movieDetails.Title}</h2>
			<h4>${movieDetails.Genre}</h4>
			<p>${movieDetails.Plot}</p>
		</div>
	</div>	
	`
}