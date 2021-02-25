import {LOGIN, APPLY_JOB, LOGOUT} from '../actions/type';
import JoblyApi from '../helpers/backEndAPI';

//the store contains the user token for auth purposes
//and a list of what the user has applied to.
const INIT_STATE = {
    token: '',
    appliedJobs: []
}

const rootReducer = (state=INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            let loginToken = JoblyApi.login();
           
            return {
                ...state, token: loginToken
            }
        case APPLY_JOB:
            return {
                ...state, appliedJobs: [...state.appliedJobs, action.jobId]
            }
        case LOGOUT:
            return {
                ...state, token: '', appliedJobs: []
            }
        default:
            return state;
    }
}

export default rootReducer;