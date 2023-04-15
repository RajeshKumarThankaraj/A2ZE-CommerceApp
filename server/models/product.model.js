const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
    isOnOffer: {
        type: Boolean,
        default: false
    },
    discountPercent: {
        type: Number,
        required: this.isOnOffer,
        default: 0
    }
}, {
    _id: false,
    id: false
})

const productSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, 'product id is required']
    },
    name: {
        type: String,
        required: [true, 'product name is required']
    },
    description: {
        type: String,
        required: [true, 'product desc is required']    
    },
    images: [{
        type: String,
    }],
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    offerDetails: {
        type: offerSchema
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    }],
    availableQuantity: {
        type: Number,
        required: [true, 'quantity  is required']
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    overallRating: {
        type: Number,
        default: 0
    }
},{
    collection: 'products',
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)