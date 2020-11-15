const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: 'Tyä miehen blogi',
    author: 'Kauppisen Pete',
    url: 'www.kauppisenmaansiirtofirma.fi',
    likes: 1
  },
  {
    title: 'Pinkun vaatehuone',
    author: 'Pinkkubee',
    url: 'www.pinkkubee.fi/blogi',
    likes: 24
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
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

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain(
    'Uusi blogi'
  )
})
/*
test('blog without url is not added', async () => {
  const newBlog = {
    'title': 'Uskomaton blogi',
    'author': 'Jeesus',
    'likes': 777
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})
*/
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

  expect(response.body).toHaveLength(initialBlogs.length + 1)
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