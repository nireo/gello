import { CONSTANTS } from '.';
import { Dispatch } from 'redux';
import { CreateBoard } from '../interfaces/Board';
import { updateBoard } from '../services/board';

export const setActiveBoard = (data: any) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: CONSTANTS.SET_NEW_ACTIVE_BOARD,
      payload: data
    });
  };
};

export const updateActive = (old: any, newData: CreateBoard) => {
  return async (dispatch: Dispatch) => {
    console.log(newData);
    const data = await updateBoard(newData, old.uuid);
    dispatch({
      type: CONSTANTS.UPDATE_ACTIVE_BOARD,
      payload: data
    });
  };
};
