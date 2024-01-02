import axios from 'axios'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'
const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos'
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const getAllUsers = () => {
    return axios.get(`${USERS_URL}`)
}

const getAllPosts = () => {
    return axios.get(`${POSTS_URL}`)
}

const getAllTodos = () => {
    return axios.get(`${TODOS_URL}`)
}
const getTodosByUserId = (userId, limit = 10) => {
    return axios.get(`${TODOS_URL}?userId=${userId}&_limit=${limit}`)
}

const getPostsByUserId = (userId, limit = 10) => {
    return axios.get(`${POSTS_URL}?userId=${userId}&_limit=${limit}`)
}


export {getAllUsers, getAllPosts, getAllTodos, getTodosByUserId, getPostsByUserId}
