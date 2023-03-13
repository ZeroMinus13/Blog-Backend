import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { routes } from './routes/routes'
import passport from './passportconfig'
import mongoose from 'mongoose'
dotenv.config()

const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose
  .connect(MONGODB_URI || 'mongodb://localhost:1000/mydb')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err))

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())
//app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(cors())
app.use(routes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  res.status(500).json('Something broke!')
})

export default app
