import React from 'react';
import PropTypes from 'prop-types';

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

Comment.propTypes={
  addComment:PropTypes.func.isRequired,
  comment:PropTypes.object.isRequired
};

export default Comment;