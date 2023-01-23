import { Request, Response } from 'express';
import Comments from '../models/commentsModel';

// const getComments = async (req: Request, res: Response) => {
//   try {
//     const comments = await Comments.find();
//     res.status(200).json(comments);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

const createComments = async (req: Request, res: Response) => {
  try {
    const comments = new Comments(req.body);
    await comments.save();
    res.status(201).json({ message: 'Comment Created' });
  } catch (err) {
    res.status(500).json(err);
  }
};

export { createComments };
