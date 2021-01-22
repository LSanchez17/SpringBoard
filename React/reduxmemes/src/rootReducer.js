const INIT_MEMES = {
    memes: []
}

const rootReducer = (state = INIT_MEMES, action) => {
    switch(action.type){
        case 'ADD_MEME':
            return {...state, memes: [...state.memes, {...action.meme}]};
        case 'REMOVE_MEME':
            return {...state, memes: state.memes.filter(meme => meme.id !== action.id)};
        default:
            return state;
    }
}

export default rootReducer;