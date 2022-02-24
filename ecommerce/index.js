const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send(
        `
       <div>
        <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <input name="confirmPassword" placeholder="conform password" />
            <button>Sign Up </button>
        </form>
       </div> 
        `
    )
})

app.post("/", (req, res) => {
    req.on("data", (data) => {
        const parsed = data.toString('utf8')
        const formValues = parsed.split('&')
        const formData = {}

        for (let formValue of formValues) {
            const [key, value] = formValue.split("=")
            formData[key] = value
        }
        console.log(formData)
    })
    res.send("Sign up completed")
})

app.listen("3000", (req, res) => {
    console.log("server started at 3000")
})