import axios from 'axios';
// import Cookies from 'js-cookie';

// const TOKEN = Cookies.get('access_token');

const baseAPI = axios.create({
  baseURL: 'http://localhost:8080/api/todos', // try https
  headers: {
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${TOKEN}`,
  },
});

export default baseAPI;
