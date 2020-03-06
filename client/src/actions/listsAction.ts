import { CONSTANTS } from '.';

export const addList = (title: string) => {
  return {
    payload: title,
    type: CONSTANTS.ADD_LIST
  };
};
