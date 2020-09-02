import React from 'react';
import { voting } from '../reducers/anecdoteReducer';
import { voteNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';



const AnecdoteList = (props) => {
    
    const vote = (anecdotes) => {
        props.voting(anecdotes);
        props.voteNotification(anecdotes.content, 5);
    };
    return (
        <div>
            <h2>Anecdotes</h2>
            {props.anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>)}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes.slice().sort((a, b) => a.votes < b.votes).filter(a => a.content.toLowerCase().startsWith(state.filter.toLowerCase()))
    };
};
const mapDispatchToProps = { voting, voteNotification };

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
