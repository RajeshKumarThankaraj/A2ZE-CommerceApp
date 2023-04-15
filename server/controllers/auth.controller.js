const User = require('../models/user/user.model')
const Admin = require('../models/user/adminUser.model')
const bcrypt = require('bcryptjs')
const generateAccessTokens = require('../services/generateAccessTokens')
const { UDError } = require('../middlewares/errorHandler')
const redisClient = require('../services/redis.conn')

const fieldValidationError =  new UDError({
    status: 400,
    message: 'Please add all fields'
})

/** 
 * @desc        Register New User
 * @method      post
 * @route       shared(Admin/user)
 * @type        public
 */

const userRegistration = async (req,res,next) => {
    try {
        const isAdmin = req.baseUrl.includes('admin')
        const userModel = isAdmin ? Admin : User


        const { fullName, email, phoneNumber, password, employeeId, role } = req.body
    
        /** check if all fields are available  */
        if(!fullName || !phoneNumber || !email || !password) {
            throw fieldValidationError
        }

        if (isAdmin) {
            if(!employeeId || !role) {
                throw fieldValidationError
            }
        }
    
        /** Check if user already exists */
        const userExists = await userModel.findOne({email})
        if (userExists) {
            throw new UDError({
                status: 400,
                message: 'This email is already registered'
            })
        }


        /** Hash password before save */
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const payload = {
            fullName,
            phoneNumber,
            email,
            password: hashedPassword
        }

        if (isAdmin) {
            payload.employeeId = employeeId
            payload.role = role
        }
    
        /** Add new user entry to db */
        const response = await userModel.create(payload)    
         
        return res.status(201).json({
            message: `User registration successful`,
            userId: response._id
        })       
    } catch (error) {
        next(error)
    }
}


/** 
 * @desc        Login
 * @method      post
 * @route       /api/auth/login
 * @type        public
 */

const userLogin = async (req, res, next) => {
    try {
        const isAdmin = req.baseUrl.includes('admin')
        const userModel = isAdmin ? Admin : User

        const { email, password } = req.body

        /** Validate fields */
        if(!email || !password) {
            throw fieldValidationError
        }

        /** check if user available */
        const user = await userModel.findOne({email})

        if(user && (await bcrypt.compare(password, user.password))) {
            const { _id: id } = user
            const accessTokens = await generateAccessTokens({ id }, isAdmin)

            console.log(accessTokens)

            if(!accessTokens.accessToken) {
                throw new UDError({
                    status: 400,
                    message: 'Token generation failed. Please try again.'
                })
            }

            return res.status(200).json(accessTokens)
        } else {
            throw new UDError({
                status: 401,
                message: 'Invalid Credentials'
            })
        }

    } catch (error) {
        next(error)
    }
}

/** 
 * @desc        Logout
 * @method      delete
 * @route       /api/auth/logout
 * @type        public
 */

const logout = async (req, res) => {

    try {
        const { userId } = req
        const { authorization: token } = req.headers
    
        /** remove the refresh token **/
        await redisClient.del(userId.toString())
    
        /** blacklist current access token **/
        await redisClient.set('BL_' + userId.toString(), token.split(' ')[1])
        
        return res.status(200).json({
            message: "success."
        })
        
    } catch (error) {
        next(error)
    }

}

/** 
 * @desc        Refresh Access Token
 * @method      post
 * @route       /api/auth/refreshAccessToken
 * @type        private
 */

const refreshAccessToken = async (req, res, next) => {

    try {
        const { userId: id } = req

        const accessTokens = await generateAccessTokens({ id })

        if(!accessTokens.accessToken) {
            throw new UDError({
                status: 400,
                message: 'Token generation failed. Please try again.'
            })
        }

        return res.status(200).json(accessTokens)
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    userRegistration,
    userLogin,
    logout,
    refreshAccessToken
}