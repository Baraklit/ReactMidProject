import React, {useEffect, useState} from 'react';
import OtherDataUser from "./OtherDataUser.jsx";

const User = (props) => {
    //States
    const [user, setUser] = useState({
        ...props.user
    })

    const [showOtherData, setShowOtherData] = useState(false)
    const [isCompleteAllTodos, setIsCompleteAllTodos] = useState(false)
    const updateAddressDataHandler = (address) => {
        setUser({...user, address})
    }

    useEffect(() => {
        const completedTodos = user.todos.map(todo => todo.completed)
        setIsCompleteAllTodos(completedTodos.includes(false))
    }, [user]);

    return (
        <div className={"user-card"}
             style={Object.assign(
                 {},
                 isCompleteAllTodos ? {border: '2px solid red', borderRadius: '4px'} : {
                     border: '2px solid green',
                     borderRadius: '4px'
                 },
                 props.isSelected ? {backgroundColor: 'lightsalmon'} : {backgroundColor: 'unset'}
             )}>
            <span onClick={() => {
                props.onUserSelect(user)
            }}>ID: {user.id}</span>
            <br/>
            Name: <input type={"text"} value={user.name} onChange={(e) => setUser({...user, name: e.target.value})}/>
            <br/>
            Email: <input type={"text"} value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>
            <br/>
            <div className={"user-actions"}>
                <span className={"other-data-span"} onMouseOver={() => setShowOtherData(true)}
                      onClick={() => setShowOtherData(false)}>Other Data</span>
                {showOtherData &&
                    <OtherDataUser key={`OtherData${user.id}`} changeAddressDataHandler={updateAddressDataHandler}
                                   address={user.address}/>}
                <div className={"user-buttons"}>
                    <button onClick={() => {
                        props.onUserUpdate(user)
                    }}>Update
                    </button>
                    <button onClick={() => {
                        props.onUserDelete(user.id)
                    }}>Delete
                    </button>
                </div>

            </div>

        </div>
    );
};

export default User;
