require('dotenv').config()
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')


const JWT_SECRET = process.env.SECRET

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true);

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
    type Author {
        name: String!
        born: Int
        bookCount: Int!
        id: ID!
    }  
    type Book {
        title: String!
        published: Int!
        author: String!
        id: ID!
        genres: [String!]!
    }
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
        }

    type Token {
        value: String!
        }
    type Mutation {
        addBook(
          title: String!
          author: String!
          published: Int!
          genres: [String!]!
        ): Book
        editAuthor(    
        name: String!    
        setBornTo: Int!
        ): Author
        createUser(
            username: String!
            favoriteGenre:String!
          ): User
        login(
            username: String!
            password: String!
          ): Token
      }
    type Query {
        me: User
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]
        allAuthors: [Author!]!
    }
`
const resolvers = {
    Query: {
        allBooks: (root, args) => {
            if (args.author && args.genre)
                return Book.find({ $and: [{ author: { $eq: args.author } }, { genres: { $in: args.genre } }] });
            else if (args.author)
                return Book.find({ author: { $eq: args.author } });
            else if (args.genre)
                return Book.find({ genres: { $eq: args.genre } });
            else return books;
        },
        me: (root, args, context) => context.currentUser,
        allAuthors: () => Authors.find({}),
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments()

    },
    Mutation: {
        addBook: async (root, args) => {
            const book = new Book({ ...args })
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }
            if (!args.title || !args.author || !args.published || !args.genres) {
                throw new UserInputError('Missing fields', {
                    invalidArgs: args,
                });
            }
            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            const author = Author.findOne({ name: { $eq: args.author } })
            if (!author) {
                let authorr = new Author({ ...args })
                try { await authorr.save() }
                catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }
            }
            return book
        },
        editAuthor: async (root, args) => {
            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }
            const author = Author.findOne({ name: { $eq: args.name } })
            if (!author) return null
            else {
                const updatedAuthor = Author.updateOne(
                    { "_id": author._id },
                    { $set: { "born": args.setBornTo } })
                return updatedAuthor
            }

        },
        createUser: async (root, args) => {
            const user = new User({ ...args })
            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        inalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = User.findOne({ username: args.username })
            if (!user || password !== 'secred') {
                throw new UserInputError('wrong credentials')
            }
            const userForToken = {
                username: user.username,
                id: user._id
            }
            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})