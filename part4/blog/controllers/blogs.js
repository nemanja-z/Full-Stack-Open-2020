const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs.map(blog => blog.toJSON()))

})
blogRouter.get('/:id', (req, res, next) => {
    Blog.findById(req.params.id)
        .then(blog => {
            if (blog) {
                res.json(blog.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})



blogRouter.delete('/:id', (req, res, next) => {
    Blog.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

blogRouter.put('/:id', (req, res, next) => {
    const body = req.body

    const blog = {
        content: body.content
    }

    Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        .then(updatedBlog => {
            res.json(updatedBlog.toJSON())
        })
        .catch(error => next(error))
})


blogRouter.post('/', (req, res) => {
    const body = req.body;
    const blog = new Blog({

        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes

    })

    blog
        .save()
        .then(result => {
            res.status(201).json(result.toJSON())
        })
})


module.exports = blogRouter;