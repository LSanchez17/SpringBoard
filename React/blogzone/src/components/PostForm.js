import React, { useState } from 'react';

const PostForm = ({ post, save, cancel}) => {
    const [postData, setPostData] = useState({
        title: post.title, 
        description: post.description,
        body: post.body
    });

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setPostData(data => ({
            ...data, [name]: value
        }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        save(postData);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='editform-title'>Title:</label>
                <input onChange={handleChange} id='editform-title' name='title' />

                <label htmlFor='editform-description'>Description:</label>
                <input onChange={handleChange} id='editform-description' name='description' />

                <label htmlFor='editform-body'>Body:</label>
                <textarea onChange={handleChange} id='editform-body' name='body' />

                <button>Save Post</button>
                <button onClick={cancel}>Cancel</button>
            </form>
        </div>
    )
}

PostForm.defaultProps = {
    post: {title: '', description: '', body: ''}
}

export default PostForm;