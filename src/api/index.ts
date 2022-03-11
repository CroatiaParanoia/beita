import { Api } from './shuke/Api';
import { commonStorage } from '../common/common-storage';

const api = new Api({ baseURL: import.meta.env.VITE_SHUKE_API_URL });

api.instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${commonStorage.get('token')}`,
    };
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

export default api;
