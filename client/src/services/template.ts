import axios from 'axios';
import { CreateTemplate } from '../interfaces/Template';
const baseUrl: string = '/api/template';
let token: string | null = null;

export const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: {
    Authorization: token,
  },
});

export const getTemplates = async () => {
  const response = await axios.get(baseUrl, getConfig());
  return response.data;
};

export const getTemplateWithID = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export const createTemplate = async (newTemplate: CreateTemplate) => {
  const response = await axios.post(baseUrl, newTemplate, getConfig());
  return response.data;
};

export const deleteTemplate = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

export const updateTemplate = async (
  updatedTemplate: CreateTemplate,
  id: string
) => {
  const response = await axios.patch(
    `${baseUrl}/${id}`,
    { updatedTemplate },
    getConfig()
  );
  return response.data;
};
