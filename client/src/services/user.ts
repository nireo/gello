import axios from 'axios';
import {
  LoginInterface,
  RegisterInterface,
  UpdateUser,
} from '../interfaces/User';

const baseUrl: string = '/api/auth';
let token: string | null = null;

const getConfig = () => ({
  headers: {
    Authorization: token,
  },
});

export const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

export const login = async (credentials: LoginInterface) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

export const register = async (credentials: RegisterInterface) => {
  const response = await axios.post(`${baseUrl}/register`, credentials);
  return response.data;
};

export const removeUser = async () => {
  const response = await axios.delete(`${baseUrl}/remove`, getConfig());
  return response.data;
};

export const updateUser = async (newInformation: UpdateUser) => {
  const response = await axios.patch(
    `${baseUrl}/update`,
    { newInformation },
    getConfig()
  );
  return response.data;
};
