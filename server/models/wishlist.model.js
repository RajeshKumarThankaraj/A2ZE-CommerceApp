const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Customer Id required'],
        ref: 'User',
        unique: true
    },
    productId:{
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
        required: [true, 'Product Id required'],
        unique: true
    }
},
{
    timestamps: true,
    collection: 'wishlist'
})

module.exports = mongoose.model('Wishlist', wishlistSchema)