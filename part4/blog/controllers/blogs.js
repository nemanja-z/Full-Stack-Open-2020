const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
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
    if (!req.token || decodedToken.id.toString() !== blog.userId.toString()) {
        res.status(401).json({ "error": "you are not authorized to delete" })
    }
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === decodedToken.id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        return response.status(204).end()
    } else {
        response.status(401).json({ error: 'user unauthorized' })
    }


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

blogsRouter.post('/', async (request, response) => {
    const body = request.body


    const token = request.token

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

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

    response.status(201).json(savedBlog.toJSON())
})

module.exports = blogsRouter;