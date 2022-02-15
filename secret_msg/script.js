document.querySelector("form").addEventListener('submit', (event) => {
    event.preventDefault();

    const message = document.querySelector("#message-input")

    const encrypted = btoa(message.value);

    const linkInput = document.querySelector("#link-input")

    linkInput.value = `${window.location}#${encrypted}`

    linkInput.select()
})