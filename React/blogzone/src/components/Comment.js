import React from 'react';

const Comment = ({id, text, deleteComment}) => {
    const handleDelete = (evt) => {
        deleteComment(id);
    }

    return (
        <div>
            <span>
                {deleteComment && (
                    <button onClick={handleDelete}>Delete</button>
                )}
            </span>

            <p>{text}</p>
        </div>
    );
}

export default Comment;