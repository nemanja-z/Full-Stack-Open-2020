const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    res.json(blogs.map(b => b.toJSON()))
})
blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id }).populate(
        'user',
        {
            username: 1,
            name: 1
        }
    );
    if (!blog) {
        res.status(404).end()

    } res.json(blog.toJSON())
})


blogsRouter.delete('/:id', async (req, res) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    const blog = await Blog.findById(req.params.id)
    const user = await User.findById(decodedToken.id);
    if (!req.token || user._id.toString() !== blog.user.toString()) {
        res.status(401).json({ "error": "you are not authorized to delete" })
    }
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()


})

blogsRouter.put('/:id', async (req, res) => {
    const { title, author, url, likes } = req.body;

    if (!title || !url) {
        return res.status(400).json({ error: 'Title or URL missing' });
    }

    const blog = { title, author, url, likes };

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
        new: true
    });

    if (!updatedBlog) {
        return res.status(400).end();
    }

    return res.status(200).json(updatedBlog);
})

blogsRouter.post('/:id/comments', async (req, res) => {
    const body = req.body
    const token = req.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(req.params.id)
    const comm = ({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: blog.user,
        comments: blog.comments.concat(body.comment)
    })

    const savedBlog = await Blog.findByIdAndUpdate(req.params.id, comm, { new: true }).populate('user', { username: 1, name: 1 })

    res.status(201).json(savedBlog.toJSON())
})


blogsRouter.post('/', async (req, res) => {
    const body = req.body


    const token = req.token

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
        comments: []
    })

    const savedBlog = await blog.save();
    await savedBlog.populate('user').execPopulate();
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save();
    res.status(201).json(savedBlog.toJSON())
})

module.exports = blogsRouter;