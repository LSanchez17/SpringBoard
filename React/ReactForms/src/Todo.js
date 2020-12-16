const Todo = ({task, id, remove}) => {

    const deleteTodo = () => {
        remove(id);
    }

    return(
        <div>
            <p>My task is {task}!</p>
            <button onClick={deleteTodo}>I finished!</button>
        </div>
    )
}

export default Todo;