import React, {useEffect, useState} from 'react';
import Todo from "./Todo.jsx";
import NewTodo from "./NewTodo.jsx";

const Todos = ({user, updateTodos}) => {
    const [todos, setTodos] = useState([...user.todos])
    const [newTodo, setNewTodo] = useState({title: '', completed: false})
    const [newTodoView, setNewTodoView] = useState(false)
    const [todosCounter, setTodosCounter] = useState('')

    const styles = {
        div: {
            display: 'flex', flexDirection: "row", justifyContent: "space-between", marginBottom: '4px'
        },
        todosDiv: {
            border: '1px solid black',
            padding: '10px'
        }
    }

    const markedCompletedHandler = (todo) => {
        setTodos(prevTodos => prevTodos.map(todoObject => todoObject.id === todo.id ? {
            ...todo
        } : {...todoObject}))
    }

    useEffect(() => {
        const customTodoId = user.id === 1 ? todos.length : user.id.toLocaleString() + todos.length.toLocaleString()
        setTodosCounter(customTodoId)
    });

    useEffect(() => {
        updateTodos(todos, user.id, "todos")
    }, [todos]);

    useEffect(() => {
        if (newTodo.title !== '') {
            setTodos((prevState => ([...prevState, newTodo])))
        }
        setNewTodoView(false)
    }, [newTodo]);


    return (<>
        <div style={styles.div}>
            {!newTodoView && <span>Todos - User {user.id}</span>}
            {newTodoView && <span>New Todo - User {user.id}</span>}
            <button onClick={() => {
                setNewTodoView(true)
            }}>New Task
            </button>
        </div>
        <div style={styles.todosDiv}>
            {!newTodoView && todos.map((todo) => (
                <Todo key={`User${user.id}Todo${todo.id}`} onMarkedCompleted={markedCompletedHandler} todoItem={todo}/>))}
            {newTodoView && <NewTodo key={`NewTodo User${user.id}`} userId={user.id} todoId={+todosCounter + 1}
                                     createNewTodo={setNewTodo} onCancelHandler={setNewTodoView}/>}
            {(!todos.length && !newTodoView ) && <h3 style={{textAlign:'center'}}>No Todos</h3>}
        </div>
    </>);
};

export default Todos;
