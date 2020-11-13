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

const mostLikes = (blogs) => {
  let authors = []

  blogs.forEach(blog => {
    authors.push(blog.author)
  })

  let authorLikes = new Array(authors.length).fill(0)

  for (let i = 0; i < authors.length; i++) {
    authorLikes[i] = authorLikes[i] + blogs[i].likes
  }

  for (let i = 0; i < authors.length; i++) {
    for (let j = i+1; j < authors.length; j++) {
      if (authors[j] === authors[i]) {
        authorLikes[j] = authorLikes[i] + authorLikes[j]
        { break }
      }
    }
  }

  let topIndex = 0

  for (let i = 0; i < authorLikes.length; i++) {
    if (authorLikes[i] > authorLikes[topIndex]) {
      topIndex = i
    }
  }

  const mostLikes = { author: authors[topIndex], likes: authorLikes[topIndex]}
  return mostLikes
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}