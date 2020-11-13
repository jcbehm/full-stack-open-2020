const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.forEach(blog => {
    likes = likes + blog.likes
  })
  return likes
}

const favoriteBlog = (blogs) => {
  let favorite = { title: '', author: '', likes: -1 }
  blogs.forEach(blog => {
    if (favorite.likes < blog.likes) {
      favorite = blog
    }
  })
  const returningFavorite = {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
  return returningFavorite
}

const mostBlogs = (blogs) => {
  let authors = []


  blogs.forEach(blog => {
    authors.push(blog.author)
  })

  let blogsWritten = new Array(authors.length).fill(0)

  for (let i = 0; i < authors.length; i++) {
    for (let j = 0; j < authors.length; j++) {
      if (authors[j] === authors[i]) {
        blogsWritten[i]++
      }
    }
  }

  let topIndex = 0

  blogsWritten.forEach(index => {
    if (blogsWritten[index] > blogsWritten[topIndex]) {
      topIndex = index
    }
  })
  const mostBlogs = { author: authors[topIndex], blogs: blogsWritten[topIndex]}
  return mostBlogs
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}