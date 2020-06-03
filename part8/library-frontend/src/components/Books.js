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
          genres
          published
          id
        }
    }
`;

const Books = (props) => {
  const fetchBooks = useQuery(ALL_BOOKS)
  const [book, setBooks] = useState(null)
  const [view, setView] = useState('')
  console.log(view, book)
  useEffect(() => {
    if (fetchBooks.data) {
      setBooks(fetchBooks.data.allBooks.filter(book => {
        for (let b of book.genres) {
          return b.toLowerCase().includes(view) ? b : null
        }

      }
      ))
    }

  }, [fetchBooks.data, view]);
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
          {book && book.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ display: 'flex' }}>
        <button onClick={() => setView('novel')}>novel</button>
        <button onClick={() => setView('classic')}>classic</button>
        <button onClick={() => setView('drama')}>drama</button>
        <button onClick={() => setView('commedy')}>commedy</button>
        <button onClick={() => setView('crime')}>crime</button>
        <button onClick={() => setView('')}>all</button>
      </div>
    </div>
  )
}

export default Books