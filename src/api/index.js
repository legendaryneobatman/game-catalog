import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.rawg.io/api',
})

axiosInstance.interceptors.request.use((request) => {
    const params = request.params ? request.params : {}
    params.key = '98116c9ded8f45749d70e4da610641fa'
    request.params = params
    return request
}, (error) => Promise.reject(error))

export default axiosInstance;