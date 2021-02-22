import { FETCH_POST, REMOVE_POST, ADD_POST, 
         UPDATE_POST, VOTE, ADD_COMMENT, REMOVE_COMMENT } from '../actions/type';

const rootReducer = (state={}, action) => {
    //currentPost is the current post sent into the state within the payload/action
    let currPost = state[action.postId];

    //we get posts matching the id, add by id, update by id, remove by id,
    //vote by id, add comment by id, and remove comments in this posts 
    switch(action.type){
        case FETCH_POST:
            return {...state, [action.post.id]: action.post};
        case ADD_POST:
            return {...state, [action.post.id]: {...action.post, comments:[]}};
        case UPDATE_POST:
            return {...state, [action.post.id]: {...action.post, comments: state[action.post.id].comments}};
        case REMOVE_POST:
            let posts = {...state};
            delete posts[action.postId];

            return posts;
        case VOTE:
            return {
                ...state, [action.postId]: {...currPost, votes: action.votes}
            };
        case ADD_COMMENT:
            return {
                ...state, [action.postId]: {...currPost, comments: [...currPost.comments, action.comment]}
            };
        case REMOVE_COMMENT:
            return {
                ...state, [action.postId]: {
                    ...currPost, comments: currPost.comments.filter(comment => comment.id !== action.commendId)
                }
            };
        default:
            return state;
    }
}

export default rootReducer;