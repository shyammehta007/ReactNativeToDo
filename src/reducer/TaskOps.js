import produce from 'immer';

import Type from '../actions/types.js';
import {deleteTasklistInMap, createTask} from '../helper/TaskOps';

const initialState = {
  listToTaskMap: {},
  totalCompletedTask: 0,
  totalUncompletedTask: 0,
};

const listToTaskReducer = (state = initialState, action) =>
  produce(state, (draftState) => {
    let {listToTaskMap} = draftState;
    const {type, payload = {}} = action;
    const {
      tasklistId,
      updatedTaskIndex,
      deletedTaskIndex,
      updatedTitle,
      updatedCompleted,
      completedCountUpdate,
      uncompletedCountUpdate,
    } = payload;
    const tasklist = draftState.listToTaskMap[tasklistId] || [];
    switch (type) {
      case Type.TASK_CREATE:
        const newTask = createTask();
        tasklist.push(newTask);
        draftState.listToTaskMap[tasklistId] = tasklist;
        draftState.totalUncompletedTask += 1;
        break;

      case Type.TASK_UPDATE:
        const updatetargetlist = draftState.listToTaskMap[tasklistId];
        updatetargetlist[updatedTaskIndex].title = updatedTitle;
        updatetargetlist[updatedTaskIndex].completed = updatedCompleted;
        draftState.totalCompletedTask += completedCountUpdate;
        draftState.totalUncompletedTask += uncompletedCountUpdate;
        break;

      case Type.TASK_DELETE:
        const deleteTargetlist = draftState.listToTaskMap[tasklistId];
        deleteTargetlist.splice(deletedTaskIndex, 1);
        draftState.totalCompletedTask += completedCountUpdate;
        draftState.totalUncompletedTask += uncompletedCountUpdate;
        break;

      case Type.TASKLIST_DELETE:
        const {completedCount, uncompletedCount} = deleteTasklistInMap({
          listToTaskMap,
          tasklistId,
        });
        draftState.totalCompletedTask -= completedCount;
        draftState.totalUncompletedTask -= uncompletedCount;
        break;

      case Type.CLEAR_DATA:
        for (let key in listToTaskMap) {
          delete listToTaskMap[key];
        }
        draftState.totalCompletedTask = 0;
        draftState.totalUncompletedTask = 0;
        break;
      default:
    }
  });

export default listToTaskReducer;
