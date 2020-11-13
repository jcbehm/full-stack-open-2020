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

module.exports = {
  dummy, totalLikes, favoriteBlog
}