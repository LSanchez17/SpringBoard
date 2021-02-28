import React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Companies from './Companies';
import HomePage from './HomePage';
import Jobs from './Jobs';
import Profile from './Profile';
import Register from './Register';
import Login from './Login';
import Company from './Company';

const Routes = ({signup, login, updateUser, token}) => {
    return (
        <Switch>
            <Route exact path='/'>
                {/* HomePage */}
                <HomePage token={token}/>
            </Route>

            <PrivateRoute exact path='/companies'>
                {/* All companies */}
                <Companies />
            </PrivateRoute>

            <PrivateRoute exact path='/companies/:companyName'>
                {/* Specific company */}
                <Company />
            </PrivateRoute>

            <PrivateRoute exact path='/jobs'>
                {/* List of All jobs */}
                <Jobs />
            </PrivateRoute>    

            <PrivateRoute exact path='/profile'>
                {/* Profile page for updating user info */}
                <Profile updateUser={updateUser}/>
            </PrivateRoute>

            <Route exact path='/register'>
                <Register signup={signup}/>
            </Route>

            <Route exact path='/login'>
                <Login login={login}/>
            </Route>

            <Redirect to='/' />
        </Switch>
    );
}

export default Routes;