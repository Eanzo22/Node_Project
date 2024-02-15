const mongoose = require ('mongoose');
const categorySchema = mongoose.Schema({
    nameCAt: {
        type: String,
    }
})

const categoryModel = mongoose.model('Category',categorySchema);
module.exports = categoryModel;