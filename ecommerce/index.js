const express = require('express')
const userRepo = require('./repository/user')
const cookieSession = require('cookie-session')

const app = express()

app.get('/signup', (req, res) => {
    res.send(
        `
        <div>
        Your Id is: ${req.session?.userID}
       <div>
        <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <input name="confirmPassword" placeholder="confirm password" />
            <button>Sign Up </button>
        </form>
       </div> 
       </div>
        `
    )
})

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['asdlkfajwjaskdf#@#@$@lkasje39']
}))


app.post("/signup", async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    const existingUser = await userRepo.getOneBy({ email })

    console.log(existingUser)

    if (existingUser) {
        return res.send('Email already in Use')
    }

    if (password !== confirmPassword) {
        return res.send("Passwords must match")
    }

    const user = await userRepo.create({ email, password })

    req.session.userID = user.id

    res.send("Sign up completed")
})

app.get("/signout", (req, res) => {
    req.session = null;
    res.send("You are logged out")
})

app.get("/signin", (req, res) => {
    res.send(
        `
       <div>
        <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <button>Sign In </button>
        </form>
       </div> 
        `
    )
})


app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await userRepo.getOneBy({ email })

    if (!user) {
        return res.send("User not found")
    }

    if (user.password !== password) {
        return res.send("Password not valid")
    }

    req.session.userID = user.id

    res.send("You are logged in")
})


app.listen("3000", (req, res) => {
    console.log("server started at 3000")
})
