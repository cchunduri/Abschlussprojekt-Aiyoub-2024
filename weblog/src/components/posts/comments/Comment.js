import React from 'react';

const Comment = ({ comment }) => (
  <div>
    <p>{comment.text}</p>
    <p><strong>- {comment.author}</strong></p>
  </div>
);

export default Comment;
