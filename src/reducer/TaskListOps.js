import produce from 'immer';

import Type from '../actions/types.js';
import {createTasklist} from '../helper/TaskListOps';

const initialState = {
  listOfTasklistArray: [],
};

const listOfTasklistReducer = (state = initialState, action) =>
  produce(state, (draftState) => {
    const {listOfTasklistArray} = draftState;
    const {type, payload = {}} = action;
    const {title, tasklistId} = payload;
    let tasklist;
    switch (type) {
      case Type.TASKLIST_CREATE:
        tasklist = createTasklist();
        listOfTasklistArray.push(tasklist);
        break;

      case Type.TASKLIST_UPDATE:
        listOfTasklistArray.forEach((tasklistTemp) => {
          if (tasklistTemp.tasklistId === tasklistId) {
            tasklistTemp.title = title;
          }
        });
        break;

      case Type.TASKLIST_DELETE:
        const id = listOfTasklistArray.findIndex(
          (tasklistTemp) => tasklistTemp.tasklistId === tasklistId,
        );
        if (id >= 0) {
          listOfTasklistArray.splice(id, 1);
        }
        break;

      default:
    }
  });

export default listOfTasklistReducer;
