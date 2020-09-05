import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_BOOKS } from '../queries';


const Books = ({book, show, setError}) => {

  const [bookByGenre, setBooksByGenre] = useState(null);
  const [getBooks, { data}] = useLazyQuery(GET_BOOKS, {
    onError:e=>{ setError(e.graphQLErrors[0].message) }
  });

  const filterByGenre = async genre => {
    getBooks({ variables: { genre: genre.toString() } });
  };
  useEffect(() => {
    if (data) {
      setBooksByGenre(data.allBooks);
    }
  }, [data])
  if (!show || !book) return null;
  const genres = book.map(book => book.genres.map(g => g.toLowerCase())).flat();
  const filterGenre = [...new Set(genres)];
  
  if (bookByGenre) {
    return (
      <div>
        <h2>filtered books</h2>
        <table>
          <tbody>
            <tr>
              <th>
                title
              </th>
              <th>
                author
            </th>
              <th>
                published
            </th>
            </tr>
            {bookByGenre.map(b =>
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            )}
          </tbody>
        </table>
        <button onClick={() => setBooksByGenre(null)}>clear filter</button>
      </div>
    )
  }
  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {book.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {filterGenre.map(b =>
        <button key={b} onClick={() => filterByGenre(b)}>{b}</button>

      )}
    </div>
  )
}

export default Books;