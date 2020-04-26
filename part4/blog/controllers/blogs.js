const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs.map(blog => blog.toJSON()))
        })
})

blogRouter.post('/', (req, res) => {
    const blog = new Blog(req.body)

    blog
        .save()
        .then(result => {
            res.status(201).json(result.toJSON())
        })
})


module.exports = blogRouter;