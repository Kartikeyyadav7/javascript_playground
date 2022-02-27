const express = require('express')
const userRepo = require('./repository/user')

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
    const { email, password, confirmPassword } = req.body;
    const existingUser = userRepo.getOneBy({ email })

    if (existingUser) {
        return res.send('Email already in Use')
    }

    if (password !== confirmPassword) {
        return res.send("Passwords must match")
    }

    res.send("Sign up completed")
})

app.listen("3000", (req, res) => {
    console.log("server started at 3000")
})