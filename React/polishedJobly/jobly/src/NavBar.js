import React from 'react';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router';

//Routes for the application, in a navigation bar
const NavBar = () => {
    //if logged in, display other routes, else just two
    let loggedIn = true;
    let history = useHistory();

    const logOut = () => {
        //logs user out, pushes to main page
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
                    <button onClick={logOut}>Logout USERNAME</button>
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