const joi = require('joi');

const validateCategory = (category)=> {
    const schema = joi.object ({
        nameCAT: joi.string().min(3).max(30).required()
    })
    return schema.validate(category)
};

module.exports = {
    validateCategory
}
