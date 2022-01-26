const API_KEY = "d66d0a7d";

const autoCompleteConfig = {
	renderOption: (movie) => {
		const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
		return `
			<img class="result_image" src="${imgSrc}"	/>
			<p>${movie.Title}</p>
		`
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
}

createAutoComplete({
	...autoCompleteConfig,
	root: document.querySelector("#left-autoComplete"),
	onOptionSelect: (movie) => {
		onMovieClick(movie, document.querySelector('#left-summary'))
	},
})

createAutoComplete({
	...autoCompleteConfig,
	root: document.querySelector("#right-autoComplete"),
	onOptionSelect: (movie) => {
		onMovieClick(movie, document.querySelector("#right-summary"))
	},
})

const onMovieClick = async (movie, summary) => {
	const res = await fetch(
		`http://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
	);
	const movieDetails = await res.json();

	console.log(movieDetails);
	summary.innerHTML = movieTemplate(movieDetails)
};



const movieTemplate = (movieDetails) => {
	return `	
	<div>
		<div>
			<img src="${movieDetails.Poster}" class="posterImg" alt="${movieDetails.Title}">
		</div>
		<div>
			<h2>${movieDetails.Title}</h2>
			<h3>${movieDetails.Genre}</h3>
			<p class="movie_plot" >${movieDetails.Plot}</p>
		</div>
		<article class="details" >
			<h3 class="subtitle">Awards</h3>
			<p class="title">${movieDetails.Awards}</p>
		</article>
		<article class="details" >
			<h3 class="subtitle">Box Office</h3>
			<p class="title">${movieDetails.BoxOffice}</p>
		</article>
		<article class="details" >
			<h3 class="subtitle">Metascore</h3>
			<p class="title">${movieDetails.Metascore}</p>
		</article>
		<article class="details" >
			<h3 class="subtitle">IMDB Rating</h3>
			<p class="title">${movieDetails.imdbRating}</p>
		</article>
		<article class="details" >
			<h3 class="subtitle">IMDB Votes</h3>
			<p class="title">${movieDetails.imdbVotes}</p>
		</article >
	</div>	
	`
}