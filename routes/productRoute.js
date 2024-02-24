const express = require('express');

const{ getProducts,getProductById,addProduct, editProduct,deleteProduct} =require('../controllers/productControllerDB');
const { productValid } = require('../validation/productValidation');
const { adminAuth } = require('../middleware/adminAuth');
const productRouter = express.Router();

productRouter.get('/' ,getProducts);
productRouter.get('/:id' ,getProductById);
productRouter.post("/",addProduct);
productRouter.patch("/:id",adminAuth,editProduct);
productRouter.delete("/:id",deleteProduct);
module.exports = productRouter;