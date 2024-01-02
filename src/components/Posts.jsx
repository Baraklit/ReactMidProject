import React, {useEffect, useState} from 'react';
import Post from './Post.jsx'
import NewPost from "./NewPost.jsx";

const Posts = ({user, updatePosts}) => {
    const [posts, setPosts] = useState([...user.posts])
    const [newPost, setNewPost] = useState({userId: user.id, id: 0, title: '', body: ''})
    const [newPostView, setNewPostView] = useState(false)
    const [postsCounter, setPostsCounter] = useState(0)
    const styles = {
        div: {
            display: 'flex', flexDirection: "row", justifyContent: "space-between", marginBottom: '4px'
        },
        postsDiv: {
            border: '1px solid black',
            padding: '10px'
        }
    }

    useEffect(() => {
        const customPostId = user.id === 1 ? posts.length : (user.id - 1).toLocaleString() + posts.length.toLocaleString()
        setPostsCounter(customPostId)
    });


    useEffect(() => {
        if (newPost.title !== '' && newPost.body !== '') {
            setPosts((prevState => ([...prevState, newPost])))
        }
        setNewPostView(false)
    }, [newPost]);

    useEffect(() => {
        updatePosts(posts, user.id, "posts")
    }, [posts]);

    return (<>
        <div style={styles.div}>
            {!newPostView && <span>Posts - User {user.id}</span>}
            {newPostView && <span>New Post - User {user.id}</span>}
            <button onClick={() => setNewPostView(true)}>Add</button>
        </div>
        <div style={styles.postsDiv}>
            {!newPostView && posts.map((post) => (<Post postItem={post} key={post.id}/>))}
            {newPostView &&
                <NewPost key={`NewPost User${user.id}`} postId={+postsCounter + 1} userId={user.id}
                         createNewPost={setNewPost}
                         onCancelHandler={setNewPostView}/>}
            {(!posts.length && !newPostView ) && <h3 style={{textAlign:'center'}}>No Posts</h3>}
        </div>
    </>);
};

export default Posts;
