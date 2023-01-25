import { Router } from 'express';
import {
  getBlogData,
  createBlog,
  deleteBlog,
  updateBlog,
  getSingleBlog,
} from '../controller/blogdataController';
import { createComments, deleteComments } from '../controller/commentsController';
import { createAdmin } from '../controller/blogAdminController';
const router = Router();

router.get('/', getBlogData);
router.post('/', createBlog);
router.put('/:id/updateBlog', updateBlog);

router.get('/:id', getSingleBlog);
router.delete('/:id/deleteblog', deleteBlog);

router.post('/comments/:id/create', createComments);
router.delete('/comments/:id/delete', deleteComments);

router.post('/admin', createAdmin);

export const routes = router;
