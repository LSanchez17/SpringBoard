import React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import Companies from './Companies';
import HomePage from './Homepage';
import Jobs from './Jobs';
import Profile from './Profile';
import Register from './Register';
import Login from './Login';

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact>
                {/* HomePage */}
                <HomePage />
            </Route>

            <Route path='/companies' exact>
                {/* All companies */}
                <Companies />
            </Route>

            <Route path='/jobs' exact>
                {/* List of All jobs */}
                <Jobs />
            </Route>    

            <Route path='/profile' exact>
                {/* Profile page for updating user info */}
                <Profile />
            </Route>

            <Route path='/register' exact>
                <Register />
            </Route>

            <Route path='/login' exact>
                <Login />
            </Route>

            <Redirect to='/' />
        </Switch>
    );
}

export default Routes;