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

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'Programmer', url: 'www.github.com', likes: 32 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog)
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}