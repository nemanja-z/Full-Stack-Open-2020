import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteForm = (props) => {

    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        props.newAnecdote(content)
        props.newNotification(content, 5)

    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = { newAnecdote, newNotification }

export default connect(null, mapDispatchToProps)(AnecdoteForm)

