const express = require('express')
const cookieSession = require('cookie-session')
const userRouter = require('./routes/admin/user')

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['asdlkfajwjaskdf#@#@$@lkasje39']
}))
app.use(userRouter)

app.listen("3000", (req, res) => {
    console.log("server started at 3000")
})
