import React from 'react';

const Post = ({ post, getUserById }) => {
    return (
        <div className="row" key={post.id}>
            <div className="check">
                <div className="checked"></div>
            </div>
            <div className="col-1 text-center">
                <p>{post.id}</p>
            </div>
            <div className="col-3">
                <p className="blue">{getUserById(post.userId)}</p>
            </div>
            <div className="col-6">
                <p>{post.title}</p>
            </div>
            <div className="col text-right">
                <p className="blue" style={{ cursor: 'pointer' }}><i className="fas fa-pencil-alt mr-2" aria-hidden="true"></i>Edit</p>
            </div>
        </div>
    );
}

export default Post;