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
		onMovieClick(movie, document.querySelector('#left-summary'), 'left')
	},
})

createAutoComplete({
	...autoCompleteConfig,
	root: document.querySelector("#right-autoComplete"),
	onOptionSelect: (movie) => {
		onMovieClick(movie, document.querySelector("#right-summary"), 'right')
	},
})

let leftMovie;
let rightMovie;

const onMovieClick = async (movie, summary, side) => {
	const res = await fetch(
		`http://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
	);
	const movieDetails = await res.json();

	console.log(movieDetails);
	summary.innerHTML = movieTemplate(movieDetails)
	if (side === 'left') {
		leftMovie = movieDetails;
	} else {
		rightMovie = movieDetails;
	}

	if (leftMovie && rightMovie) {
		runComparison()
	}
};

const runComparison = () => {
	const leftSideStats = document.querySelectorAll("#left-summary .data")
	const rightSideStats = document.querySelectorAll("#right-summary .data")

	leftSideStats.forEach((leftStat, index) => {
		const rightStat = rightSideStats[index]

		const rightSideValue = parseInt(rightStat.dataset.value);
		const leftSideValue = parseInt(leftStat.dataset.value);

		if (leftSideValue > rightSideValue) {
			rightStat.classList.remove('details')
			rightStat.classList.add('not_first')
		} else {
			leftStat.classList.remove('details')
			leftStat.classList.add('not_first')
		}
	})
}



const movieTemplate = (movieDetails) => {


	const moneyMade = parseInt(movieDetails.BoxOffice.replace(/\$/g, '').replace(/,/g, ''))

	const metaScore = parseInt(movieDetails.Metascore)
	const imdbRating = parseFloat(movieDetails.imdbRating)
	const imdbVotes = parseInt(movieDetails.imdbVotes.replace(/,/g, ''))
	const awards = movieDetails.Awards.split(' ').reduce((prev, word) => {
		const value = parseInt(word);
		if (isNaN(value)) {
			return prev;
		} else {
			return prev + value;
		}
	}, 0);

	console.log(awards, moneyMade, metaScore, imdbRating, imdbVotes)

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
		<article data-value=${awards} class="details data" >
			<h3 class="subtitle">Awards</h3>
			<p class="title">${movieDetails.Awards}</p>
		</article>
		<article data-value=${moneyMade} class="details data" >
			<h3 class="subtitle">Box Office</h3>
			<p class="title">${movieDetails.BoxOffice}</p>
		</article>
		<article data-value=${metaScore} class="details data" >
			<h3 class="subtitle">Metascore</h3>
			<p class="title">${movieDetails.Metascore}</p>
		</article>
		<article data-value=${imdbRating} class="details data" >
			<h3 class="subtitle">IMDB Rating</h3>
			<p class="title">${movieDetails.imdbRating}</p>
		</article>
		<article data-value=${imdbVotes} class="details data" >
			<h3 class="subtitle">IMDB Votes</h3>
			<p class="title">${movieDetails.imdbVotes}</p>
		</article >
	</div>	
	`
}