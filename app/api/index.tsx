// import LocalStorage from '@/utils/localStorage';
import LocalStorage from '@/utils/localStorage';
import axios from 'axios';

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
const PostInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${LocalStorage.getItem('@token')}`,
  },
});

export { Instance, InstanceWithToken, PostInstance };
