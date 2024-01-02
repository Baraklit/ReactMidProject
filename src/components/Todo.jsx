import React, {useEffect, useState} from 'react';

const Todo = ({todoItem, onMarkedCompleted}) => {
    const [todo, setTodo] = useState({...todoItem})
    const markIsCompletedHandler = () => {
        setTodo((prevState=>{
            return {...prevState,completed:true}
        }))
    }

    useEffect(() => {
        if (todo.completed) {
            onMarkedCompleted(todo)
        }
    }, [todo]);

    return (
        <div className={"todo"}>
            <strong>Title:</strong>{todo.title}
            <br/>
            <strong>Completed: </strong>{todo.completed.toLocaleString()}
            {!todo.completed &&
                <button style={{float: "right"}} onClick={markIsCompletedHandler}>Mark Completed</button>}
        </div>
    );
};

export default Todo;
