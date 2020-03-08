import { CONSTANTS } from '../actions';
import { createItem } from '../services/item';
import { CreateItem } from '../interfaces/Item';
import { Dispatch } from 'redux';

export const addItem = (listID: number, text: string) => {
  return {
    type: CONSTANTS.ADD_ITEM,
    payload: { text, listID }
  };
};

export const createNewItem = (item: CreateItem, id: string) => {
  return async (dispatch: Dispatch) => {
    const data = await createItem(item, id);
    dispatch({
      type: CONSTANTS.CREATE_NEW_ITEM,
      payload: { data, id }
    });
  };
};
