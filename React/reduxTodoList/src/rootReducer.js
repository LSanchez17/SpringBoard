const INIT_STATE = {todos: []};

const rootReducer = (state = INIT_STATE, action) => {
    switch(action.type){
        case 'ADD_TODO':
            console.log('Dispatched!')
            console.log({...state, todos: [...state.todos, {task: action.task}]})
            return {...state, todos: [...state.todos, {task: action.task}]};
        default:
            return state;
    }
}

export default rootReducer;