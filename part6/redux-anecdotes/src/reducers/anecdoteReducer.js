import anecdoteService from '../services/anecdotes'

/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]



const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}*/

//const initialState = anecdotesAtStart.map(asObject)
const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INIT':
      return action.data

    case 'VOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(s => s.id === id)
      const changed = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changed
      )
    }
    case 'NEW':
      return state.concat(action.data)
    default:
      return state;
  }
}
export const voting = (anecdote) => {
  return async dispatch => {
    const update = await anecdoteService.updateVotes(anecdote)
    console.log(update)
    dispatch({
      type: 'VOTE',
      data: update
    })
  }
}
export const newAnecdote = (content) => {
  return async dispatch => {
    const newContent = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newContent
    })
  }
}
export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}


export default reducer