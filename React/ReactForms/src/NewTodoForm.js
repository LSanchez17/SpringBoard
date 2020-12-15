import {useState} from 'react';
import {v4 as uuid} from 'uuid'

/*
* Form for adding new Todos to App.js
* Clear input value after submission
* Pass down to Todo component props of todo, delete()
*/

const NewTodoForm = ({addTodo}) => {
    const INITSTATE = {
        todo: ''
    }
    const [todo, setTodo] = useState(INITSTATE);

    const handleFormChange = (evt) => {
        const {name, value} = evt.target;
        setTodo({...todo, [name]:value});
    }

    const handleSubmission = (evt) => {
        evt.preventDefault();
        addTodo({...todo, id:uuid()});
        // console.log(todo)
        setTodo(INITSTATE);
    }

    return(
        <div>
            <form onSubmit={handleSubmission}>
                <label htmlFor='todo'>Add a todo:</label>
                <input type='text' name='todo' onChange={handleFormChange} value={todo.todo} />
                <button type='submit'>Submit</button>
            </form>
            
        </div>
    )
}

export default NewTodoForm;