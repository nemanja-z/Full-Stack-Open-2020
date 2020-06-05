import { gql } from '@apollo/client';
const BOOK_DETAILS = gql`
        fragment BOOK_DETAILS on Book{
          title
          author{
            name
            born
            bookCount
            id
          }
          published
          genres
          id
        }`

export const ALL_BOOKS = gql`
    query {
        allBooks {
          title
          author{
            name
            born
            bookCount
          }
          genres
          published
          id
        }
    }
`;
export const ADD_BOOK = gql`
    mutation addBook($title:String!,$author:String!,$published:Int!,$genres:[String!]!){
      addBook(
        title:$title,
        author:$author,
        published:$published,
        genres:$genres
        ){
          title
          author{
            name
            id
            bookCount
          }
          published
          genres
        }}`
export const LOGIN = gql`
        mutation login($username:String!,$password:String!){
            login(username:$username,password:$password){
                value
                }
            }`;
export const SET_BIRTHYEAR = gql`
        mutation editAuthor($name:String!,$setBornTo:Int!){
            editAuthor(
                name:$name,
                setBornTo:$setBornTo){
                    name
                    born
                }
        }`
export const ALL_AUTHORS = gql`
        query {
            allAuthors {
                name
                born
                bookCount
                id
            }
        }
    `;
export const GET_BOOKS = gql`
        query getBooks($genre:String!){
          allBooks(genre:$genre){
            title
          author{
            name
            id
            bookCount
          }
          published
          genres
          }
        }`
export const ME = gql`
    query{
        me{
            username
            favoriteGenre
        }
    }`;

export const BOOK_ADDED = gql`
        subscription{
          bookAdded{
            ...BOOK_DETAILS
          }
        }
        ${BOOK_DETAILS}`
