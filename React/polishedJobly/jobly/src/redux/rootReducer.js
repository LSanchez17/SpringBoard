import {LOGIN, APPLY_JOB, LOGOUT, REGISTER} from '../actions/type';

//the store contains the user token for auth purposes
//and a list of what the user has applied to.
const INIT_STATE = {
    token: null,
    appliedJobs: []
}

const rootReducer = (state=INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN:           
            return { ...state, token: action.token }
        case REGISTER:
            return { ...state, token: action.token }
        case APPLY_JOB:
            return { ...state, appliedJobs: [...state.appliedJobs, action.jobId] }
        case LOGOUT:
            let userToken = {...state};
            delete userToken.token;

            return userToken;
        default:
            return state;
    }
}

export default rootReducer;