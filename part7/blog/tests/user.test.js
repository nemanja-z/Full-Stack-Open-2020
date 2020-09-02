const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);


describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'malaka',
            name: 'Herbiko',
            password: 'hamalainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails if password length is less than 3 characters', async () => {

        const newUser = {
            username: 'mleko',
            name: 'Aaritalo Ljuba',
            password: 'sa',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

    })
})
afterAll(() => {
    mongoose.connection.close()
  });