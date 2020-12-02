import {findDeletedTasklistId} from '../helper/TaskListOps.js';
import Types from './types.js';

export const createTasklist = (details) => {
  return {
    type: Types.TASKLIST_CREATE,
    payload: details,
  };
};

export const updateTasklist = (details) => {
  return {
    type: Types.TASKLIST_UPDATE,
    payload: details,
  };
};

export const deleteTasklist = ({details, tasklistArray}) => {
  const deletedIndex = findDeletedTasklistId(details, tasklistArray);
  const payload = {...details, deletedTasklistIndex: deletedIndex};
  return {
    type: Types.TASKLIST_DELETE,
    payload,
  };
};
