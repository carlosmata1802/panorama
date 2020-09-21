import { create } from 'axios';

const api = create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    responseType: 'json',
    timeout: 10000,
});

api.getUsers = () => api.get('/users');

api.getPosts = async () => api.get('/posts');
api.createPost = async () => api.post('/posts');
api.getPostsByUserId = (id) =>
    api.get(`/posts?userId=${id}`);

export default api;