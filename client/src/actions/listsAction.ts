import { CONSTANTS } from '.';

export const addList = (title: string) => {
  return {
    payload: title,
    type: CONSTANTS.ADD_LIST
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
