const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs.map(blog => blog.toJSON()))

})
blogRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
        res.json(blog.toJSON())
    } else {
        res.status(404).end()
    }
})


blogRouter.delete('/:id', async (req, res, next) => {
    const blog = await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

blogRouter.put('/:id', async (req, res, next) => {
    const body = req.body
    const blog = { likes: body.likes }
    const updatedLikes = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.status(200).json(updatedLikes)
})


blogRouter.post('/', (req, res) => {
    const body = req.body;
    if (!body.title || !body.url) {
        return res.status(400).json({
            error: 'missing title or url'
        })
    }
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