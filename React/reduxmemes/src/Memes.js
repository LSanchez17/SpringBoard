import './meme.css'

const Memes = ({topText, bottomText, url, removeMeme, id}) => {
    const handleRemoval = () => {
        removeMeme(id);
    }

    console.log(Memes.props)

    //used Solution CSS, save time :)
    return(
        <div className='Meme'>
            <div className='container'>
                <span className='top-text'>{topText}</span>
                <img src={url} alt='meme Image, colorized circa 2021'></img>
                <span className='bottom-text'>{bottomText}</span>
                <button id='meme_deleteBtn' onClick={handleRemoval}>Remove Meme</button>
            </div>
        </div>
    )
}

export default Memes;