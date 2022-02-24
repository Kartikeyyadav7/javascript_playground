const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send(
        `
       <div>
        <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <input name="confirmPassword" placeholder="confirm password" />
            <button>Sign Up </button>
        </form>
       </div> 
        `
    )
})

app.use(express.urlencoded({ extended: true }));


app.post("/", (req, res) => {
    console.log(req.body)
    res.send("Sign up completed")
})

app.listen("3000", (req, res) => {
    console.log("server started at 3000")
})