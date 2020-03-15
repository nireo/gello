import { CONSTANTS } from '.';
import { Dispatch } from 'redux';

export const setActiveBoard = (data: any) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: CONSTANTS.SET_NEW_ACTIVE_BOARD,
      payload: data
    });
  };
};
