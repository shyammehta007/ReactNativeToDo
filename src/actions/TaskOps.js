import {updatedTaskDetails, deletedTaskDetails} from '../helper/TaskOps.js';
import Types from './types.js';

export const createTask = (details) => {
  return {
    type: Types.TASK_CREATE,
    payload: details,
  };
};

export const deleteTask = (dispatchedData) => {
  const {tasklistId, taskId, tasklist} = dispatchedData;
  const data = deletedTaskDetails({taskId, tasklist});
  const payload = {
    tasklistId,
    ...data,
  };
  return {
    type: Types.TASK_DELETE,
    payload,
  };
};

export const updateTask = (dispatchedData) => {
  const {tasklist, tasklistId, taskId, updates} = dispatchedData;
  const data = updatedTaskDetails({tasklist, taskId, updates});
  const payload = {
    tasklistId,
    ...data,
  };
  return {
    type: Types.TASK_UPDATE,
    payload,
  };
};
