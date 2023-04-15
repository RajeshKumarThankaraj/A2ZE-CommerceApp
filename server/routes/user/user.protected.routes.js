const express = require('express')
const router = express.Router()
const ProductReview = require('../../models/productReview.model')
const Product = require('../../models/product.model') 
const fs = require('fs')
const upload  = require('../../middlewares/multer.middleware')(`review`)
const appRoot = require('app-root-path')
const { UDError } = require('../../middlewares/errorHandler')
const mongoose = require('mongoose')
const Wishlist = require('../../models/wishlist.model')
const Cart = require('../../models/cart.model')
const ShippingAddress = require('../../models/shippingAddress.model')
const Order = require('../../models/order.model')

router.post('/products/:productId/addReview', upload.array('images'), async (req, res, next) => {
    try {
        const { productId } = req.params
        const customerId = req.userId
        const { comment, rating } = req.body

        const product = await Product.findOne({_id: productId})

        if(!product) {
            throw new UDError({
                status: 400,
                message: 'Product not found'
            })
        }

        const payload = {
            productId,
            customerId,
            comment,
            rating
        }

        if (req.files) {
            const images = req.files.map(img => img.filename)
            payload.images = images
        }

        const response = await ProductReview.create(payload)

        const overallReviewsAndRatings = await ProductReview.aggregate([
            {
                $match: {
                    productId: mongoose.Types.ObjectId(productId)
                }
            },
            {
                $group: {
                    _id: null,
                    totalReviews: { $sum: 1 },
                    overallRating: { $avg: '$rating' }
                }
            }
                
        ])

        const { totalReviews, overallRating } = overallReviewsAndRatings[0]

        await product.updateOne({
            totalReviews,
            overallRating
        })


        return res.status(201).json({
            message: `Product review added successfully`,
            reviewId: response._id
        })

    } catch (error) {
        // delete uploaded files if error
        if (req.files) {
            const { productId } = req.params
            req.files.forEach(img => {
                const imgPath = `${appRoot}\\uploads\\images\\${productId}\\${img.filename}`
                fs.unlinkSync(imgPath, (err) => {
                    if (err) {
                        console.log(err)
                    }    
                })
            })
        }

        next(error)
    }
})

router.get('/wishlist', async (req, res, next) => {
    try {
        const customerId = req.userId
        const wishlist = await Wishlist.find({ customerId }).select('customerId productId')

        res.status(200).json(wishlist)

    } catch (error) {
        next(error)
    }
})

router.post('/wishlist/addToWishlist/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params
        const customerId = req.userId

        const product = await Product.findOne({_id: productId})

        if(!product) {
            throw new UDError({
                status: 400,
                message: 'Product not found'
            })
        }

        const wishlist = await Wishlist.findOneAndUpdate(
            { customerId },
            { $addToSet: { productId } },
            { upsert: true, new:true }
        )

        res.status(200).json(wishlist)
    } catch (error) {
        next(error)
    }
})

router.post('/wishlist/removeFromWishlist/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params
        const customerId = req.userId

        const product = await Product.findOne({_id: productId})

        if(!product) {
            throw new UDError({
                status: 400,
                message: 'Product not found'
            })
        }

        const wishlist = await Wishlist.findOneAndUpdate(
            { customerId },
            { $pull: { productId } },
            { new:true }
        )

        res.status(200).json(wishlist)
    } catch (error) {
        next(error)
    }
})


router.get('/cart', async (req, res, next) => {
    try {
        const customerId = req.userId
        const cart = await Cart.find({ customerId })

        res.status(200).json(cart)

    } catch (error) {
        next(error)
    }
})

router.post('/cart/addToCart', async (req, res, next) => {
    try {
        const { productId } = req.body
        const customerId = req.userId
        
        if (!productId) {
            throw new UDError({
                status: 400,
                message: 'Please fill all the fields'
            })
        }

        const product = await Product.findOne({_id: productId})

        if(!product) {
            throw new UDError({
                status: 400,
                message: 'Product not found'
            })
        }

        const noOfItems = 1
        const unitPrice = product.price

        let cart = await Cart.findOne({ customerId })

        console.log(cart)

        if(cart) {

            const index = cart.items.findIndex(item => item.productId.equals(productId))

            if(index !== -1) {
                cart.items[index].noOfItems += noOfItems
                cart.items[index].totalPrice += unitPrice
            } else {
                cart.items.push({ productId, noOfItems: 1, totalPrice: unitPrice })
            }

            cart.totalCartPrice = cart.items.reduce((acc, item) => acc + item.totalPrice, 0)
            await cart.save()
            res.status(200).json(cart)
        } else {
            const items = [{ productId, noOfItems: 1, totalPrice: unitPrice }]
            cart = new Cart({ customerId, items, totalCartPrice: unitPrice })
            await cart.save()
            res.status(200).json(cart)
        }

    } catch (error) {
        next(error)
    }
})

