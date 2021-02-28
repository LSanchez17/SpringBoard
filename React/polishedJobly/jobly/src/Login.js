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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>UserName:</label>
                <input type='text' id='username' name='username' onChange={handleChange}></input>

                <label htmlFor='password'>Password:</label>
                <input type='password' id='password' name='password' onChange={handleChange}></input>

                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default Login;