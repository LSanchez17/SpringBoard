import { useDispatch, useSelector } from 'react-redux';
import {logOut, login, register} from './actions/action';
import JoblyApi from './helpers/backEndAPI';
import NavBar from './NavBar';
import Routes from './Routes';

function App() {
  let reduxToken = useSelector(currState => currState.token);
  const dispatch = useDispatch();

  console.log(reduxToken)
  //logout, clear username, push to main page
  const userLogOut = async () => {
    //logs user out, pushes to main page
    // console.log('im the parent')
    dispatch(logOut(reduxToken));
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

  return (
    <div>
      <NavBar loggedIn={reduxToken} logMeOut={userLogOut}/>
      <Routes signup={signUserUp} login={letUserPass}/>
    </div>
  );
}

export default App;
