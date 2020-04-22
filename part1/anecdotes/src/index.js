import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0));


  const voting = () => {
    const vote = [...votes];
    vote[selected]++;
    setVotes(vote);
  }
  const mostVotes = () => {
    const mx = Math.max(...votes);
    const ind = votes.indexOf(mx);
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{props.anecdotes[ind]}</p>
        <p>has {mx} votes</p>
      </div>
    )
  }


  const random = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }
  console.log(votes, selected)
  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        {props.anecdotes[selected]}
      </div>
      <button onClick={random}>Next anecdote</button>
      <button onClick={voting}>Vote</button>
      <p>has {votes[selected]} votes</p>
      <p>{mostVotes()}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
