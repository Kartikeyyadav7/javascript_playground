const API_KEY = "d66d0a7d";


createAutoComplete({
	root: document.querySelector(".autoComplete"),
	renderOption: (movie) => {
		const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
		return `
			<img class="image" src="${imgSrc}"	/>
			<p>${movie.Title}</p>
		`
	},
	onOptionSelect: (movie) => {
		onMovieClick(movie)
	},
	inputValue: (movie) => {
		return movie.Title
	},
	async fetchResult(searchTerm) {
		const res = await fetch(
			`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`
		);
		const movies = await res.json();

		if (movies.Error) {
			return [];
		}

		return movies.Search;
	}
})

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