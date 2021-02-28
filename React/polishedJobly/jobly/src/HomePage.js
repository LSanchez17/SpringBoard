import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const [userName, setUserName] = useState(null);
    const ReduxToken = useSelector(currState => currState.token);

    useEffect(() => {
        if(ReduxToken){
            let {username} = jwt.decode(ReduxToken)
            setUserName(username);
        };
    }, []);
    

    return (
        <div>
            {
            userName ?
            <h2>Hello, {userName}, welcome to Jobly.</h2>
            :
            <h2>Welcome to Jobly, login or signup to begin!</h2>
            }
        </div>
    );
}

export default HomePage;