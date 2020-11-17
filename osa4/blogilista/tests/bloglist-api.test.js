const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test-helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('identificative form is named id and only id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id.toBeDefined && response.body[0]._id.not.toBeDefined)
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    'title': 'Uusi blogi',
    'author': 'Supertest',
    'url': 'www.supertest.fi',
    'likes': 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).toContain(
    'Uusi blogi'
  )
})

test('blog without title and url is not added', async () => {
  const newBlog = {
    'author': 'Aku Ankka',
    'likes': 313
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog without likes-param. is considered a blog with zero likes', async () => {
  const newBlog = {
    'title': 'ploki',
    'author': 'Timo Soini',
    'url': 'www.timosoini.fi'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain(
    'ploki'
  )
  expect(response.body
    .filter(blog => blog.title === 'ploki')
    .map(ploki => ploki.likes))
    .toEqual([0])
})

afterAll(() => {
  mongoose.connection.close()
})