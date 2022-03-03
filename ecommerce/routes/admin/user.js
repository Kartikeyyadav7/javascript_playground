const userRepo = require("../../repository/user")
const express = require('express')

const router = express.Router()

router.get('/signup', (req, res) => {
    res.render('signup', { req })
})

router.post("/signup", async (req, res) => {
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

router.get("/signout", (req, res) => {
    req.session = null;
    res.send("You are logged out")
})

router.get("/signin", (req, res) => {
    res.render('signin')
})


router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await userRepo.getOneBy({ email })

    if (!user) {
        return res.send("User not found")
    }

    const validPassword = await userRepo.comparedPassword(
        user.password,
        password
    )

    if (!validPassword) {
        return res.send("Password not valid")
    }

    req.session.userID = user.id

    res.send("You are logged in")
})


module.exports = router