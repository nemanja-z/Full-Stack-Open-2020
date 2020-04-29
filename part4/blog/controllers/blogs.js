const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)

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
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken || !req.token) {
        res.status(401).json({ "error": "you are not authorized to delete" })
    }
    const user = await User.findById(decodedToken.id)
    if (blog.user.toString() === user._id.toString()) {
        res.status(204).end()
    }

})

blogRouter.put('/:id', async (req, res, next) => {
    const body = req.body
    const blog = { likes: body.likes }
    const updatedLikes = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.status(200).json(updatedLikes)
})


blogRouter.post('/', async (req, res) => {
    const body = req.body;
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    if (!body.title || !body.url) {
        return res.status(400).json({
            error: 'missing title or url'
        })
    }
    const blog = new Blog({

        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id

    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedNote._id)
    await user.save()
    res.status(201).json(savedBlog.toJSON())

})/*
blogRouter.post('/', async (req, res, next) => {
    const body = req.body
    if (!body.title || !body.url) {
        return res.status(400).json({
            error: 'missing title or url'
        })
    }
    const user = await User.findById(body.userId)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.json(savedBlog.toJSON())
})

*/
module.exports = blogRouter;