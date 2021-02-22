import axios from 'axios';
import {FETCH_TITLES} from '../actions/type';

const URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/posts';

export const fetchTitlesFromApi = () => {
    return (async (dispatch) => {
        const resp = await axios.get(`${URL}`);
        return dispatch(getTitles(resp.data));
    });
}

const getTitles = (titles) => {
    return { type: FETCH_TITLES, titles};
}