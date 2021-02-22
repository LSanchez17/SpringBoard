import React from 'react';
import PostForm from './PostForm';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {sendPostToApi} from '../helpers/posts';

const NewPost = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const add = ({title, description, body}) =>{
        dispatch(sendPostToApi(title, description, body));
        history.push('/');
    }

    const cancel = () => {
        history.push('/');
    }

    return (
        <div>
            <h1>New Post</h1>
            <PostForm save={add} cancel={cancel} />
        </div>
    )
}

export default NewPost;