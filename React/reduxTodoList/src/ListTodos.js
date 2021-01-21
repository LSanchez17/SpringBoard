import './App.css';

const ListTodos = ({id, task}) => {
    console.log(id, task)
  return (
    <div>
      <li id={id}>{task}</li>
    </div>
  );
}

export default ListTodos;
