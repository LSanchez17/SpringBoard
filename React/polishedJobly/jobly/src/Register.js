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
        <div className='container-fluid'>
            <h2 className='font-italic'>Sign Up!</h2>
            <form className='form-group justfiy-content-center' onSubmit={handleSubmit}>
                <label htmlFor='username'>UserName:</label>
                <input className='form-control' type='text' id='username' name='username' onChange={handleChange}></input>

                <label htmlFor='password'>Password:</label>
                <input className='form-control' type='password' id='password' name='password' onChange={handleChange}></input>

                <label htmlFor='firstName'>First Name:</label>
                <input className='form-control' type='text' id='firstName' name='firstName' onChange={handleChange}></input>

                <label htmlFor='lastName'>Last Name:</label>
                <input className='form-control' type='text' id='lastName' name='lastName' onChange={handleChange}></input>

                <label htmlFor='email'>Email:</label>
                <input className='form-control' type='email' id='email' name='email' onChange={handleChange}></input>

                <button className='btn btn-success' type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default Register;