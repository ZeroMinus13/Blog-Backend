import app from '../app'
import request from 'supertest'
const api = request(app)

const initialBlog = [
  {
    title: 'Test Blog',
    content: 'Testing',
  },
  {
    title: 'Test Blog2',
    content: 'Testing2',
  },
]
const createAdmin = async (user: any) => {
  await api.post('/createAdmin').send(user)
}
const login = async (user: any) => {
  return await api.post('/login').send(user)
}
export { initialBlog, createAdmin, login }
