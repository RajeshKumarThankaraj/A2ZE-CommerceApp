const mongoose = require('mongoose')

const productCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'category name required']     
    }
},
{
    timestamps: true,
    collection: 'productCategories'
})

module.exports = mongoose.model('Category', productCategorySchema)