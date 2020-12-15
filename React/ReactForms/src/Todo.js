const Todo = ({task, id, remove}) => {

    const deleteTodo = () => {
        remove(id);
    }

    return(
        <div>
            <p>My task is {task}!</p>
            <button onClick={deleteTodo}>X</button>
        </div>
    )
}

export default Todo;