
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

    const proba = Object.values(blog).reduce((r, k, v) => {
        r[k.author] = (r[k.author] || 0) + 1
        return r
    }, {});
    const pro = Object.entries(proba).sort((c, u) => c > u)
    return {
        author: pro[0][0],
        blogs: pro[0][1]
    }

}

const mostLikes = blog => {

    if (blog.length === 0) {
        return null
    }
    const max = Math.max(...blog.map(b => b.likes))
    const maxAuthor = blog.find(b => b.likes === max)
    return {
        author: maxAuthor.author,
        likes: maxAuthor.likes
    }
}




module.exports = {
    dummy,
    total,
    favoriteBlog,
    mostBlogs,
    mostLikes
}