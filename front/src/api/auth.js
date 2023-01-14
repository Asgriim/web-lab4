import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:27401/auth/'
});

const authAPI = {
    async login(username, password) {
        return axiosInstance.post('login', { username, password });
    },

    async register(username, password) {
        console.log("тык на кнопку")
        return axiosInstance.post('register', { username, password });
    },
}

export default authAPI;