import { CONSTANTS } from '.';
import { Dispatch } from 'redux';
import { getSingleBoard } from '../services/board';

export const addList = (title: string) => {
  return {
    payload: title,
    type: CONSTANTS.ADD_LIST
  };
};

export const initListData = (id: string) => {
  return async (dispatch: Dispatch) => {
    const data = await getSingleBoard(id);
    dispatch({
      payload: data.lists,
      type: CONSTANTS.LOAD_BOARD_DATA
    });
  };
};

export const sort = (
  droppableIdStart: any,
  droppableIdEnd: any,
  droppableIndexStart: any,
  droppableIndexEnd: any,
  draggableId: any,
  type: string
) => {
  return {
    type: CONSTANTS.DRAG_HAPPENED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type
    }
  };
};
