import React, {useState} from 'react';
import jwt from 'jsonwebtoken';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router';

const Profile = ({updateUser}) => {
    const [userData, setUserData] = useState();
    const reduxToken = useSelector(currState => currState.token);
    const history = useHistory();

    let {username} = jwt.decode(reduxToken);

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
        <div>
            <h2>Update Information</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>{username}</label>

                <label htmlFor='firstName'>First Name:</label>
                <input type='text' id='firstName' name='firstName' onChange={handleChange}></input>

                <label htmlFor='lastName'>Last Name:</label>
                <input type='text' id='lastName' name='lastName' onChange={handleChange}></input>

                <label htmlFor='email'>Email:</label>
                <input type='email' id='email' name='email' onChange={handleChange}></input>

                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default Profile;