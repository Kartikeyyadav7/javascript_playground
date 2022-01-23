const debounce = (func, delay = 1000) => {
	let timeoutId;
	// return (args1, args2, args3) {
	//     timeoutId = setTimeout(() => func(args1, args2,args3), 1000)
	// }
	// Same as the above just lets helps us because we don't know the no. of agruments to the function
	return (...args) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => func.apply(null, args), delay);
	};
};
