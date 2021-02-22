import posts from './posts';
import titles from './titles';
import {combineReducers} from 'redux';

//combines two reducers, nut can be called as combineReducers.posts
// or combineReducers.titles(action.type, payload)
export default combineReducers({
    posts, titles
});