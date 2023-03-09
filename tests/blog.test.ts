import initialBlog from './blog_helper'
import mongoose from 'mongoose'
import request from 'supertest'
import app from '../app'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Blogdata from '../models/blogDataModel'
import Admin from '../models/blogAdminModel'

beforeEach(async () => {
  await Blogdata.deleteMany({})
  await Admin.deleteMany({})
  await Blogdata.insertMany(initialBlog)
})

dotenv.config()

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
  test('Blog delete request', async () => {
    const blog = await api.get('/')
    const { body } = blog
    console.log(body)
    const response = await api.delete(`/${body[0]._id}/deletebLog`).expect(204)
  })
})

// describe('Authentication', () => {
//   const user = { username: 'testuser', password: 'testpassword' }

//   test('Should return a JWT token for a valid user', async () => {
//     await api.post('/createAdmin').send(user)
//     const response = await api.post('/login').send(user).expect(200)

//     const { token, id } = response.body
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET!)

//     const userId = typeof decodedToken === 'string' ? undefined : decodedToken.userId
//     expect(userId).toBe(id)
//   })

//   test('Should return an error for an invalid user', async () => {
//     const response = await api.post('/login').send({ username: 'invaliduser', password: 'invalidpassword' }).expect(401)

//     expect(response.body.message).toBe('Invalid username')
//   })

//   test('testing blog creation', async () => {
//     const newBlog = {
//       title: 'Blog1',
//       content: 'Random blog content',
//     }
//     const token = jwt.sign({ id: '123' }, process.env.JWT_SECRET!)
//     await api
//       .post('/')
//       .send(newBlog)
//       .set('Authorization', `Bearer ${token}`)
//       .expect(201)
//       .expect('Content-type', /application\/json/)

//     const response = await api.get('/')
//     const content = response.body.map((i: Blog) => i.content)

//     expect(response.body).toHaveLength(initialBlog.length + 1)
//     expect(content).toContain('Random blog content')
//   })
// })

afterAll(async () => {
  await mongoose.connection.close()
})

interface Blog {
  title: string
  content: string
}
