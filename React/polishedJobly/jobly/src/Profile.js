import React, {useState} from 'react';
import jwt from 'jsonwebtoken';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router';

const Profile = ({updateUser}) => {
    const [userData, setUserData] = useState();
    const reduxToken = useSelector(currState => currState.token);
    const history = useHistory();

    //future update, match username with info for placeholders
    let {username, firstname, lastname, email} = jwt.decode(reduxToken);

    // console.log(jwt.decode(reduxToken))
    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setUserData(data => ({
            ...data, [name]:value
        }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        // console.log(searchTerm)
        await updateUser(username, userData);
        history.push('/');
    };
    return (
        <div className='shadow container-fluid justify-content-center'>
            <h2 className='justify-content-center'>Update Information</h2>
            <form className='form-group justify-content-center' onSubmit={handleSubmit}>
                <p className='form'>Username: {username}</p>

                <label htmlFor='firstName'>First Name:</label>
                <input className='form-control' type='text' id='firstName' name='firstName' placeholder={firstname} onChange={handleChange}></input>

                <label htmlFor='lastName'>Last Name:</label>
                <input className='form-control' type='text' id='lastName' name='lastName' placeholder={lastname} onChange={handleChange}></input>

                <label htmlFor='email'>Email:</label>
                <input className='form-control' type='email' id='email' name='email' placeholder={email} onChange={handleChange}></input>

                <button className='btn-primary btn' type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default Profile;