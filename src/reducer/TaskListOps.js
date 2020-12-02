import produce from 'immer';

import Type from '../actions/types.js';
import {createTasklist} from '../helper/TaskListOps';

const initialState = {
  listOfTasklistArray: [],
  totalNoOfTaskList: 0,
};

const listOfTasklistReducer = (state = initialState, action) =>
  produce(state, (draftState) => {
    let {listOfTasklistArray} = draftState;
    const {type, payload = {}} = action;
    const {title, tasklistId, deletedTasklistIndex} = payload;
    switch (type) {
      case Type.TASKLIST_CREATE:
        const newTasklist = createTasklist();
        draftState.listOfTasklistArray.push(newTasklist);
        draftState.totalNoOfTaskList = draftState.totalNoOfTaskList + 1;
        break;

      case Type.TASKLIST_UPDATE:
        draftState.listOfTasklistArray.forEach((tasklistTemp) => {
          if (tasklistTemp.tasklistId === tasklistId) {
            tasklistTemp.title = title;
          }
        });
        break;

      case Type.TASKLIST_DELETE:
        draftState.totalNoOfTaskList = draftState.totalNoOfTaskList - 1;
        draftState.listOfTasklistArray.splice(deletedTasklistIndex, 1);

        break;
      case Type.CLEAR_DATA:
        draftState.totalNoOfTaskList = 0;
        draftState.listOfTasklistArray.splice(0, listOfTasklistArray.length);
        break;
      default:
    }
  });

export default listOfTasklistReducer;
