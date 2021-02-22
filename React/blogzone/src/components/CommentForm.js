import React from 'react';
import {useState} from 'react';

const CommentForm = ({submitForm}) => {
    const [text, setText] = useState();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        submitForm(text);
        setText('');
    }

    const handleChange = (evt) => {
        setText(evt.target.value);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input id='commentform-text' name='text' onChange={handleChange} />
                <button type='submit'>Add</button>
            </form>
        </div>
    );
}

export default CommentForm;