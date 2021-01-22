import './App.css';
import MemeForm from './MemeForm';
import Memes from './Memes';
import {useSelector, useDispatch} from 'react-redux';

function App() {
  //access the current Store's state, and find the memes part of it
  const memes = useSelector(currState => currState.memes);
  const dispatch = useDispatch();

  const addMemes = (meme) => {
    dispatch({type: 'ADD_MEME', meme: meme});
  }

  const removeMeme = (memeId) => {
    dispatch({type: 'REMOVE_MEME', id: memeId});
  }

  const renderMemes = memes.map(meme => (
    <Memes 
    key={meme.id}
    topText={meme.topText}
    bottomText={meme.bottomText}
    url={meme.url}
    removeMeme={() => removeMeme(meme.id)}
    />
  ));

  return (
    <div className="App">
      <MemeForm addMeme={addMemes} />
      {
        renderMemes.length !== 0 ? renderMemes : <h1>Add Memes</h1>
      }
    </div>
  );
}

export default App;
