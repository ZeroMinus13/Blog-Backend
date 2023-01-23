import { Router } from 'express';
import { getBlogData, createBlog, deleteBlog, updateBlog } from '../controller/blogdataController';
import { createComments } from '../controller/commentsController';
import { createAdmin } from '../controller/blogAdminController';
const router = Router();

router.get('/', getBlogData);
router.post('/', createBlog);
router.delete('/', deleteBlog);
router.put('/', updateBlog);

router.post('/comments', createComments);

router.post('/admin', createAdmin);

export const routes = router;
