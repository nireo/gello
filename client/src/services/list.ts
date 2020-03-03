import axios from 'axios';
import { CreateList } from '../interfaces/List';
const baseUrl: string = '/api/list/';

export const getSingleList = async (id: string) => {
  const response = await axios.get(`${baseUrl}${id}`);
  return response.data;
};

export const createList = async (list: CreateList, id: string) => {
  const response = await axios.post(`${baseUrl}${id}`, list);
  return response.data;
};

export const deleteList = async (id: string) => {
  const response = await axios.delete(`${baseUrl}${id}`);
  return response.data;
};

export const updateList = async (list: CreateList, id: string) => {
  const response = await axios.patch(`${baseUrl}${id}`, list);
  return response.data;
};
