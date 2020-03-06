import { CONSTANTS } from '../actions';

export const addItem = (listID: number, text: string) => {
  return {
    type: CONSTANTS.ADD_ITEM,
    payload: { text, listID }
  };
};
