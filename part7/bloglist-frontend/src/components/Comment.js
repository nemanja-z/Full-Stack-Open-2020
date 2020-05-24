import React from 'react'

const Comment = ({ addComment, comment }) => {

    return (
        <form id='comment' onSubmit={addComment}>
            add comment:<input
                value={comment.value}
                type={comment.type}
                onChange={comment.onChange}
                reset={comment.reset} />
            <button type='submit'>send comment</button>
        </form >
    )
}
export default Comment