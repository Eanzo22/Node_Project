const orderModel = require("../models/orderModel");
const express = require("express");

const app = express();
// app.use(cookiesParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const getAllOrders = async(req, res)=> {
    const orders = await orderModel.find({}).populate(['productIds','user']);
    res.status(200).send(orders);
}

// const getOrderByUserEmail = async (req,res)=>{
//     const {Email} = req.params;
//     const orderByEmail = await orderModel.find({userEmail:Email});
//     // console.log(orderByEmail ); 
//     res.status(200).send(orderByEmail);
// }

const getOrderById = async(req, res) => {
    const {id} = req.params;
    try{
        const orderById =await orderModel.findById(id).populate(['productIds','user']);
        if (!orderById){
            res.status(404).send("this order not found");
            return;
        }else {

            res.status(200).send(orderById);
        }
    }
    catch(error){
        res.status(404).send(error.message)
    }   
}


const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findOne({_id:id})
        console.log(order);
        if(!order) {
            res.status(404).send("this order not found")
            return;
        }
        else {
            await order.updateOne({_id:id},req.body)
            const updatedOrder = await order.findOne({_id:id})
            res.send(updatedOrder);
        }
    }
    catch (error){
        res.status(404).send(error.message)
    }

}

const addOrder = async (req, res, next) => { 
    const {productIds,user,totalPrice} = req.body; 
    // console.log(req.body) 
    var newOrder = await orderModel.create({productIds,user,totalPrice}); 
    res.status(200).send("Success"); 
};

module.exports= {
    getAllOrders,
    // getOrderByUserEmail,
    getOrderById,
    deleteOrder,
    addOrder
}