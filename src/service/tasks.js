const validTask = require("../middlewares/validTask");
const tasks = require("../model/tasks");

const createTask = async (status, task ) => {
  const validation = await validTask.taskValid(status, task );

  if (validation !== true) {
     return validation;
  }

  const createTask = await tasks.createTask({status, task }) 
  return createTask;
};

const getAll = async () => {
  const getAllTasks = await tasks.getAllTasks();

  return getAllTasks;
};

const getById = async (id) => {
  const validId = await validTask.idValidate(id);
    if (validId !== true) return valid;
    
    const getId = await tasks.getById(id);
    return getId;
  };

  const updatetask = async (id, status, task) => {
    const validId = await validTask.idValidate(id);
    if (validId !== true) return valid;
    
    const validation = await validTask.taskValid(status, task );

    if (validation !== true) {
       return validation;
    }

    const update = tasks.updatetask(id, status, task);
    return update;
  };

module.exports = {
  createTask,
  getAll,
  getById,
  updatetask
};