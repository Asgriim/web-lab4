import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:27401/shotApi/'
});

const shotAPI = {
    async getEntries(token, page) {
        return await axiosInstance.get('shots', {
            params: {
                page: page
            },
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    },

    async sendShot(x, y, r, token) {
        return axiosInstance.post('shot', { x, y, r }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    },

    async getShotNum(token){
        return axiosInstance.get("shotNum",{
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    }
}

export default shotAPI;