const mongoose = require('mongoose')

const productInCart = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Product Id required'],
        ref: 'Product'
    },
    noOfItems: {
        type: Number,
        required: [true, 'number of products selected by customer required'],
    },
    totalPrice: {
        type: Number,
        required: [true, 'total price is required'],
        default:0
    }
}, {
    _id: false,
    id: false
})

const cartSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Customer Id required'],
        ref: 'User'
    },
    items: [{
        type: productInCart,
        required: [true, 'Products required']     
    }],
    totalCartPrice: {
        type: Number,
        required: [true, 'total cart price is required']
    }
},
{
    timestamps: true,
    collection: 'cart'
})

module.exports = mongoose.model('Cart', cartSchema)

