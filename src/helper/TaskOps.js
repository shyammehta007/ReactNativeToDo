export const createTask = (title = '', completed) => {
  const taskId = Date.now().toString();
  return {
    taskId,
    title,
    completed: false,
  };
};

export const deleteTasklistInMap = ({listToTaskMap, tasklistId}) => {
  const tasklist = listToTaskMap[tasklistId] || [];
  let completedCount = 0;
  let uncompletedCount = 0;
  tasklist.reduce((result, current) => {
    if (current.completed === true) {
      completedCount += 1;
    } else {
      uncompletedCount += 1;
    }
    return result;
  }, []);
  delete listToTaskMap[tasklistId];
  return {
    completedCount,
    uncompletedCount,
  };
};

export const updatedTaskDetails = (data) => {
  const {tasklist, taskId, updates} = data;
  const updatedTaskIndex = tasklist.findIndex((task) => task.taskId === taskId);
  const task = tasklist[updatedTaskIndex];
  const {completed, title} = updates;
  if (title !== undefined) {
    return {
      updatedTaskIndex,
      updatedTitle: title,
      updatedCompleted: task.completed,
      completedCountUpdate: 0,
      uncompletedCountUpdate: 0,
    };
  }
  if (completed === true) {
    return {
      updatedTaskIndex,
      updatedTitle: task.title,
      updatedCompleted: completed,
      completedCountUpdate: 1,
      uncompletedCountUpdate: -1,
    };
  } else {
    return {
      updatedTaskIndex,
      updatedTitle: task.title,
      updatedCompleted: completed,
      completedCountUpdate: -1,
      uncompletedCountUpdate: 1,
    };
  }
};

export const deletedTaskDetails = (data) => {
  const {taskId, tasklist} = data;
  const deletedTaskIndex = tasklist.findIndex(
    (tempTask) => tempTask.taskId === taskId,
  );
  const task = tasklist[deletedTaskIndex];
  if (task.completed) {
    return {
      deletedTaskIndex,
      completedCountUpdate: -1,
      uncompletedCountUpdate: 0,
    };
  } else {
    return {
      deletedTaskIndex,
      completedCountUpdate: 0,
      uncompletedCountUpdate: -1,
    };
  }
};

export const tasklistTrimmer = (data) => {
  const {tasklist} = data;
  const updatedTasklist = tasklist.filter((task) => !(task.title === ''));
  return updatedTasklist;
};
