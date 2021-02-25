import {LOGIN, APPLY_JOB, LOGOUT} from './type';

//we combine these actions, with the dispatch
//so a sample call would be from a component
//dispatch(login())
//dispatch(applyToJob(JobId))
//dipatch(logOut())
export const Login = () => {
    return {
        type: LOGIN
    };
}

export const applyToJob = (jobId) => {
    return {
        type: APPLY_JOB, jobId
    };
}

export const logOut = () => {
    return {
        type: LOGOUT
    };
}