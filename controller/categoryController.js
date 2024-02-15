const categoryModel = require ("../models/categoryModel");
const express = require("express");
const {categoryValidation} = require ("../util/categoryValidation");
const app = express();
// app.use(cookiesParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const getCategories = async (req,res) =>{
    const categories = await categoryModel.find({})
    res.status(200).send(categories);
}

const getCategoryById = async (req,res)=> {
    const {id} = req.params;
    const categryById = await categoryModel.findById(id)
    res.status(200).send(categryById);
}

const addCategory = async (req,res)=> {
    const {error, value} = categoryValidation(req.body);
    if (error) {
        //  bad request
        res.status(400).send({message:"Invalid form field.."})
        return;
    }
    const newCategory = await categoryModel.create(value)
    res.status(200).send(newCategory);
}

const editCategory = async (req,res,next)=> {
    try{
        const {id} = req.params;
        const {category} = req.body;
        await categoryModel.findByIdAndUpdate(id,{categoryName:category});
        res.status(200).send ({message:"category updated"});
    }
    catch (error){
        next(error)
    }
}

module.exports = {
    getCategories,
    getCategoryById,
    addCategory,
    editCategory
}