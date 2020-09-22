import React, { useState } from 'react';


const Modal = ({ handleSubmit, users, api }) => {
    const [form, setForm] = useState({
        title: '',
        body: '',
        userId: null
    });

    const handleChange = ({ target }) => {
        setForm({
            ...form,
            [target.name]: target.value
        })
    }

    const onSubmit = async () => {
        if (form.userId === '' || form.userId === null) {
            return;
        }
        let { data } = await api.createPost(form);
        console.log(data);
        handleSubmit({ ...form, ...data });
    }
    return (
        <div className="modal fade" id="myModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Create a new Post</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title" className="form-control" name="title" value={form.title} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="body">Description</label>
                                <textarea type="text" id="body" className="form-control" name="body" value={form.body} onChange={handleChange} ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="usuarioSelect">Usuario</label>
                                <select id="usuarioSelect" className="form-control" name="userId" onChange={handleChange}>
                                    <option value="">Selecciona un usuario</option>
                                    {users && users.map(user => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={onSubmit}>Crear post</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;