import { Request, Response } from 'express';
import Blogdata from '../models/blogDataModel';

const getBlogData = async (req: Request, res: Response) => {
  try {
    const blogs = await Blogdata.find();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ err });
  }
};

const createBlog = async (req: Request, res: Response) => {
  try {
    const blogs = new Blogdata(req.body);
    await blogs.save();
    res.status(201).json({ message: 'Blog created successfully' });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const updateBlog = async (req: Request, res: Response) => {
  try {
    const blogs = await Blogdata.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Blog successfully updated', blogs });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    await Blogdata.findByIdAndDelete(req.params.id);
    res.status(204);
  } catch (err) {
    res.status(500).json({ err });
  }
};

export { getBlogData, createBlog, deleteBlog, updateBlog };
