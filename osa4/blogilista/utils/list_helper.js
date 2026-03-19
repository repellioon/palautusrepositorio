const dummy = (blogs) => {
    return 1
}

const totalLikes = (bloglist) => {
const likes = bloglist.reduce(
    (sum, blogs) => sum + blogs.likes, 0, )
return likes
}

const favoriteBlog = (bloglist) => {
  if (bloglist.length === 0) {
    return null
  }

  return bloglist.reduce((best, blog) =>
    blog.likes > best.likes ? blog : best
  )
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}