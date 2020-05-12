import React from 'react'
import { voting } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => a.votes < b.votes))
    const dispatch = useDispatch()
    const vote = (id) => {
        dispatch(voting(id))
    }
    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>)}
        </div>
    )
}


export default AnecdoteList
