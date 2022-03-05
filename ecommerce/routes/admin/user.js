const userRepo = require("../../repository/user")
const express = require('express')
const { check, validationResult } = require("express-validator")

const router = express.Router()

router.get('/signup', (req, res) => {
    res.render('signup', { req })
})

router.post("/signup", [
    check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .custom(async (email) => {
            const existingUser = await userRepo.getOneBy({ email })

            if (existingUser) {
                throw new Error('Email already in use')
            }
        }),
    check("password")
        .trim()
        .isLength({ min: 6, max: 20 }),
    check("confirmPassword")
        .trim()
        .isLength({ min: 6, max: 20 })
        .custom(async (confirmPassword, { req }) => {
            if (confirmPassword !== req.body.password) {
                throw new Error('Passwords must match')
            }
        })
], async (req, res) => {

    const errors = validationResult(req)
    console.log(errors)

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