
import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import Recommendation from './components/Recommendation';
import { useApolloClient } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED } from './queries';
import { useSubscription, useQuery } from '@apollo/client';

const Notify = ({ errorMessage }) => {
  
  if (!errorMessage) {
    return null;
  }
  
  return (
        <div style={{ color: 'red' }}>
          {errorMessage}
        </div>
      );
  }


const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const client = useApolloClient();
  const [book, setBooks] = useState(null);
  const fetchBooks = useQuery(ALL_BOOKS);

  const updateCacheWith = addedBook => {
    const includedIn = (set, object) =>
    set.map(b => b.id).includes(object.id)
    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      });
    }
  }
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`${addedBook.title} added`);
      updateCacheWith(addedBook);
    }
  });

  useEffect(() => {
    let token = localStorage.getItem('auth');
    if (token) {
      setToken(token);
    }
  }, [token])

  useEffect(() => {

    if (fetchBooks.data) {
      setBooks(fetchBooks.data.allBooks.map(book => book));
    }
  }, [fetchBooks.data]);
  
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };
  const handleMessage = msg =>{
    setErrorMessage(msg);
    return setTimeout(()=>{
      setErrorMessage(null);
    },5000);
  }
  if (!token) {
      return (
        <div>
        <Notify errorMessage={errorMessage} />
          <h2>Login</h2>
          <LoginForm
            setError={handleMessage}
            setToken={setToken}
          />
        </div>
      )
    }
  return (
    <div>
    <Notify errorMessage={errorMessage}/>
      <div>
        {token === null ? <button onClick={() => setPage('login')}>login</button> : (
          <>
            <button onClick={() => setPage('authors')}>authors</button>
            <button onClick={() => setPage('books')}>books</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>)
        }
      </div>
        <Authors token={token} show={page === 'authors'}/>
        
        <Books book={book} show={page === 'books'} setError={handleMessage}/>
        
        <NewBook updateCacheWith={updateCacheWith} setError={handleMessage} show={page === 'add'}/>

        <Recommendation show={page === 'recommend'} book={book} />
      
    </div>
  )
}

export default App;