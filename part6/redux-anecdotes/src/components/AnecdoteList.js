import React from 'react'
import { voting } from '../reducers/anecdoteReducer'
import { voteNotification, clearNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'


const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        return !filter ? anecdotes.sort((a, b) => a.votes < b.votes) :
            anecdotes.filter(a => a.content.toLowerCase().startsWith(filter.toLowerCase()))
    })

    const dispatch = useDispatch()
    const vote = (id, content) => {
        dispatch(voting(id))
        dispatch(voteNotification(content))
        setTimeout(() => dispatch(clearNotification()), 5000)
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
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>)}
        </div>
    )
}


export default AnecdoteList
