import React from 'react';

import PropTypes from 'prop-types';
import Comment from './comment';
const CommentsList = ({ comments, onRemove }) => {
  return (comments.map((comment) => (
    <Comment
      key={comment._id}
      onRemove={onRemove}
      {...comment} />
  )
  )
  );
}
CommentsList.propTypes = {
  comments: PropTypes.array,
  onDelete: PropTypes.func
}

export default CommentsList;
