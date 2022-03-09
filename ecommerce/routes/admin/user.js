const userRepo = require("../../repository/user")
const express = require('express')
const { validationResult, check } = require("express-validator")
const { requireEmail, requirePassword, requireConfirmPassword, requireEmailExists, requireValidPasswordForUser } = require("../../middlewares/validators")
const getError = require('../../helpers/error')
const user = require("../../repository/user")
const router = express.Router()

router.get('/signup', (req, res) => {
    res.render('signup', { req, getError })
})

router.post("/signup", [requireEmail, requirePassword, requireConfirmPassword], async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.render('signup', { req, errors, getError })
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


router.post('/signin', [requireEmailExists, requireValidPasswordForUser],
    async (req, res) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.render('signin', { req, errors, getError })
        }

        const { email, password } = req.body;

        const user = await userRepo.getOneBy({ email })

        req.session.userID = user.id

        res.send("You are logged in")
    })


module.exports = router