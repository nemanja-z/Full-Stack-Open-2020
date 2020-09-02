const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
    const users = await User
        .find({}).populate('blogs');
    res.json(users.map(u => u.toJSON()));
})
usersRouter.post('/', async (req, res) => {
    const body = req.body;
    if (!body.username || body.password.length < 3) {
        return res.status(400).json({ error: 'username and password must be at least 3 characters long each' });
    };
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    });

    const savedUser = await user.save();

    res.json(savedUser);
});

module.exports = usersRouter;