import axios from 'axios';
import { LoginInterface, RegisterInterface } from '../interfaces/User';

const baseUrl: string = '/api/auth';
let token: string | null = null;

export const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: {
    Authorization: token
  }
});

export const login = async (credentials: LoginInterface) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

export const register = async (credentials: RegisterInterface) => {
  const response = await axios.post(`${baseUrl}/register`, credentials);
  return response.data;
};
