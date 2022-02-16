const { hash } = window.location

const actualMessage = atob(hash.replace('#', ''))
const message = document.querySelector("#message-input")
const linkInput = document.querySelector("#link-input")

if (actualMessage) {
    document.querySelector("#message-secret").classList.remove('hide')
    // message.classList.add('hide')
    document.querySelector("#main").classList.add('hide')
    document.querySelector('h3').innerHTML = actualMessage
}


document.querySelector("form").addEventListener('submit', (event) => {
    event.preventDefault();

    const encrypted = btoa(message.value);

    linkInput.value = `${window.location}#${encrypted}`

    linkInput.select()
})