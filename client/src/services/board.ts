import axios from 'axios';
import { CreateBoard } from '../interfaces/Board';
const baseUrl: string = '/api/board/';

let token: string | null = null;

export const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: {
    Authorization: token
  }
});

export const getBoards = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const getSingleBoard = async (id: string) => {
  const response = await axios.get(`${baseUrl}${id}`);
  return response.data;
};

export const createBoard = async (newBoard: CreateBoard) => {
  const response = await axios.post(baseUrl, newBoard);
  return response.data;
};

export const deleteBoard = async (id: string) => {
  const response = await axios.delete(`${baseUrl}${id}`);
  return response.data;
};

export const updateBoard = async (updated: CreateBoard, id: string) => {
  const response = await axios.patch(`${baseUrl}${id}`, updated);
  return response.data;
};