router.post('/cart/removeFromCart', async (req, res, next) => {
    try {

        const { productId } = req.body
        const customerId = req.userId
        
        if (!productId) {
            throw new UDError({
                status: 400,
                message: 'Please fill all the fields'
            })
        }

        const product = await Product.findOne({_id: productId})

        if(!product) {
            throw new UDError({
                status: 400,
                message: 'Product not found'
            })
        }

        const noOfItems = 1
        const unitPrice = product.price

        let cart = await Cart.findOne({ customerId })

        if(cart) {
            const index = cart.items.findIndex(item => item.productId.equals(productId))

            if(index !== -1) {

                if(cart.items[index].noOfItems === 1) {
                    cart.items = cart.items.filter(item => item.productId.toString() !== productId) 
                } else {
                    cart.items[index].noOfItems -= noOfItems
                    cart.items[index].totalPrice -= unitPrice
                }

                cart.totalCartPrice -= unitPrice

                await cart.save()
                res.status(200).json(cart)
            }
        }
        
    } catch (error) {
        next(error)
    }
})

router.get('/userAddresses', async (req, res, next) => {
    try {
        const customerId = req.userId
        const addresses = await ShippingAddress.find({ customerId })

        res.status(200).json(addresses)

    } catch (error) {
        next(error)
    }
})

router.post('/userAddresses/addAddress', async (req, res, next) => {
    try {

        const { customerId, name, address, phone } = req.body

        if (!customerId || !name || !address || !phone || !address.firstLine || !address.zip) {
            throw new UDError({
                status: 400,
                message: 'Please fill all the fields'
            })
        }

        const response = await ShippingAddress.create(req.body)

        res.status(201).json({
            message: 'Address added successfully',
            addressId: response._id
        })
        
    } catch (error) {
        next(error)
    }
})

router.patch('/userAddresses/updateAddress/:addressId', async (req, res, next) => {
    try {
        const customerId = req.userId
        const { addressId } = req.params
        const address = ShippingAddress.findOne({ _id: addressId, customerId })

        if(!address) {
            throw new UDError({
                status: 400,
                message: 'Address not found'
            })
        }

        const response = address.updateOne(req.body)

        res.status(200).json(response)
        
    } catch (error) {
        next(error)
    }
})

router.get('/orders?', async (req, res, next) => {
    try {
        const { page, limit } = req.query
        const customerId = req.userId

        const count = await Product.countDocuments({ customerId })
        const totalPages = Math.ceil(count / limit)
        const currentPage = parseInt(page)

        if(currentPage > totalPages) {
            throw new UDError({
                status: 404,
                message: 'Requested resource does not exist'
            }) 
        }

        const orders = await Product.find({ customerId })
            .limit(limit)
            .skip((currentPage - 1) * limit)
        
        

        res.status(200).json({
            orders,
            totalPages,
            currentPage,
        })
        
    } catch (error) {
        next(error)
    }
})

router.post('/orders/placeOrder', async (req, res, next) => {

    try {
        const { customerId, productDetails, totalNumberOfItems, paymentDetails, shippingDetails } = req.body

        if(!customerId || !productDetails || !totalNumberOfItems || !paymentDetails || !shippingDetails) {
            throw new UDError({
                status: 400,
                message: 'Please fill all mandatory fields'
            })
        }

        const custIdFromToken = req.userId
        
        if(customerId !== custIdFromToken) {
            throw new UDError({
                status: 401,
                message: 'Unauthorised'
            })
        }

        const payload = {
            customerId,
            productDetails,
            totalNumberOfItems,
            paymentDetails,
            shippingDetails
          }

        const savedOrder = await Order.create(payload)
        res.status(201).json(savedOrder)

    } catch (error) {
        next(error)
    }
    
})


module.exports = router