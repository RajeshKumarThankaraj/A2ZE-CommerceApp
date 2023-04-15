const express = require('express')
const router = express.Router()
const { userRegistration, userLogin, logout, refreshAccessToken } = require('../controllers/auth.controller')
const { verifyAccessToken, verifyRefreshToken } = require('../middlewares/auth.middleware')
// const passport = require('passport')


router.post('/register', userRegistration)
router.post('/login', userLogin)
router.delete('/logout', verifyAccessToken, logout)
router.post('/refreshAccessToken', verifyRefreshToken, refreshAccessToken)

// federated login - google OAuth2.0
// router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
// router.get('/google/callback', passport.authenticate('google', { successRedirect: '/login', failureRedirect: '/login' }), googleAuthcontroller)

module.exports = router