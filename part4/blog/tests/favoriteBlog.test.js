const favoriteBlog = require('../utils/list_helper').favoriteBlog


describe('Favorite blog', () => {
    const oneBlog = [{
        title: "React patterns",
        author: "Michael Chan",
        likes: 13
    }]
    const blog = [
        {
            _id: "5a422aa71b54a676254d17f8",
            title: "React patterns",
            author: "Michael Chan",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 13
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5, __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12, __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10, __v: 0
        }]
    test('when list is empty', () => {
        const blog = [];
        const result = favoriteBlog(blog)
        expect(result).toBeNull()
    })
    test('when list have one post', () => {
        const result = favoriteBlog(oneBlog)
        expect(result).toEqual(oneBlog)
    })
    test('when list have more than one post', () => {
        const result = favoriteBlog(blog)
        expect(result).toEqual(oneBlog)
    })
})
