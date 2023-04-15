const mongoose = require('mongoose')

const productReviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Product Id required'],
        ref: 'Product'
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Customer Id required'],
        ref: 'User'
    },
    images: [{
        type: String,
    }],
    comment: {
        type: String,
    },
    rating: {
        type: Number,
        min: [0, 'Value cannot be less than 0'],
        max: [5, 'Value cannot be greater than 5']
    }
},
{
    timestamps: true,
    collection: 'productReviews'
})

productReviewSchema.index({ productId: 1, customerId: 1 }, { unique: true })

module.exports = mongoose.model('ProductReview', productReviewSchema)