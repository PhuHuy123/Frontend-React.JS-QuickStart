import axios from '../axios';
import * as queryString from 'query-string';

const handleLogin =(email, password) => {
    return axios.post('/api/login',{email, password})
}
export {handleLogin}
