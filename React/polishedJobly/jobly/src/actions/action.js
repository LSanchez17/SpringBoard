import {LOGIN, APPLY_JOB, LOGOUT, REGISTER} from './type';

//we combine these actions, with the dispatch
//so a sample call would be from a component
//dispatch(login())
//dispatch(applyToJob(JobId))
//dipatch(logOut())


//logs in
export const login = (token) => {
    return (async (dispatch) => {
        return dispatch(enterSite(token));
    });
}
const enterSite = (token) => {
    return {
        type: LOGIN, token
    };
}

//registers 
export const register = (token) => {
    return (async (dispatch) => {
        return dispatch(signup(token));
    });
}
const signup = (token) => {
    return {
        type: REGISTER, token
    };
}

export const applyToJob = (jobId) => {
    return (async (dispatch) => {
        return dispatch(applyJob(jobId));
    });
}

const applyJob = (jobId) => {
    return {
        type: APPLY_JOB, jobId
    };
}


//Logs out
export const logOut = (token) => {
    return (async (dispatch) => {
        return dispatch(leaveSite(token));
    });
}

const leaveSite = (token) => {
    // console.log("im being called to return a type")
    return { type: LOGOUT, token };
}