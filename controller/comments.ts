import { Request, Response } from 'express'
import Comments from '../models/comments'
import Blogdata from '../models/blogContent'

const createComments = async (req: Request, res: Response) => {
  try {
    const comments = new Comments({ username: req.body.username, content: req.body.content })
    await comments.save()
    await Blogdata.findByIdAndUpdate({ _id: req.body._id }, { $push: { comments } })
    res.status(201).json({ message: 'Comment Created', comments })
  } catch (err) {
    res.status(500).json({ err })
  }
}

const deleteComments = async (req: Request, res: Response) => {
  try {
    await Comments.findByIdAndDelete(req.params.id)
    res.status(204).send('Comment Deleted')
  } catch (err) {
    res.status(500).json({ err })
  }
}

export { createComments, deleteComments }
