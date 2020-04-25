import { CreateTemplate } from '../interfaces/Template';
import { Dispatch } from 'redux';
import {
  createTemplate,
  getTemplates,
  deleteTemplate,
} from '../services/template';
import { CONSTANTS } from './index';

export const createTemplateAction = (newTemplate: CreateTemplate) => {
  return async (dispatch: Dispatch) => {
    const createdTemplate = await createTemplate(newTemplate);
    dispatch({
      type: CONSTANTS.CREATE_TEMPLATE,
      data: createdTemplate,
    });
  };
};

export const getTemplatesAction = () => {
  return async (dispatch: Dispatch) => {
    const templates = await getTemplates();
    dispatch({
      type: CONSTANTS.GET_TEMPLATES,
      data: templates,
    });
  };
};

export const deleteTemplateAction = (id: string) => {
  return async (dispatch: Dispatch) => {
    await deleteTemplate(id);
    dispatch({
      type: CONSTANTS.DELETE_TEMPLATE,
      id: id,
    });
  };
};
