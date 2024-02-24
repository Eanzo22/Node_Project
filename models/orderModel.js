const { array } = require('joi');
const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({

    productIds:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"                         
    }],
    userEmail: {
        type: String,
        required :true
    },
    totalPrice: {
        type: Number,
        required :true
    },
});

const orderModel = mongoose.model('Order',orderSchema)
module.exports = orderModel;