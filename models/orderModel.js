const { array } = require('joi');
const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({

    productIds:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"                         
    }],
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    totalPrice: {
        type: Number,
        required :true
    },
    
});

const orderModel = mongoose.model('Order',orderSchema)
module.exports = orderModel;