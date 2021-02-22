import { FETCH_TITLES, REMOVE_POST, ADD_POST, UPDATE_POST, VOTE } from '../actions/type';

const sortByVotes = (posts) => {
    //return the posts in order of their votes property value
    return posts.sort((a,b) => b.votes - a.votes);
}

const makeTitle = ({id, title, description, votes}) => {
    // return a post Id,title,description, and vote for further processing
    return {id, title, description, votes};
}

const rootReducer = (state=[], action) => {
    //We update titles, get them, enter new posts, remove posts, or change votes
    switch(action.type){
        case FETCH_TITLES:
            return sortByVotes([...action.titles]);
        case ADD_POST:
            return sortByVotes([...state, makeTitle(action.post)]);
        case REMOVE_POST:
            return state.filter(title => title.id !== action.postId);
        case UPDATE_POST:
            return state.map(title => {
                if(title.id === action.post.id){
                    makeTitle(action.post);
                }
                else{
                    return title;
                }
            });
        case VOTE:
            return sortByVotes(state.map(title => {
                if(title.id === action.postId){
                    return ({...title, votes: action.votes});
                }
                else{
                    return title;
                }
            }));
        default:
            return state;
    }
}

export default rootReducer;