import React from 'react'

const Books = (props) => {


  if (!props.show) return null;

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
          {props.book && props.book.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ display: 'flex' }}>
        <button onClick={() => props.setView('novel')}>novel</button>
        <button onClick={() => props.setView('classic')}>classic</button>
        <button onClick={() => props.setView('drama')}>drama</button>
        <button onClick={() => props.setView('commedy')}>commedy</button>
        <button onClick={() => props.setView('crime')}>crime</button>
        <button onClick={() => props.setView('')}>all</button>
      </div>
    </div>
  )
}

export default Books