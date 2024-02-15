const express = require('express');
const categoryValidation = require('../util/categoryValidation');
const{getCategories,getCategoryById,addCategory,editCategory} =require('../controller/categoryController')
const categoriesRouter = express.Router();

categoriesRouter.get('/' ,getCategories);
categoriesRouter.get('/:id' ,getCategoryById);
categoriesRouter.post("/add",addCategory);
categoriesRouter.patch("/:id",editCategory);

module.exports = categoriesRouter;