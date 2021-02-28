import React from 'react';
import { useSelector } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({exact, path, children}) => {
    const reduxToken = useSelector(currState => currState.token);

    if(!reduxToken){
        return <Redirect to='/login' />;
    }

    return (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    )
}

export default PrivateRoute;