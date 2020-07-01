import axios from "axios";
import { CreateItem, UpdateItem } from "../interfaces/Item";
const baseUrl: string = "/api/items/";

let token: string | null = null;

export const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: {
    Authorization: token
  }
});

export const createItem = async (item: CreateItem, id: string) => {
  const response = await axios.post(
    `${baseUrl}create/${id}`,
    item,
    getConfig()
  );
  return response.data;
};

export const deleteItem = async (id: string) => {
  const response = await axios.delete(`${baseUrl}${id}`, getConfig());
  return response.data;
};

export const updateItem = async (item: UpdateItem, id: string) => {
  const response = await axios.patch(`${baseUrl}${id}`, item, getConfig());
  return response.data;
};

export const addTagToItem = async (itemId: string, tag_id: string) => {
  const response = await axios.post(
    `${baseUrl}/tag/${itemId}}`,
    { tag_id },
    getConfig()
  );
  return response.data;
};
