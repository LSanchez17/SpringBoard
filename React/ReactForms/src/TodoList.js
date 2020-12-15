import {useState} from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    }

    const removeTodo = (id) => {
        setTodos(todos => todos.filter(todo => todo.id !== id));
    }

    const renderTodos = todos.map((todo, idx) => {
            console.log(todo)
            return <Todo key={idx} id={todo.id} task={todo.todo} remove={removeTodo}/>
        })

    return(
        <div>
            <NewTodoForm addTodo={addTodo} />
            <br />
            {renderTodos}
        </div>
    )
}

export default TodoList;