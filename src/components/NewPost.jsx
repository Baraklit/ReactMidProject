import React, {useState} from 'react';

const NewPost = ({userId, postId, createNewPost, onCancelHandler}) => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const cancelHandler = () => {
        onCancelHandler(false)
    }

    const createNewPostHandler = () => {
        if (title.length > 0 && body.length > 0)
            createNewPost({id: postId, userId, title, body})
        else
            alert("Body And Title Must Contain Text")
    }

    return (
        <div>
            <label>Title: </label>
            <input type={"text"} onChange={(e) => {
                setTitle(e.target.value)
            }}/>
            <br/>
            <label>Body: </label>
            <input type={"text"} onChange={(e) => {
                setBody(e.target.value)
            }}/>
            <div style={{
                display: "flex",
                margin: "10px 0 0 0",
                justifyContent: "flex-end"
            }}>
                <button onClick={createNewPostHandler}>Add</button>
                <button onClick={cancelHandler}>Cancel</button>
            </div>
        </div>
    );
};

export default NewPost;
