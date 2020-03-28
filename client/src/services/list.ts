import axios from 'axios';
import { CreateList } from '../interfaces/List';
const baseUrl: string = '/api/list/';
let token: string | null = null;

export const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: {
    Authorization: token
  }
});

export const getSingleList = async (id: string) => {
  const response = await axios.get(`${baseUrl}${id}`, getConfig());
  return response.data;
};

export const createList = async (list: CreateList, id: string) => {
  const response = await axios.post(`${baseUrl}${id}`, list, getConfig());
  return response.data;
};

export const deleteList = async (id: string) => {
  const response = await axios.delete(`${baseUrl}${id}`, getConfig());
  return response.data;
};

export const updateList = async (list: CreateList, id: string) => {
  const response = await axios.patch(`${baseUrl}${id}`, list, getConfig());
  return response.data;
};
