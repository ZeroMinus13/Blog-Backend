import { Request, Response } from 'express';
import blogAdmin from '../models/blogAdminModel';

const createAdmin = async (req: Request, res: Response) => {
  try {
    const blogadmin = new blogAdmin(req.body);
    await blogadmin.save();
    res.status(201).json({ message: 'Admin created!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

export { createAdmin };
