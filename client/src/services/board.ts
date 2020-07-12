import axios from 'axios';
import { CreateBoard } from '../interfaces/Board';
import { Tag } from '../interfaces/Item';
const baseUrl: string = '/api/board/';

let token: string | null = null;

export const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: {
    Authorization: token,
  },
});

export const getBoards = async () => {
  const response = await axios.get(baseUrl, getConfig());
  return response.data;
};

export const getSingleBoard = async (id: string) => {
  const response = await axios.get(`${baseUrl}board/${id}`, getConfig());
  return response.data;
};

export const createBoard = async (newBoard: CreateBoard) => {
  const response = await axios.post(baseUrl, newBoard, getConfig());
  return response.data;
};

export const deleteBoard = async (id: string) => {
  const response = await axios.delete(`${baseUrl}${id}`, getConfig());
  return response.data;
};

export const updateBoard = async (updated: CreateBoard, id: string) => {
  const response = await axios.patch(`${baseUrl}${id}`, updated, getConfig());
  return response.data;
};

export const addTagToBoard = async (newTag: Tag, id: string) => {
  const response = await axios.post(`${baseUrl}/${id}`, newTag, getConfig());
  return response.data;
};

export const addUserToBoard = async (username: string, boardID: string) => {
  const response = await axios.post(
    `${baseUrl}/share/${boardID}`,
    { username },
    getConfig()
  );
  return response.data;
};

export const getSharedUsers = async (boardID: string) => {
  const response = await axios.get(`${baseUrl}/shared/${boardID}`, getConfig());
  return response.data;
};

export const unShareBoard = async (username: string, boardID: string) => {
  const response = await axios.post(
    `${baseUrl}/share/${boardID}/${username}`,
    getConfig()
  );
  return response.data;
};

export const getBoardActivities = async (boardID: string) => {
  const response = await axios.get(
    `${baseUrl}/activities/${boardID}`,
    getConfig()
  );
  return response.data;
};

export const removeBoardActivity = async (
  activityID: string,
  boardID: string
) => {
  const response = await axios.delete(
    `${baseUrl}/activity/${boardID}/${activityID}`,
    getConfig()
  );
  return response.data;
};

export const removeTag = async (tagID: string) => {
  const response = await axios.delete(`${baseUrl}/tag/${tagID}`, getConfig());
  return response.data;
};
