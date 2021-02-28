import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useSelector } from 'react-redux';

const HomePage = ({token}) => {
    let userName;

    if(token){
        userName = jwt.decode(token)
    }
    
    return (
        <div>
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