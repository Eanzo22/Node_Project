const joi = require('joi');

const validateNewUser = (user)=>{              //server side validations
    const schema = joi.object({
        userName : joi.string().min(3).max(50).required(),
        userEmail : joi.string().min(3).max(255).required(),
        userPassword: joi.string().min(3).max(1024).required(),  
        isAdmin: joi.boolean().required(),      
        cart:joi.array(),
        orders:joi.array()
    });
    return schema.validate(user);                         //return error and value

};

const validateLoginUser = (user)=>{
    const schema = joi.object({
        userEmail : joi.string().min(3).max(255).required(),
        userPassword : joi.string().min(3).max(1024).required()
    });
    return schema.validate(user);                         //return error and value

};

module.exports ={
    validateNewUser,
    validateLoginUser
}