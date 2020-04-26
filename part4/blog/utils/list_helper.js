const dummy = (blogs) => {
    return 1
}

const total = blogs => {
    const reduce = (sum, item) => { return sum + item.likes }

    return blogs.length === 0 ? 0 : blogs.reduce(reduce, 0)
}
const favoriteBlog = blog => {
    if (blog.length === 0) {
        return null;
    } else {
        const maxPro = Math.max(...blog.map(b => b.likes))
        const obj = blog.find(b => b.likes === maxPro)
        return [{
            title: obj['title'],
            author: obj['author'],
            likes: obj['likes']
        }]
    }
}
const mostBlogs = blog => {
    if (blog.length === 0) {
        return null;
    }
    else {
        const res = blog.reduce((sum, item) => {
            sum[item.author] = (sum[item.author] || 0) + 1;
            return sum, 0
        })
    } return res
}


module.exports = {
    dummy,
    total,
    favoriteBlog,
    mostBlogs
}