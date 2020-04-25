import { CreateTemplate } from '../interfaces/Template';
import { Dispatch } from 'redux';
import { createTemplate } from '../services/template';
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
