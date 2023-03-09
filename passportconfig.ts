import dotenv from 'dotenv'
import passport from 'passport'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import Admin from './models/blogAdminModel'
import app from './app'
dotenv.config()

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

const jwt = passport.use(
  new JWTStrategy(options, function (payload, done) {
    Admin.findOne({ id: payload.id }, function (err: Error, user: any) {
      if (err) {
        return done(err, false)
      }
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  })
)

app.use(passport.initialize())
app.use(passport.authenticate('jwt', { session: false }))
