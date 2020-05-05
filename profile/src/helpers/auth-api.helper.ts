import axios, { AxiosInstance } from 'axios';
import { authUrl } from './../config/auth.config';

const authApi: AxiosInstance  = axios.create({
  baseURL: authUrl
});

export default authApi
