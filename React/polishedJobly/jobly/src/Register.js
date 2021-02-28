import React, {useState} from 'react';
import {useHistory} from 'react-router';

const Register = ({signup}) => {
    const [userData, setUserData] = useState();
    const history = useHistory();

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setUserData(data => ({
            ...data, [name]:value
        }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        // console.log(searchTerm)
        await signup(userData);
        history.push('/');
    };

    return (
        <div>
            <h2>Sign Up!</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>UserName:</label>
                <input type='text' id='username' name='username' onChange={handleChange}></input>

                <label htmlFor='password'>Password:</label>
                <input type='password' id='password' name='password' onChange={handleChange}></input>

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

export default Register;