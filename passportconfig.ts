import dotenv from 'dotenv'
import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import Admin from './models/admin'
dotenv.config()

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}
const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    console.log(payload)
    const user = await Admin.findById(payload.id)
    if (!user) {
      return done(null, false)
    }
    return done(null, user)
  } catch (error) {
    return done(error)
  }
})

passport.use('jwt', jwtStrategy)

export default passport
