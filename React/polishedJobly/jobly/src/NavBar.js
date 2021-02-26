import React from 'react';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from './actions/action';

//Routes for the application, in a navigation bar
const NavBar = () => {
    //if logged in, display other routes, else just two
    let loggedIn = useSelector(currState => currState.token);
    let history = useHistory();
    let dispatch = useDispatch();

    const userLogOut = () => {
        //logs user out, pushes to main page
        dispatch(logOut);
        history.push('/');
    }

    return (
        <nav>
            <Link to='/'>Jobly</Link>
            <h3><small>Welcome to Jobly, your one stop shop for all the jobs!</small></h3>
            {loggedIn 
            ?
            <ul>
                <li><Link to='/companies'>Companies</Link></li>
                <li><Link to='/jobs'>Jobs</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li>
                    <button onClick={userLogOut}>Logout USERNAME</button>
                </li>
            </ul>
            :
            <ul>
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/login'>Login</Link></li>
            </ul>
            }
        </nav>
    )
}

export default NavBar;