import { Dispatch } from 'redux';
import {
  getBoards,
  createBoard as serviceCreateBoard,
  deleteBoard as serviceDeleteBoard
} from '../services/board';
import { CONSTANTS } from '.';
import { Board, CreateBoard } from '../interfaces/Board';

export const initBoards = () => {
  return async (dispatch: Dispatch) => {
    const data: Board[] = await getBoards();
    dispatch({
      type: CONSTANTS.INIT_BOARDS,
      payload: data
    });
  };
};

export const createBoard = (newBoard: CreateBoard) => {
  return async (dispatch: Dispatch) => {
    const data: Board = await serviceCreateBoard(newBoard);
    dispatch({
      type: CONSTANTS.CREATE_NEW_BOARD,
      data: data
    });
  };
};

export const deleteBoard = (id: string) => {
  return async (dispatch: Dispatch) => {
    await serviceDeleteBoard(id);
    dispatch({
      type: CONSTANTS.REMOVE_BOARD,
      id: id
    });
  };
};
