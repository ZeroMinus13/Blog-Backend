import { initialBlog, createAdmin, login } from './blog_helper'
import mongoose from 'mongoose'
import request from 'supertest'
import app from '../app'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Blogdata from '../models/blogContent'
import Admin from '../models/admin'
dotenv.config()

beforeEach(async () => {
  await Blogdata.deleteMany({})
  await Admin.deleteMany({})
  await Blogdata.insertMany(initialBlog)
})

const api = request(app)

describe('Testing Blogs get', () => {
  test('Blogs are returned as json', async () => {
    await api
      .get('/')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('There are two blogs', async () => {
    const response = await api.get('/')
    expect(response.body).toHaveLength(2)
  })

  test('Blog content exists?', async () => {
    const response = await api.get('/')
    expect(response.body[0].title).toBe('Test Blog')
  })

  test('Blog comments should be 0 if array is empty', async () => {
    const response = await api.get('/')
    expect(response.body[0].comments).toHaveLength(0)
  })
})

describe('Authentication', () => {
  const user = { username: 'testuser', password: 'testpassword' }

  test('Should return a JWT token for a valid user', async () => {
    await createAdmin(user)
    const userRes = await login(user)
    const { token, id } = userRes.body
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!)

    const userId = typeof decodedToken === 'string' ? undefined : decodedToken.userId
    expect(userId).toBe(id)
  })

  test('Should return an error for an invalid user', async () => {
    const response = await api.post('/login').send({ username: 'invaliduser', password: 'invalidpassword' }).expect(401)

    expect(response.body.message).toBe('Invalid username or password')
  })

  test('Blog creation', async () => {
    const newBlog = {
      title: 'Blog1',
      content: 'Random blog content',
    }
    await createAdmin(user)
    const userRes = await login(user)
    const token = userRes.body.token
    await api
      .post('/')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const response = await api.get('/')
    const content = response.body.map((i: Blog) => i.content)

    expect(response.body).toHaveLength(initialBlog.length + 1)
    expect(content).toContain('Random blog content')
  })

  test('Blog delete request', async () => {
    await createAdmin(user)
    const userRes = await login(user)
    const token = userRes.body.token
    const blog = await api.get('/')
    const { body } = blog
    await api.delete(`/${body[0]._id}/deleteblog`).set('Authorization', `Bearer ${token}`).expect(204)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

interface Blog {
  title: string
  content: string
}
