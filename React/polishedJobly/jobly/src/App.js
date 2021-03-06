import { useDispatch, useSelector } from 'react-redux';
import {logOut, login, register} from './actions/action';
import JoblyApi from './helpers/backEndAPI';
import NavBar from './NavBar';
import Routes from './Routes';
import jwt from 'jsonwebtoken';

function App() {
  let reduxToken = useSelector(currState => currState.token);
  const dispatch = useDispatch();

  //logout, clear username, push to main page
  const userLogOut = async () => {
    //logs user out, pushes to main page
    // console.log('im the parent')
    dispatch(logOut(reduxToken));
    JoblyApi.token = null;
    return;
  }

  //register user, send dispatch to store token, push user home
  const signUserUp = async (registerInfo) =>{
    try{
      let newToken = await JoblyApi.registerUser(registerInfo);
      dispatch(register(newToken));
      return;
    }
    catch(e){
      console.log(`error during signup:${e}`);
      return;
    }
  }

  //logs in if already registered
  const letUserPass = async(loginInfo) => {
    try{
      let newToken = await JoblyApi.loginUser(loginInfo);
      dispatch(login(newToken));
      return;
    }
    catch(e){
      console.error(`error:${e}`);
      return;
    }
  }

  const updateUserData = async(username, info) => {
    console.log(username, info)
    try{
      await JoblyApi.updateUserInfo(username, info);
      return;
    } 
    catch(e){
      console.log(`Error:${e}`);
      return;
    }
  }

  return (
    <div>
      <NavBar loggedIn={reduxToken} logMeOut={userLogOut}/>
      <Routes signup={signUserUp} login={letUserPass} updateUser={updateUserData} token={reduxToken}/>
    </div>
  );
}

export default App;
