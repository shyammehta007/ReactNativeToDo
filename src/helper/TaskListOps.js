export const createTasklist = (title = '') => {
  const tasklistId = Date.now().toString();
  return {tasklistId, title};
};

export const findDeletedTasklistId = (details, tasklistArray) => {
  const {tasklistId} = details;
  return tasklistArray.findIndex(
    (tasklistTemp) => tasklistTemp.tasklistId === tasklistId,
  );
};
