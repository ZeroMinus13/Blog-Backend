import { Request, Response } from 'express'
import Admin from '../models/admin'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const createAdmin = async (req: Request, res: Response) => {
  const { username, password } = req.body
  if (!(username || password)) {
    return res.status(400).json({ message: 'Need Username & Password.' })
  }
  try {
    const hashedPassword = await bcrypt.hash(password.toLowerCase(), 10)
    const usernameDB = username.toLowerCase()
    const admin = new Admin({
      username: usernameDB,
      password: hashedPassword,
    })
    const savedAdmin = await admin.save()
    const token = jwt.sign({ id: savedAdmin._id }, process.env.JWT_SECRET!, { expiresIn: 86400 })
    res.status(201).json({ message: 'Admin Created!', token, savedAdmin })
  } catch (err) {
    res.status(500).json({ message: 'Failed to create admin', error: err })
  }
}

const logAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const user = await Admin.findOne({ username })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }
    const TokenforUser = {
      username: user.username,
      id: user._id,
    }
    const token = jwt.sign(TokenforUser, process.env.JWT_SECRET!, { expiresIn: '3d' })
    //const expires = new Date(Date.now() + 86400 * 1000)
    // res.setHeader('Access-Control-Allow-Credentials', 'true')
    // res.setHeader('Set-Cookie', `jwt=${token};`)
    res.status(200).json({ user: user.username, token })
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err })
  }
}

const logOut = async (req: Request, res: Response) => {}

export { createAdmin, logAdmin, logOut }
