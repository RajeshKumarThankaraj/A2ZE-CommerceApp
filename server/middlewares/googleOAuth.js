const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://localhost:5000/api/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      return cb(err, profile);
  }
))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})