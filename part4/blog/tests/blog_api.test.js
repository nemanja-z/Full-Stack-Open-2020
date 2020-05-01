const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const testUser = {
    name: 'Test User',
    username: 'user1',
    password: 'password',
}
beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    const newUser = await api.post('/api/users').send(testUser)

    const creds = {
        username: testUser.username,
        password: testUser.password,
    }

    const login = await api.post('/api/login').send(creds)
    token = login.body.token


})
describe('GET /blogs', () => {
    test('responds with JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    })


    test('there are two blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(2)
    })
    test('verifyng existence of unique identifier property', () => {
        const blog = new Blog(helper.initialBlogs[0])
        expect(blog.id).toBeDefined()
    })
    test('verifyng existence of likes property', () => {
        const blog = new Blog({
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll"
        })
        expect(blog.likes).toBeDefined()
    })
    test('a valid blog post can be added ', async () => {

        const newBlog = {
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain(
            "First class tests",
        )
    })


    /*  describe('deletion of a blog', () => {
          test('succeeds with status code 204 if id is valid', async () => {
              const blogsAtStart = await helper.blogsInDb()
              const blogToDelete = blogsAtStart[0]
  
              await api
                  .delete(`/api/blogs/${blogToDelete.id}`)
                  .expect(204)
  
              const blogsAtEnd = await helper.blogsInDb()
  
              expect(blogsAtEnd).toHaveLength(
                  helper.initialBlogs.length - 1
              )
  
              const title = blogsAtEnd.map(r => r.title)
  
              expect(title).not.toContain(blogToDelete.title)
          })
      })*/
    test('blog without url or title is not added', async () => {
        const newBlog = {
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

    })
})




afterAll(() => {
    mongoose.connection.close()
})