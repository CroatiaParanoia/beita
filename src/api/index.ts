import { Api, ResponseErrorType } from './shuke/Api';
import { commonStorage } from '../common/common-storage';
import { userEvent } from '../common/common-event';

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

api.instance.interceptors.response.use((response) => {
  if (response.data.errType === ResponseErrorType.TOKEN_EXPIRED) {
    // console.log('重新登录');
    userEvent.emit('logout');
  }

  return response;
});

export default api;
