const mongoose = require('mongoose')

const orderedProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Product Id required'],
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity required'],
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price required'],
    }
}, {
    _id: false,
    id: false
})

const paymentSchema = new mongoose.Schema({
    paymnetRef: {
        type: String,
        required: [true, 'Payment ref required']
    },
    paymentMode: {
        type: String,
        enum: ['COD', 'UPI', 'NB', 'CC', 'DC'],
        required: [true, 'Payment mode required'],
    },
    orderPrice: {
        type: Number,
        required: [true, 'Order price required']
    },
    Discount: {
        type: Number,
        default: 0
    },
    deliveryCharge: {
        type: Number,
        required: [true, 'Delivery charge required']
    }
}, {
    _id: false,
    id: false
})

const shippingDetailsSchema = new mongoose.Schema({
    shippingAddressId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Shipping address Id required'],
        ref: 'ShippingAddress'
    },
    deliveryDt: {
        type: Date,
        required: [true, 'Delivery date required'],
    },
    trackingId: {
        type: String,
    },
    currentStatus: {
        type: Date,
        required: [true, 'Current shipment status required'],
    },
    carrier: {
        type: String
    }
})

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Customer Id required'],
        ref: 'User'
    },
    productDetails: [{
        type: orderedProductSchema,
        required: [true, 'Product details required']     
    }],
    totalNumberOfItems: {
        type: Number,
        required: [true, 'Total number of items required']
    },
    paymentDetails: {
        type: paymentSchema,
        required: [true, 'payment details required']
    },
    shippingDetails: {
        type: shippingDetailsSchema,
        required: [true, 'Shipment details required']
    }
},
{
    timestamps: true,
    collection: 'orders'
})

module.exports = mongoose.model('Order', orderSchema)