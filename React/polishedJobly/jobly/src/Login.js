import React, {useState} from 'react';
import { useHistory } from 'react-router';

const Login = ({login}) => {
    const [userData, setUserData] = useState();
    const history = useHistory();

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setUserData(data => ({
            ...data, [name]: value
        }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        // console.log(searchTerm)
        await login(userData);
        history.push('/');
    };

    return (
        <div className='container-fluid'>
            <h2 className='font-italic'>Login</h2>
            <form className='form-group justfiy-content-center' onSubmit={handleSubmit}>
                <label htmlFor='username'>UserName:</label>
                <input className='form-control' type='text' id='username' name='username' onChange={handleChange}></input>

                <label htmlFor='password'>Password:</label>
                <input className='form-control' type='password' id='password' name='password' onChange={handleChange}></input>

                <button className='btn btn-success' type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default Login;