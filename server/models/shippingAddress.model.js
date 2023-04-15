const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    firstLine: {
        type: String,
        required: [true, 'First line of address required']
    },
    secondLine: {
        type: String,
    },
    landmark: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    zip: {
        type: String,
        required: [true, 'Zip code required']
    }
})

const shippingAddressSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Customer Id required'],
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Name required']
    },
    address: {
        type: addressSchema,
        required: [true, 'address required']     
    },
    phone: {
        type: Number,
        required: [true, 'Phone number required']
    }
},
{
    timestamps: true,
    collection: 'shippingAddresses'
})

module.exports = mongoose.model('ShippingAddress', shippingAddressSchema)