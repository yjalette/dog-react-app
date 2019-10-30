import axios from 'axios';
import Cookies from 'js-cookie';

axios.interceptors.request.use(
    config => {
        if (!config.url.startsWith("http")) {
            config.headers['x-auth-token'] = Cookies.get('token');
        }

        console.log(config)
        return config;
    },
    error => Promise.reject(error)
);