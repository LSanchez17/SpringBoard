import React from 'react';
import Comment from './Comment';

const CommentList = ({comments = [], deleteComment}) => {
    return (
        comments.map(comment => (
            <Comment key={comment.id} id={comment.id} text={comment.text} deleteComment={deleteComment} />
        ))
    );
}

export default CommentList;