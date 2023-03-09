import { Request, Response } from 'express'
import Admin from '../models/blogAdminModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const createAdmin = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Need Username & Password.' })
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password.toLowerCase(), 10)
    const usernameDB = req.body.username.toLowerCase()
    const admin = new Admin({
      username: usernameDB,
      password: hashedPassword,
    })
    const savedAdmin = await admin.save()
    const token = jwt.sign({ id: savedAdmin._id }, process.env.JWT_SECRET!, {
      expiresIn: 86400,
    })
    res.status(201).json({ message: 'Admin Created!', token, savedAdmin })
  } catch (err) {
    res.status(500).json({ message: 'Failed to create admin', error: err })
  }
}

const logAdmin = async (req: Request, res: Response) => {
  try {
    const user = await Admin.findOne({ username: req.body.username })
    if (!user) {
      return res.status(401).json({ message: 'Invalid username' })
    }
    const pass = await bcrypt.compare(req.body.password, user.password)
    if (!pass) {
      return res.status(401).json({ message: 'Invalid password' })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: 86400,
    })
    const expires = new Date(Date.now() + 86400 * 1000)
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Set-Cookie', `jwt=${token}; expires=${expires.toUTCString()};`)
    res.status(200).json({ user: user?.username, token, message: 'Hello' })
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err })
  }
}

const logOut = async (req: Request, res: Response) => {}

export { createAdmin, logAdmin, logOut }
