import axios from 'axios';
import {REMOVE_POST, ADD_POST, UPDATE_POST, VOTE, ADD_COMMENT, 
        REMOVE_COMMENT, FETCH_POST} from '../actions/type';

const URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/posts';

export const getPostFromApi = (id) => {
    //performs an asynchrounous action to retrieve the data 
    //aka post, from the API backend
    return (async (dispatch) => {
        const resp = await axios.get(`${URL}/${id}`);
        return dispatch(getPost(resp.data));
    });
}

const getPost = (post) => {
    return { type: FETCH_POST, post}
}

export const sendPostToApi = (title, description, body) => {
    return (async (dispatch) => {
        const resp = await axios.post(`${URL}`, {
            title, description, body });
        return dispatch(addPost(resp.data));
    })
}

const addPost = (post) => {
    return {type: ADD_POST, post};
}

export const removePostFromApi = (id) => {
    return (async (dispatch) => {
        await axios.delete(`${URL}/${id}`);
        return dispatch(removePost(id));
    });
}

const removePost = (id) => {
    return { type: REMOVE_POST, id};
}

export const updatePostInApi = (id, title, description, body) => {
    return (async (dispatch) => {
        const resp = await axios.put(`${URL}/${id}`, {
            title, description, body
        });
        return dispatch(updatePost(resp.data));
    });
}

const updatePost = (post) => {
    return { type: UPDATE_POST, post};
}

export const sendVoteToApi = (id, direction) => {
    return (async (dispatch) => {
        const resp = await axios.post(`${URL}/${id}/vote/${direction}`);
        return dispatch(vote(id, resp.data.votes));
    });
}

const vote = (postId, votes) => {
    return { type: VOTE, postId: postId, votes: votes};
}

export const removeCommentFromApi = (postId, commentId) => {
    return (async (dispatch) => {
        await axios.delete(`${URL}/${postId}/comments/${commentId}`);
        return dispatch(removeComment(postId, commentId));
    });
}

const removeComment = (postId, commentId) => {
    return { type: REMOVE_COMMENT, postId, commentId};
}

export const sendCommentToApi = (postId, text) => {
    return (async (dispatch) => {
        const resp = await axios.post(`${URL}/${postId}/comments/`, {
            text
        });
        return dispatch(addComment(postId, resp.data));
    });
}

const addComment = (postId, comment) => {
    return { type: ADD_COMMENT, postId, comment};
}