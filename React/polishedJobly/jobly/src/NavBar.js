import React from 'react';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router';

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
        <nav className='bg-light shadow'>
            <ul className='nav center nav-pills nav-fill'>
                <li className='nav-item'>
                    <Link className='rounded navbar-brand' to='/'>Jobly</Link>
                </li>
            {loggedIn
            ?
            <ul className='nav nav-pills nav-fill shadow justify-content-end'>
                <li className='nav-item'><Link className='rounded navbar-brand bg-light' to='/companies'>Companies</Link></li>
                <li className='nav-item'><Link className='rounded navbar-brand bg-light' to='/jobs'>Jobs</Link></li>
                <li className='nav-item'><Link className='rounded navbar-brand bg-light' to='/profile'>Profile</Link></li>
                <li className='nav-item'>
                    <button className='rounded btn-sm btn btn-danger'onClick={leaveSite}>Logout</button>
                </li>
            </ul>
            :
            <ul className='nav nav-pills nav-fill shadow justify-content-end'>
                <li className='nav-item'><Link className='rounded navbar-brand bg-light' to='/register'>Register</Link></li>
                <li className='nav-item'><Link className='rounded navbar-brand bg-light' to='/login'>Login</Link></li>
            </ul>
            }
            </ul>
        </nav>
    )
}

export default NavBar;