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

const getById = async (req, res) => {
  const { id } = req.params;
  const getId = await tasks.getById(id);

if (getId.err) {
    return res.status(422).json(getId); 
    }  

  return res.status(200).json(getId[0]);
};


const updatetask = async (req, res) => {
  const { id } = req.params;
  const { status, task  } = req.body;
  const getId = await tasks.updatetask(id, status, task );

if (getId.err) {
    return res.status(422).json(getId); 
    }  

  return res.status(200).json(getId);
};


const deleteTask = async (req, res) => {
  const { id } = req.params;
const delId = await tasks.deleteId(id);

if (delId.err) {
  return res.status(422).json(delId);
}
return res.status(200).json(delId);
};

module.exports = {
  createTask,
  getAll,
  getById,
  updatetask,
  deleteTask,
};