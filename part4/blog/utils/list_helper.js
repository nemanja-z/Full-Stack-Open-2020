const dummy = (blogs) => {
    return 1
}

const total = blogs => {
    const reduce = (sum, item) => { return sum + item.likes }

    return blogs.length === 0 ? 0 : blogs.reduce(reduce, 0)
}
const favoriteBlog = blog => {
    const maxPro = Math.max(...blog.map(b => b.likes))
    const obj = blog.find(b => b.likes === maxPro)
    return {
        title: obj['title'],
        author: obj['author'],
        likes: obj['likes']
    }
}

module.exports = {
    dummy,
    total,
    favoriteBlog
}