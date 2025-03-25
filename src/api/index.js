import axios from 'axios';

import { omdbApiKey } from '#root/config/env.js';

const api = axios.create({
    baseURL: 'http://www.omdbapi.com',
    params: {
        apikey: omdbApiKey
    }
});

export { api };