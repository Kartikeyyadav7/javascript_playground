const { check } = require('express-validator')
const userRepo = require('../repository/user')

module.exports = {
    requireEmail: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .custom(async (email) => {
            const existingUser = await userRepo.getOneBy({ email })

            if (existingUser) {
                throw new Error('Email already in use')
            }
        }),
    requirePassword: check("password")
        .trim()
        .isLength({ min: 6, max: 20 }),
    requireConfirmPassword: check("confirmPassword")
        .trim()
        .isLength({ min: 6, max: 20 })
        .custom(async (confirmPassword, { req }) => {
            if (confirmPassword !== req.body.password) {
                throw new Error('Passwords must match')
            }
        }),
    requireEmailExists: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("Must Provide a valid email")
        .custom(async (email) => {
            const user = await userRepo.getOneBy({ email })
            if (!user) {
                throw new Error("Email not found")
            }
        })
    ,
    requireValidPasswordForUser: check('password')
        .trim()
        .custom(async (password, { req }) => {
            const user = await userRepo.getOneBy({ email: req.body.email })

            if (!user) {
                throw new Error("Invalid Password")
            }
            const validPassword = await userRepo.comparedPassword(
                user.password,
                password
            )

            if (!validPassword) {
                throw new Error("Invalid Password")
            }

        })

}