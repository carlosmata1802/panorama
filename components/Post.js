import React, { useState } from 'react';

const Post = ({ post, getUserById }) => {
    const [status, setStatus] = useState(false)
    return (
        <div className={`row ${status ? 'active' : ''}`} key={post.id}>
            <div className="check">
                <div className={`checked d-flex ${status ? 'active' : ''}`}
                    onClick={() => setStatus(!status)}
                >
                    {status &&
                        <i className="fas fa-check" aria-hidden="true"></i>
                    }
                </div>
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
            <style jsx>{`
                .row.active {
                    background-color: #3085d659 !important; 
                }
                .checked.active {
                    background-color: #007bff; 
                    padding: 2px; 
                    border-color: #007bff; 
                }
                .checked i {
                    font-size: 11px; 
                    color: #fff; 
                }
            `}</style>
        </div>
    );
}

export default Post;