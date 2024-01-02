import React, {useState} from 'react';

const NewTodo = ({userId, todoId, createNewTodo, onCancelHandler}) => {
    const [title, setTitle] = useState("")

    const cancelHandler = () => {
        onCancelHandler(false)
    }

    const createNewTodoHandler = () => {
        createNewTodo({userId, id: todoId, title, completed: false})
    }

    return (
        <div>
            <label>Title: </label><input type={"text"} onChange={(e) => {
            setTitle(e.target.value)
        }}/>
            <div style={{
                display: "flex",
                margin: "10px 0 0 0",
                justifyContent: "flex-end"
            }}>
                <button onClick={createNewTodoHandler}>Add</button>
                <button onClick={cancelHandler}>Cancel</button>
            </div>
        </div>
    );
};

export default NewTodo;
