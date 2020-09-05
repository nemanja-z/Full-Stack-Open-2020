import { gql } from '@apollo/client';
const BOOK_DETAILS = gql`
  fragment BookDetails on Book{
    id
    title
    author{
      name
      born
      bookCount
      id
    }
    published
    genres
  }`;

export const ALL_BOOKS = gql`
    query {
        allBooks {
          ...BookDetails
        }
    }${BOOK_DETAILS}
`;
export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ){
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
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
        }`;
export const ALL_AUTHORS = gql`
        query {
            allAuthors {
                id
                name
                born
                bookCount
            }
        }
    `;
export const GET_BOOKS = gql`
        query getBooks($genre:String!){
          allBooks(genre:$genre){
            id
            title
          author{
            id
            born
            name
            bookCount
          }
          published
          genres
          }
        }`;
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
        ${BOOK_DETAILS}`;
