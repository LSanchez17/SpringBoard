//Initital empty mood
const INIT_MOOD = {mood: null, emoji: null};
//Returns a state based on its actiont type;
const moodReducer = (state=INIT_MOOD, action) => {
    // console.log(state, action)
    // console.log(action.type)
    switch(action.type){
        case 'happy':
            return {...state, mood: 'happy', emoji:'UwU'};
        case 'sad':
            return {...state, mood: 'sad', emoji:';-;'};
        case 'angry':
            return {...state, mood: 'angry', emoji: '⋋_⋌'};
        case 'confused':
            return {...state, mood: 'confused' ,emoji:'(・・?'};
        default:
            return state;
    }
}
//Initialize the store, with management(moodReducer)
const store = Redux.createStore(moodReducer);

const emojiDisplay = document.querySelector('#emojiDisplay');
const buttonPressed = document.querySelectorAll('#buttons');

//This is called, after the state is set in the store by the dispatch
//then update it! Refer to this for clarification later down the road :)
const createMood = () => {
    if(emojiDisplay.hasChildNodes()){
        emojiDisplay.removeChild(emojiDisplay.children[0]);
    }
    let mood = store.getState();
    let newEmoji = document.createElement('h1');
    newEmoji.innerText = mood.emoji;
    emojiDisplay.appendChild(newEmoji);
}

//This will call the store, and speak to management, depending on the mood used
const moodShift = (userMood) => {
    // console.log(userMood)
    store.dispatch({type: userMood});
}

buttonPressed.forEach(button => {
    button.addEventListener("click", (evt) => {
        // console.log(evt.target.innerText);
        let mood = evt.target.innerText;
        moodShift(mood.toLowerCase());
        createMood();
    })
})