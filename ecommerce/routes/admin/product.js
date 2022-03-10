const express = require('express');
const { requireTitle, requirePrice } = require('../../middlewares/validators');
const ProductsRepository = require('../../repository/product')
const router = express.Router()
const { validationResult } = require("express-validator")

router.get("/admin/products", (req, res) => {

})

router.get('/admin/product/new', (req, res) => {
    res.render("newProduct")
})

router.post("/admin/product/new", [requireTitle, requirePrice], (req, res) => {
    const errors = validationResult(req)
    console.log(errors)
    res.send("submitted")
})

module.exports = router