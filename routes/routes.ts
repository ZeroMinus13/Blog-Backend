import { Router } from 'express'
import passport from '../passportconfig'
import { getBlogData, createBlog, deleteBlog, updateBlog, getSingleBlog } from '../controller/blogdata'
import { createComments, deleteComments } from '../controller/comments'
import { createAdmin, logAdmin } from '../controller/blogAdmin'

const router = Router()
const protectedRoute = passport.authenticate('jwt', { session: false })

router.get('/p', protectedRoute, (req, res) => res.json({ message: 'bing Bing' }))
router.get('/', getBlogData)
router.post('/', protectedRoute, createBlog)
router.put('/:id/updateBlog', protectedRoute, updateBlog)

router.get('/:id', getSingleBlog)
router.delete('/:id/deleteblog', protectedRoute, deleteBlog)

router.post('/comments/:id/create', createComments)

router.delete('/comments/:id/delete', protectedRoute, deleteComments)

router.post('/createAdmin', createAdmin)
router.post('/login', logAdmin)

export const routes = router
