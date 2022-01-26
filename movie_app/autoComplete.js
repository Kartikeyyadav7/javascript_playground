const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchResult }) => {
    root.innerHTML = `
	<label>
	<b>Search</b>
	</label>
	<input class="input" />
	<div class="results"></div>
`;

    const input = root.querySelector(".input");
    const results = root.querySelector(".results");

    const onInput = async (e) => {
        const items = await fetchResult(e.target.value);

        results.innerHTML = ""; // This clear the results div so that after every request the items doesn't get appened to the bottom of the list

        items.map((item) => {
            const option = document.createElement("a");

            option.classList.add("result");

            results.classList.add("is_active");


            option.innerHTML = renderOption(item);

            option.addEventListener("click", () => {
                results.classList.remove("is_active");
                input.value = inputValue(item);

                onOptionSelect(item);
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


}