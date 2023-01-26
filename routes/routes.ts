import { Router } from 'express';
import passport from 'passport';
import {
  getBlogData,
  createBlog,
  deleteBlog,
  updateBlog,
  getSingleBlog,
} from '../controller/blogdataController';
import { createComments, deleteComments } from '../controller/commentsController';
import { createAdmin, logAdmin, logOut } from '../controller/blogAdminController';

const router = Router();

router.get('/', getBlogData);
router.post('/', passport.authenticate('jwt', { session: false }), createBlog);
router.put('/:id/updateBlog', passport.authenticate('jwt', { session: false }), updateBlog);

router.get('/:id', getSingleBlog);
router.delete('/:id/deleteblog', passport.authenticate('jwt', { session: false }), deleteBlog);

router.post('/comments/:id/create', createComments);

router.delete(
  '/comments/:id/delete',
  passport.authenticate('jwt', { session: false }),
  deleteComments
);

router.post('/admin', createAdmin);
router.post('/login', logAdmin);

export const routes = router;
