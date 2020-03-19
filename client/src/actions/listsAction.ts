import { CONSTANTS } from '.';
import { Dispatch } from 'redux';
import { getSingleBoard } from '../services/board';
import {
  createList as serviceCreateList,
  deleteList as serviceDeleteList
} from '../services/list';
import { CreateList } from '../interfaces/List';

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

export const createList = (list: CreateList, id: string) => {
  return async (dispatch: Dispatch) => {
    const data = await serviceCreateList(list, id);
    dispatch({
      type: CONSTANTS.CREATE_NEW_LIST,
      payload: data
    });
  };
};

export const deleteList = (listID: string) => {
  return async (dispatch: Dispatch) => {
    await serviceDeleteList(listID);
    dispatch({
      id: listID,
      type: CONSTANTS.REMOVE_LIST
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
