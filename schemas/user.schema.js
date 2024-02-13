const mongoose = require("mongoose");


const userSchema =  mongoose.Schema({
    userName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50,
    },
    userEmail:{
        type:String,
        required:true,
        unique:true,
        minLength:3,
        maxLength:255,
    },
    passwordHash:{
        type:String,
        required:true,
        unique:true,
        minLength:3,
        maxLength:1024,
    },
    // cart:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:""                         
    // }]
    // ,
    // orders:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:""                         
    // }]
    // ,
    status:{
        type:String,
        required:true,
        default:"normal"
    }
});

const User = mongoose.model('User',userSchema);
module.exports = User;