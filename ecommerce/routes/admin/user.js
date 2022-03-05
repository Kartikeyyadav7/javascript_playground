const userRepo = require("../../repository/user")
const express = require('express')
const { validationResult } = require("express-validator")
const { requireEmail, requirePassword, requireConfirmPassword } = require("../../middlewares/validators")

const router = express.Router()

router.get('/signup', (req, res) => {
    res.render('signup', { req })
})

router.post("/signup", [requireEmail, requirePassword, requireConfirmPassword], async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.render('signup', { req, errors })
    }

    const { email, password, confirmPassword } = req.body;


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