const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
require('dotenv').config()


mongoose.set('useFindAndModify', false)

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
      }
    type Query {
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
        /* allAuthors: () => {
             return authors.map(author => {
 
                 return {
                     ...author,
                     bookCount: books.filter(book => book.author === author.name).length
                 }
             })
         }*/
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments()

    },
    Mutation: {
        addBook: async (root, args) => {
            const book = new Book({ ...args })
            try {
                await books.save()
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
            const author = Author.findOne({ name: { $eq: args.name } })
            if (!author) return null
            else {
                const updatedAuthor = Author.updateOne(
                    { "_id": author._id },
                    { $set: { "born": args.setBornTo } })
                return updatedAuthor
            }

        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})