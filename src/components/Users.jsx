import React, {useEffect, useState} from 'react';
import {getAllPosts, getAllTodos, getAllUsers, getPostsByUserId, getTodosByUserId} from "../utils.js";
import User from "./User.jsx";
import Todos from "./Todos.jsx";
import Posts from "./Posts.jsx";
import NewUser from "./NewUser.jsx";

const Users = () => {
    // States
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState({})
    const [usersCounter, setUsersCounter] = useState(0)
    const [showUserTodosAndPosts, setShowUserTodosAndPosts] = useState(false)
    const [showNewUser, setShowNewUser] = useState(false)
    //Functions
    const setUsersHandler = (users) => {
        setUsers(users);
        setFilteredUsers(users);
    }

    const createNewUser = (user) => {
        setUsersHandler([...users, user])
        setShowNewUser(false)
    }
    const setUserContent = (content, userId, type) => {
        const updatedUsers = users.map(user => {
            if (user.id === userId) {
                user[type] = [...content];
            }
            return {...user};
        })
        setUsersHandler(updatedUsers)
    }
    const getUserTodos = async (userId) => {
        const {data: todos} = await getTodosByUserId(userId)
        return todos
    }

    const getUserPosts = async (userId) => {
        const {data: posts} = await getPostsByUserId(userId)
        return posts
    }

    const selectedUserHandler = (user) => {
        setSelectedUser(user)
        setShowNewUser(false)
    }

    const userDeleteHandler = (userId) => {
        const filteredUsers = users.filter(user => user.id !== userId)
        setUsersHandler(filteredUsers)
    }

    const userUpdateHandler = (user) => {
        const usersAfterUpdate =
            users.map(userObject =>
                userObject.id === user.id ? {...user} : {...userObject}
            )
        setUsersHandler(usersAfterUpdate)
    }

    const filterUsersHandler = (e) => {
        const userNameLowerCase = e.target.value.toLowerCase();
        const usersAfterFilter = users.filter(user => user.name.toLowerCase().includes(userNameLowerCase) || user.email.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredUsers(usersAfterFilter)
    }

    useEffect(() => {
        const getUsersDataFromAPI = async () => {
            try {
                const {data: users} = await getAllUsers()
                const {data: posts} = await getAllPosts()
                const {data: todos} = await getAllTodos()
                // Get Todos for each user and store it in the usersState
                for (const user of users) {
                    user.todos = [...todos.filter(todo => todo.userId === user?.id)]
                    user.posts = [...posts.filter(post => post.userId === user?.id)]
                }
                setUsersHandler(users)
                /* Use localStorage as DataBase On Client Side */
            } catch (e) {
                alert(e)
                console.error(e)
            }
        }
        // noinspection JSIgnoredPromiseFromCall
        getUsersDataFromAPI()
    }, []);

    useEffect(() => {
        setShowUserTodosAndPosts(selectedUser.hasOwnProperty("id"))
    }, [selectedUser]);

    useEffect(() => {
        localStorage.setItem("Users", JSON.stringify(users));
        setUsersCounter(users.length)
    }, [users]);

    return (
        <>
            <div className={"users-section"}>
                Search: <input type="text" onChange={filterUsersHandler}/>
                <button onClick={() => {
                    setShowNewUser(true)
                    setShowUserTodosAndPosts(false)
                }}>Add
                </button>
                {filteredUsers.map(user => {
                    return selectedUser.id === user.id ? (<React.Fragment key={`User${user.id} Selected`}>
                        <User isSelected={true} onUserDelete={userDeleteHandler}
                              onUserUpdate={userUpdateHandler} onUserSelect={selectedUserHandler}
                              user={user}/>
                    </React.Fragment>) : (<React.Fragment key={`User${user.id}`}>
                        <User isSelected={false} onUserDelete={userDeleteHandler}
                              onUserUpdate={userUpdateHandler}
                              onUserSelect={selectedUserHandler}
                              user={user}/>
                    </React.Fragment>)
                })}
                <div key={"userTodosAndPostsDiv"} className={"user-todos-posts"}>
                    {showUserTodosAndPosts &&
                        <>
                            <Todos key={`User${selectedUser.id} Todos`} updateTodos={setUserContent}
                                   user={selectedUser}/>
                            <br/>
                            <Posts user={selectedUser} updatePosts={setUserContent}
                                   key={`User${selectedUser.id} Posts`}/>
                        </>}
                    {showNewUser && <div>
                        Add New User
                        <br/>
                        <NewUser userId={usersCounter} addNewUser={createNewUser} onCancelHandler={setShowNewUser}/>
                    </div>}
                </div>
            </div>
        </>
    );
};

export default Users;
