import { useState } from 'react';
import './App.css';

const AddTodos = ({addTodo}) => {
  //we update a task at a time, since only one todo can be added as such
  const [todos, setTodos] = useState('');
  
  const handleFormChange = (evt) => {
    const {value} = evt.target;

    setTodos(value);
  }

  const submitTodos = (evt) => {
    evt.preventDefault();
    // console.log('adding')
    addTodo(todos);
    setTodos('')
  }

  return (
    <div>
      <form onSubmit={submitTodos}>
          <label htmlFor='Todo'>Todo Name:</label>
          <input htmlFor='Todo' id='Todo' name='Todo' onChange={handleFormChange}></input>
          <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default AddTodos;
