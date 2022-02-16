const tasks = require('../service/tasks')

const createTask = async (req, res) => {
  const { status, task } = req.body;

  const create = await tasks.createTask(status,task);

  if (create.err) {
      return res.status(422).json(create);
  }
  res.status(201).json(create);
};

const getAll = async (req, res) => {
  const getAllTasks = await tasks.getAll();
  if (getAllTasks) {
  return res.status(200).json(getAllTasks);
}
};

module.exports = {
  createTask,
  getAll,

};