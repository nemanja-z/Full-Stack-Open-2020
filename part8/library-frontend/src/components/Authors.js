import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client';
import BirthForm from './BirthForm'

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

const Authors = (props) => {
  const fetchAuthors = useQuery(ALL_AUTHORS)
  const [author, setAuthors] = useState(null)
  useEffect(() => {
    if (fetchAuthors.data) {
      setAuthors(fetchAuthors.data.allAuthors.map(author => author))
    }
  }, [fetchAuthors])
  if (!props.show) return null
  if (fetchAuthors.loading) return <div>loading...</div>

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {author && author.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {!props.token ? null :
        <BirthForm authors={author} />}
    </div>
  )
}

export default Authors
