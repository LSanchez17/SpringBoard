import React, { useEffect, useState } from 'react';
import PostForm from './PostForm';
import CommentList from './CommentList';
import PostDisplay from './PostDisplay';
import CommentForm from './CommentForm';
import {useSelector, useDispatch} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import {getPostFromApi, updatePostInApi, sendVoteToApi,
        sendCommentToApi, removeCommentFromApi, removePostFromApi    
} from '../helpers/posts';

const Post = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const postId = Number(useParams().postId);
    const history = useHistory();
    const post = useSelector(currState => currState.posts[postId]);
    const dispatch = useDispatch();

    useEffect( () => {
        const getPost = async () => {
            dispatch(getPostFromApi(postId));
        }

        if(!post){
            getPost();
        }
    }, [dispatch, postId, post]);

    const toggleEditing = () => {
        setIsEditing(editing => !editing);
    }

    const edit = ({title, description, body}) => {
        dispatch(updatePostInApi(postId, title, description, body));

        toggleEditing();
    }

    const deletePost = () => {
        dispatch(removePostFromApi(postId));
        history.push('/');
    }

    const vote = (direction) => {
        dispatch(sendVoteToApi(postId, direction));
    }

    const addComment = (commentText) => {
        dispatch(sendCommentToApi(postId, commentText));
    }

    const deleteComment = (commentId) => {
        dispatch(removeCommentFromApi(postId, commentId));
    }

    if(!post){
        return <p>Loading...</p>;
    }
    
    return (
        <div>
            {isEditing
             ?
             <PostForm post={post} save={edit} cancel={toggleEditing} />
             :
             <PostDisplay post={post} toggleEditing={toggleEditing} deletePost={deletePost} vote={vote} />
            }
            <div>
                <h3>Comments:</h3>
                <CommentList comments={post.comments} deleteComment={deleteComment} />
                <CommentForm submitForm={addComment} />
            </div>
        </div>
    )
}

export default Post;