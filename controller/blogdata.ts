import { NextFunction, Request, Response } from 'express';
import Blogdata from '../models/blogContent';
import Comments from '../models/comments';
import zod from '../utils/userValidation';

const getBlogData = async (req: Request, res: Response) => {
  try {
    const blogs = await Blogdata.find({}).populate({
      path: 'comments',
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json(blogs);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogs = new Blogdata(zod.blogZod.parse(req.body));
    await blogs.save();
    res.status(201).end();
  } catch (err) {
    next(err);
  }
};

const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogs = await Blogdata.findByIdAndUpdate(req.params.id, zod.blogZod.parse(req.body), { new: true });
    res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blogdata.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    const commentIds = blog.comments.map((commentId) => commentId.toString());
    await Comments.deleteMany({ _id: { $in: commentIds } });
    await Blogdata.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ err });
  }
};

const getSingleBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blogdata.findById(req.params.id).populate('comments');
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ err });
  }
};

export { getBlogData, createBlog, deleteBlog, updateBlog, getSingleBlog };
