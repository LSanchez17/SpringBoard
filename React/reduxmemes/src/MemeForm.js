import {useState} from 'react';

const uuid = () => {
    return Math.floor(Math.random() * 100);
}

const MemeForm = ({addMeme}) => {
    const INIT_DATA = {
        topText:'',
        bottomText:'',
        url:''
    }
    const [memeData, setMemeData] = useState(INIT_DATA);

    const handleChanges = (evt) => {
        const {name, value} = evt.target;
        setMemeData(data => ({...data, [name]: value}));
    }

    const submit = (evt) => {
        evt.preventDefault();
        addMeme({...memeData, id: uuid() })
        setMemeData(INIT_DATA);
    }


    return(
        <div>
            <form onSubmit={submit}>
                <label htmlFor='topText'>Top Text:</label>
                <input type='text' name='topText' id='topText' onChange={handleChanges} value={memeData.topText}></input>

                <label htmlFor='bottomText'>Bottom Text:</label>
                <input type='text' name='bottomText' id='bottomText' onChange={handleChanges} value={memeData.bottomText}></input>

                <label htmlFor='url'>Meme Image URL:</label>
                <input type='text' name='url' id='url' onChange={handleChanges} value={memeData.url}></input>

                <button type='submit'>Submit Meme</button>
            </form>
        </div>
    )
}

export default MemeForm;