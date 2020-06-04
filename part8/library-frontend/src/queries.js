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
export const GENRE_FILTER = gql`
        query allBooks($genre:String!){
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
