import React, { useEffect, useState } from 'react'
import api from './../pages/api';
import Paginate from './Paginate';
import Post from './Post';
import Modal from './Modal';
import Swal from 'sweetalert2';

const Posts = () => {
    //Hooks
    const [rows, setRows] = useState(10);
    const [from, setFrom] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [userFilter, setUserFilter] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [to, setTo] = useState(from + rows)
    const [posts, setPosts] = useState([])
    const [form, setForm] = useState({ search: '', user: '', users: [], data: [] });
    //Handlers
    const getInformation = async () => {
        const { data: posts } = await api.getPosts();
        const { data: users } = await api.getUsers();
        setForm({ ...form, users, data: posts });
        setPosts(posts)
    }
    const getPostByUser = async ({ target }) => {
        // console.log("SEARHC", form.search)
        setShowUsers(false)
        if (target.value == "" && form.search == '') {
            // console.log("VACIO", form.data)
            setPosts(form.data);
            return
        }
        const user = form.users.find(user => user.id === target.value);
        setForm({ ...form, user: user.name, userId: target.value });

        let { data } = await api.getPostsByUserId(target.value)
        // console.log(data)
        let posts = form.search === "" && target.value === "" ? data
            : target.value === "" ? form.data.filter(post => post.title.toLowerCase().indexOf(form.search.toLowerCase()) > -1)
                : form.data.filter(post => post.title.toLowerCase().indexOf(form.search.toLowerCase()) > -1).
                    filter(post => Number(post.userId) === Number(target.value));

        setPosts(posts);

    }
    const handleChange = ({ target }) => {
        if (target.value === "" && form.user === "") {
            setForm({ ...form, [target.name]: target.value })
            setPosts(form.data)
            return
        }

        let newPosts = form.user !== "" && target.value === "" ? form.data.filter(post => Number(post.userId) === Number(form.userId))
            : form.user !== "" ? posts.filter(post => post.title.toLowerCase().indexOf(target.value.toLowerCase()) > -1)
                : form.data.filter(post => post.title.toLowerCase().indexOf(target.value.toLowerCase()) > -1);

        console.log(newPosts)

        setForm({ ...form, [target.name]: target.value });
        setPosts(newPosts);
    }
    const getUserById = id => {
        const { name } = form.users.find(user => user.id === id);
        return name;
    }
    const handleSetRows = data => {
        setTo(data);
        setRows(data);
    }
    const handlerFilter = () => {
        setUserFilter(true);
        setShowFilter(false);
    }

    const handleSubmit = data => {
        Swal.fire(
            'Post Created!',
            `The post with title <p class="font-weight-bold">${data.title}</p> was created `,
            'success'
        )
    }
    //useEffect
    useEffect(() => {
        if (posts.length === 0 && form.data.length === 0) getInformation();

    }, [])
    return (
        <div className="w-100">
            <div className="d-flex justify-content-between">
                <div className="row">
                    <div className="field col">
                        <input type="text" id="search" placeholder="Title" name="search" value={form.search} onChange={handleChange} />
                        <label htmlFor="search" className="blue">Search</label>
                    </div>
                    <div className="col">
                        {userFilter &&
                            <>
                                <div className="field">
                                    <i className="far fa-times-circle"
                                        style={{ position: 'absolute', left: '-.25rem', cursor: 'pointer', bottom: '1rem' }} aria-hidden="true"
                                        onClick={() => {
                                            setUserFilter(false)
                                            getPostByUser({ target: { value: '' } })
                                        }}
                                    />
                                    <input type="text" id="filterUser" name="user" onFocus={() => setShowUsers(true)} placeholder="user" value={form.user} onChange={getPostByUser} />
                                    <label htmlFor="filterUser">User</label>

                                    <div className="m-2 position-relative">
                                        <div className={`py-1 position-absolute w-100 ${showUsers ? 'visible' : ''}`} id="filterContent"
                                            style={{ border: "1px solid #eaeaea", zIndex: '100', borderRadius: "5px", top: "-15px", background: "#fff" }}
                                        >
                                            {form.users &&
                                                form.users.map(user => (
                                                    <p key={user.id} className="m-0 py-2 text-center" id="filter" onClick={() => getPostByUser({ target: { value: user.id } })} style={{ cursor: "pointer" }}>{user.name}</p>
                                                ))
                                            }

                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className="d-flex justify-content-around">
                    <div className="m-2 position-relative">
                        <p className="m-0 blue" style={{ cursor: "pointer" }} onClick={() => setShowFilter(true)}><i aria-hidden="true" className="fas fa-filter mr-2"></i>Add filter</p>
                        <div className={`py-1 position-absolute w-100 ${showFilter ? 'visible' : ''}`} id="filterContent"
                            style={{ border: "1px solid #eaeaea", borderRadius: "5px", top: "-15px", background: "#fff" }}
                        >
                            <p className="m-0 py-2 text-center" id="filter" onClick={() => handlerFilter()} style={{ cursor: "pointer" }}>User</p>
                        </div>
                    </div>
                    <a data-toggle="modal" href="#myModal" className="m-2 blue"><i aria-hidden="true" className="fas fa-plus mr-2 blue"></i>Create</a>
                    <p className="m-2 blue" style={{ cursor: 'pointer' }} ><i aria-hidden="true" className="fas fa-download mr-2 blue"></i>Export</p>
                </div>
            </div>
            <div className="row">
                <div className="check">
                    <div className="checked"></div>
                </div>
                <div className="col-1 text-center">
                    <p>id</p>
                </div>
                <div className="col-3">
                    <p>User</p>
                </div>
                <div className="col-6">
                    <p>Title</p>
                </div>
            </div>
            {posts.length > 0 &&
                <>
                    {posts.slice(from, to).map(post => (
                        <Post key={post.id} post={post} getUserById={getUserById} />
                    ))}
                    <Paginate rows={rows} from={from} setFrom={setFrom} to={to} setTo={setTo} handleSetRows={handleSetRows} total={posts.length} />
                </>
            }

            <style jsx>{`
                #filterContent {
                    visibility: hidden; 
                }
                #filterContent.show {
                    visibility: visible; 
                }
                #filter:hover {
                    background-color: #eaeaea; 
                }
            `}</style>
            <Modal users={form.users} api={api} handleSubmit={handleSubmit} />
        </div>
    );
}

export default Posts
