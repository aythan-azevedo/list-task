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

module.exports = {
    createTask
};