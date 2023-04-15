const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true       
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Phone number is required'],
        unique: true  
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },  
},{
    collection: 'users',
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)