import { Router } from 'express'
import passport from '../passportconfig'
import { getBlogData, createBlog, deleteBlog, updateBlog, getSingleBlog } from '../controller/blogdataController'
import { createComments, deleteComments } from '../controller/commentsController'
import { createAdmin, logAdmin, logOut } from '../controller/blogAdminController'

const router = Router()
const protectedRoute = passport.authenticate('jwt', { session: false })

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
