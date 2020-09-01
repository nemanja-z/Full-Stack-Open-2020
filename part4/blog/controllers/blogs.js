const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();


blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs.map(blog => blog.toJSON()));

})
blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id }).populate('user', {username: 1,name: 1});
    if (!blog) {
        res.status(404).end();
    } 
    res.json(blog.toJSON());
})


blogsRouter.delete('/:id', async (req, res) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    const blog = await Blog.findById(req.params.id);
    const user = await User.findById(decodedToken.id);
    if (!req.token || user.id.toString() !== blog.user.toString()) {
        res.status(401).json({ "error": "you are not authorized to delete" });
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
})

blogsRouter.put('/:id', async (req, res) => {
    const { title, url, author, likes} = req.body;
    const targetBlog = await Blog.findById(req.params.id);
    if (!title || !url) {
        res.status(400).json({ error: 'Title or URL missing' }).end();
    }
    if(!targetBlog){
        res.status(404).end();
    }
    const blog = {title, url, author, likes};
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
        new: true
    });

    if (!updatedBlog) {
        return res.status(400).end();
    }
    res.status(200).json(updatedBlog.toJSON());
})

blogsRouter.post('/', async (req, res) => {
    const {title,likes,url,author} = req.body;
    const token = req.token;
    const decodedToken =token ? jwt.verify(token, process.env.SECRET):null;
    if (!token || !decodedToken) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    if (!title || !url) {
        return res.status(400).json({ error: 'title or url missing' });
    }
    let user = await User.findById(decodedToken.id);
    const blog = new Blog({
        title: title,
        author: author,
        url: url,
        likes: likes,
        user:user.id
    });
    const savedBlog = await blog.save();
    await savedBlog.populate('user').execPopulate();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    res.status(201).json(savedBlog.toJSON());
})

module.exports = blogsRouter;