
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommendation from './components/Recommendation'
import { useApolloClient } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED, GENRE_FILTER } from './queries'
import { useQuery, useLazyQuery, useSubscription } from '@apollo/client';



const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }

  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const client = useApolloClient();
  const [view, setView] = useState('');
  const [book, setBooks] = useState(null);
  const [fetchBooks] = useLazyQuery(GENRE_FILTER,
    { variables: { genre: view } });
  console.log(fetchBooks)

  const updateCacheWith = addedBook => {
    const includedIn = (set, object) =>
      set.map(b => b.id).includes(object.id)
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })
  /*  {
     for (let b of book.genres) {
       if (b.toLowerCase().includes(view)) return b;
     } return null;
   } */

  useEffect(() => {
    let token = localStorage.getItem('auth')
    if (token) {
      setToken(token)
    }
  }, [token])
  useEffect(() => {
    if (fetchBooks.data) {
      setBooks(fetchBooks.data.allBooks.filter(book => book
      ))
    }
  }, [fetchBooks.data, view]);


  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setError={notify}
          setToken={setToken}
        />
      </div>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token === null ? <button onClick={() => setPage('login')}>login</button> : (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>)
        }
      </div>

      <Authors
        token={token} show={page === 'authors'}
      />

      <Books
        book={book} setView={setView} show={page === 'books'}
      />

      <NewBook
        updateCacheWith={updateCacheWith} setError={setErrorMessage} show={page === 'add'}
      />
      <Recommendation show={page === 'recommend'} book={book} />


    </div>
  )
}

export default App