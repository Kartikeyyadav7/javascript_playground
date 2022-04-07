const express = require('express');
const multer = require('multer')
const { requireTitle, requirePrice } = require('../../middlewares/validators');
const ProductsRepository = require('../../repository/product')
const router = express.Router()
const { validationResult } = require("express-validator")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get("/admin/products", (req, res) => {

})

router.get('/admin/product/new', (req, res) => {
    res.render("newProduct")
})

router.post("/admin/product/new", upload.single('productImg'), [requireTitle, requirePrice], (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.render("newProduct")
    }
    const { title, price } = req.body;
    const image = req.file.buffer.toString('base64');



    await ProductsRepository.create({ title, price, image });

    res.send('submitted')

})

module.exports = router