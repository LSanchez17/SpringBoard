import React from 'react';
import jwt from 'jsonwebtoken';
import './styles/index.css';

const HomePage = ({token}) => {
    let userName;

    if(token){
        userName = jwt.decode(token)
    }
    
    return (
        <div className='jumbotron bg-gray shadow text-center'>
            {
            userName ?
            <h2>Hello, {userName.username}, welcome to Jobly.</h2>
            :
            <h2>Welcome to Jobly, login or signup to begin!</h2>
            }
        </div>
    );
}

export default HomePage;