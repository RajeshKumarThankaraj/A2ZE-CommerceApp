const mongoose = require('mongoose')

const adminUserSchema = new mongoose.Schema({
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
    employeeId:{
        type: String,
        required: [true, 'Employee ID is required']
    },
    role: {
        type: String,
        enum: ['ADMIN'],
        required: [true, 'Role is required']
    }  
},{
    collection: 'adminUsers',
    timestamps: true
})

module.exports = mongoose.model('Admin', adminUserSchema)