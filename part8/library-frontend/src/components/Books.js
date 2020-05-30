import React from 'react'
import { gql, useQuery } from '@apollo/client';


export const ALL_BOOKS = gql`
    query {
        allBooks {
          title
          author
          published
          id
        }
    }
`;

const Books = (props) => {
  const fetchBooks = useQuery(ALL_BOOKS)
  if (!props.show) return null
  const books = fetchBooks.loading ? [] : fetchBooks.data.allBooks
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
          {books & books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books