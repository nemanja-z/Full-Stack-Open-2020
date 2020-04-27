const mostBlogs = require('../utils/list_helper').mostBlogs


describe('Author with largest amount of blogs', () => {

    test('when list is empty', () => {
        const blog = [];
        const result = mostBlogs(blog)
        expect(result).toBeNull()
    })
    test('when list have one blog', () => {
        const oneBlog = [{
            _id: "5a422aa71b54a676254d17f8",
            title: "React patterns",
            author: "Michael Chan",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 13
        }]
        const result = mostBlogs(oneBlog)
        expect(result).toEqual({
            author: "Michael Chan",
            blogs: 1
        })
    })
    test('when list have more than one blog post', () => {
        const blog = [
            {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 5, __v: 0
            },
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
        const ones =
        {
            "author": "Edsger W. Dijkstra",
            "blogs": 3
        }

        expect(mostBlogs(blog)).toEqual(ones)
    })
})