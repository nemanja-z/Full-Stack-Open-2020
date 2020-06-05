import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client';
import { GET_BOOKS } from '../queries'
const Books = (props) => {
  const [bookByGenre, setBooksByGenre] = useState(null)
  const [getBooks, { data, called, loading }] = useLazyQuery(GET_BOOKS);


  const filterByGenre = async genre => {
    getBooks({ variables: { genre: genre.toString() } })
  }
  useEffect(() => {
    if (data) {
      setBooksByGenre(data.allBooks)
    }
  }, [data])
  if (!props.book) return <div>waiting...</div>
  const genres = props.book.map(book => book.genres).flat().map(b => b.toLowerCase())
  const filterGenre = [...new Set(genres)]
  console.log(filterGenre)

  if (loading) return <div>loading...</div>
  if (!props.show) return null;
  if (bookByGenre) {
    return (
      <div>
        <h2>filtered books</h2>

        {bookByGenre.map(b =>
          <div key={b.title}>
            <div>{b.title}</div>
            <div>{b.author.name}</div>
            <div>{b.published}</div>
            <button onClick={() => setBooksByGenre(null)}>clear filter</button>
          </div>
        )}
      </div>
    )
  }
  return (
    <div>
      <h2>books</h2>


      {props.book && props.book.map(b =>
        <div key={b.title}>
          <div>{b.title}</div>
          <div>{b.author.name}</div>
          <div>{b.published}</div>
        </div>
      )}
      {filterGenre.map(b =>
        <button key={b} onClick={() => filterByGenre(b)}>{b}</button>

      )}
    </div>
  )
}

export default Books