// import LocalStorage from '@/utils/localStorage';
import axios from 'axios';

const Instance = axios.create({
  baseURL: 'https://shoescream.shop',
  headers: {
    Accept: 'application/json',
  },
  // withCredentials: true,
});

// TODO: 추후 수정
// Instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   config.headers.authorization = LocalStorage.getItem('@token');
//   return config;
// });

// Instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const status = error.response?.status;
//     const originalRequest = error.config;

//     if (status === 401) {
//       const token = localStorage.getItem('@token');
//       const refresh = localStorage.getItem('@refresh');
//       return Instance(originalRequest);
//     } else if (status === 400) {
//       return Promise.reject('존재하지 않는 데이터입니다.');
//     } else if (status === 404) {
//       return Promise.reject('잘못된 접근입니다.');
//     } else if (status === 500) {
//       return Promise.reject('서버 에러');
//     }
//     return Promise.reject(error);
//   }
// );

export { Instance };
