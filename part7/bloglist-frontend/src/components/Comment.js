import React from 'react';

const Comment = ({ addComment, comment }) => {

  return (
    <form id='comment' onSubmit={addComment}>
            add comment:<input
        {...comment}
        reset='reset' />
      <button type='submit'>send comment</button>
    </form >
  );
};
export default Comment;