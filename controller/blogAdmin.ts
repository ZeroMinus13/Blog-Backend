import { Request, Response, NextFunction } from 'express'
import Admin from '../models/admin'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import zod from '../utils/userValidation'

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = zod.parse(req.body)
    const hashedPassword = await bcrypt.hash(password.toLowerCase(), 10)
    const admin = new Admin({ username, password: hashedPassword })
    let savedA = await admin.save()
    res.status(201).json({ savedA })
  } catch (err: unknown) {
    console.error(err)
    next(err)
  }
}

const logAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = zod.parse(req.body)
    const user = await Admin.findOne({ username })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }
    const TokenforUser = {
      username: user.username,
      id: user._id,
    }
    const token = jwt.sign(TokenforUser, process.env.JWT_SECRET!, { expiresIn: '7d' })
    res.status(200).json({ user: user.username, token })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

// const logOut = async (req: Request, res: Response) => {
//   await Admin.deleteMany({})
//   res.json({ message: 'Deleted All names' })
// }

export { createAdmin, logAdmin }
