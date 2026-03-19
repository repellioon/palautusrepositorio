const dummy = (blogs) => {
    return 1
}

const totalLikes = (bloglist) => {

const likes = bloglist.reduce(
    (accumlator, blogs) => accumlator + blogs.likes, 
    0, )
return likes
}

module.exports = {
    dummy,
    totalLikes
}