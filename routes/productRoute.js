const express = require('express');

const{ getProducts,getProductById,addProduct, editProduct,deleteProduct} =require('../controller/productControllerDB');
const { productValid } = require('../util/productVaildation');
const productRouter = express.Router();

productRouter.get('/' ,getProducts);
productRouter.get('/:id' ,getProductById);
productRouter.post("/",addProduct);
productRouter.patch("/:id",editProduct);
productRouter.delete("/:id",deleteProduct);
module.exports = productRouter;