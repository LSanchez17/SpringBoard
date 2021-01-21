import './App.css';
import ListTodos from "./ListTodos";
import AddTodos from './AddTodos';
import {useSelector, useDispatch} from 'react-redux';

const Todos = () => {
  //call a dispatch, abstraction
  const dispatch = useDispatch();
  //Calls the useSelector with a current state todos
  const tasks = useSelector(currState => currState.todos);

  const createTodos = (task) => {
      console.log('ive been summoned')
      dispatch({
          type:'ADD_TODO', 
          task
        });
  }

  const displayedTodos = tasks.map((todos, idx) => (
      <ListTodos id={idx} task={todos.task} />
  ))
  return (
    <div>
      <ul>{displayedTodos.length !== 0 ? displayedTodos : <h1>No Todos</h1>}</ul>
      <AddTodos addTodo={createTodos} />
    </div>
  );
}

export default Todos;
