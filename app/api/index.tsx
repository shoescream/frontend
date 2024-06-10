// import LocalStorage from '@/utils/localStorage';
import LocalStorage from '@/utils/localStorage';
import axios, { InternalAxiosRequestConfig } from 'axios';

const Instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

const InstanceWithToken = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${LocalStorage.getItem('@token')}`,
  },
  withCredentials: true,
});

InstanceWithToken.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.authorization = `Bearer ${LocalStorage.getItem('@token')}`;
    return config;
  }
);

InstanceWithToken.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const originalRequest = error.config;

    if (status === 401) {
      // TODO: Refresh api 생기면 연결할 것
      // const token = localStorage.getItem('@token');
      // const refresh = localStorage.getItem('@refresh');
      // return Instance(originalRequest);
      return Promise.reject('잘못된 토큰입니다.');
    } else if (status === 400) {
      return Promise.reject('존재하지 않는 데이터입니다.');
    } else if (status === 404) {
      return Promise.reject('잘못된 접근입니다.');
    } else if (status === 500) {
      return Promise.reject('서버 에러');
    }
    return Promise.reject(error);
  }
);

export { Instance };
