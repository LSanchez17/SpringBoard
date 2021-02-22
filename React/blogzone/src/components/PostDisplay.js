import React from 'react';
import Post from './Post';


const PostDisplay = ({post, toggleEditing, deletePost, vote}) => {
    const {title, description, body, votes} = post;

    return (
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <div>
                <p>{body}</p>
            </div>

            <div>
                <button onClick={toggleEditing}>Edit Post</button>
                <button onClick={deletePost}>Delete Post</button>
            </div>

            <div>
                <button onClick={evt => vote('up')}>Upvote</button>
                <p>{post.votes}</p>
                <button onClick={evt => vote('down')}>Downvote</button>
            </div>

        </div>
    )
}

export default PostDisplay;