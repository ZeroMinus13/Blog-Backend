import { Request, Response, NextFunction } from 'express'
import Comments from '../models/comments'
import Blogdata from '../models/blogContent'
import zod from '../utils/userValidation'
import z from 'zod'

const createComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comments = new Comments(zod.commentsZod.parse(req.body))

    await comments.save()
    await Blogdata.findByIdAndUpdate({ _id: req.body._id }, { $push: { comments } })
    res.status(201).json({ comments })
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.errors[0].message })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

const deleteComments = async (req: Request, res: Response) => {
  try {
    await Comments.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ err })
  }
}

export { createComments, deleteComments }
