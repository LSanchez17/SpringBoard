import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {useHistory} from 'react-router';
import './styles/Navigation.css';

//Routes for the application, in a navigation bar
const NavBar = ({loggedIn, logMeOut}) => {
    const history = useHistory();
    //if logged in, display other routes, else just two
    const leaveSite = async () => {
        // console.log("im being called");
        await logMeOut();
        history.push('/');
    }

    return (
        <nav className='Navigation navbar navbar-expand-md'>
            <ul className='navbar-nav ml-auto'>
                <li className='nav-item mr-4'>
                    <NavLink className='navbar-brand' to='/'>Jobly</NavLink>
                </li>
            </ul>
            {loggedIn
            ?
            <ul className='nav-item mr-4'>
                <li className='nav-item mr-4'><NavLink to='/companies'>Companies</NavLink></li>
                <li className='nav-item mr-4'><NavLink to='/jobs'>Jobs</NavLink></li>
                <li className='nav-item mr-4'><NavLink to='/profile'>Profile</NavLink></li>
                <li className='nav-item'>
                    <button onClick={leaveSite}>Logout</button>
                </li>
            </ul>
            :
            <ul className='nav-item mr-4'>
                <li className='nav-item mr-4'><NavLink to='/register'>Register</NavLink></li>
                <li className='nav-item mr-4'><NavLink to='/login'>Login</NavLink></li>
            </ul>
            }
        </nav>
    )
}

export default NavBar;