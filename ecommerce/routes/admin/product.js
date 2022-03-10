const express = require('express');
const ProductsRepository = require('../../repository/product')
const router = express.Router()

router.get("/admin/products", (req, res) => {

})

router.get('/admin/product/new', (req, res) => {
    res.render("newProduct")
})

module.exports = router