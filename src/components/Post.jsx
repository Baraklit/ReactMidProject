import React, {useState} from 'react';

const Post = ({postItem}) => {
    return (
        <div className={"todo"}>
            <strong>Title:</strong> {postItem.title}
            <br/>
            <strong>Body:</strong> {postItem.body}
        </div>
    );
};

export default Post;
