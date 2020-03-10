import { Dispatch } from 'redux';
import { getBoards } from '../services/board';
import { CONSTANTS } from '.';
import { Board } from '../interfaces/Board';

export const initBoards = () => {
  return async (dispatch: Dispatch) => {
    const data: Board[] = await getBoards();
    dispatch({
      type: CONSTANTS.INIT_BOARDS,
      payload: data
    });
  };
};
