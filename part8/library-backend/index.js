require('dotenv').config();
const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const { PubSub } = require('apollo-server');
const pubsub = new PubSub();
const jwt = require('jsonwebtoken');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const MONGODB_URI = process.env.MONGODB_URI;

console.log('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message);
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
        author: Author!
        genres: [String!]!
        id: ID!
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
            ):User
        login(
            username: String!
            password: String!
            ):Token
      }
    type Query {
        me: User
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]
        allAuthors: [Author!]!
    }
    type Subscription{
        bookAdded:Book!
    }
`
const resolvers = {
    Query: {
        allBooks: async (root, args) => {
            if (args.author && args.genre) {
                const author = await Author.findOne({ name: args.author });
                const genres = books.filter(book => book.genres.includes(args.genre));
                return genres.filter(genre => genre.author.id == author.id);
            }
            else if (args.author) {
                const author = await Author.findOne({ name: args.author });
                await Book.findById(author._id).populate('author');
            }
            else if (args.genre){
                return Book.find({ genres: { $in: [new RegExp(args.genre, 'i')] } }).populate('author');
            }
            let books = await Book.find({}).populate('author');
            return books;

        },
        me: (root, args, { currentUser }) => currentUser,
        allAuthors: () => Author.find({}),
        authorCount: () => Author.collection.countDocuments()

    },
    Author: {
        bookCount: (root) => {
            return Book.countDocuments({ author: root.id });
        }
    },
    Mutation: {
         addBook: async (root, args, { currentUser }) => {
                if (!currentUser) {
                    throw new AuthenticationError('not authenticated');
                }
                if (args.author.length < 5) {
                    throw new UserInputError('Name is to short', {
                        invalidArgs: args.author,
                    });
                }
                if (!args.title) {
                    throw new UserInputError('Title field is required', {
                        invalidArgs: args.title,
                    });
                }
                let author = await Author.findOne({ name: args.author });
                if (!author) {
                    author = new Author({ name: args.author });
                    try{
                        await author.save();
                    }catch(e){
                        throw new UserInputError(e.message, {
                            invalidArgs: args.author
                        });
                    }
                }
                const book = new Book({
                    ...args, author
                  });
                try{
                    await book.save();
                }catch(e){
                    throw new UserInputError(e.message, {
                        invalidArgs: args
                      });
                }
                pubsub.publish('BOOK_ADDED', { bookAdded: book });
                return book;
        }, 
        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError("not authenticated");
            }
            const author = await Author.findOne({ name: args.name });
            if (!author) return null;
            const updated = await Author.findOneAndUpdate(
                { "_id": author._id },
                { $set: { "born": args.setBornTo } })
            return updated;
        },
        createUser: async (root, args) => {
            if (args.username < 4 || !args.favoriteGenre) {
                throw new UserInputError('You need to enter username longer than 3 characters and favorite genre');
            }
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre });
            try {
                user.save();
            }
            catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }
            return user;
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });
            if (!user || args.password !== 'secret') {
                throw new UserInputError('Wrong credentials');
            }
            const userForToken = {
                username: user.username,
                id: user._id
                };
            
            return {
                value: jwt.sign(userForToken, process.env.SECRET)
            }

        },

    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        }
    }
}
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser };
        };

    }
});
server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
});