import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client';

export const ALL_BOOKS = gql`
    query {
        allBooks {
          title
          author{
            name
            born
            bookCount
          }
          published
          id
        }
    }
`;

const Books = (props) => {
  const fetchBooks = useQuery(ALL_BOOKS)
  const [book, setBooks] = useState(null)
  useEffect(() => {
    if (fetchBooks.data) {
      setBooks(fetchBooks.data.allBooks.map(book => book))
    }
  }, [fetchBooks.data])
  if (!props.show) return null
  if (fetchBooks.loading) return <div>loading...</div>
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {book && book.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books