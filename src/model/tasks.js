const { connection } = require('./connection');


const createTask = async ({ status, task }) => {
  const result = await connection()
    .then((db) => db.collection('list').insertOne({ status, task }))
    .then(({ insertedId: _id }) => ({
      _id,
      status,
      task
    }));
  return result;
};

const getAllTasks = async () => {
  const list = connection()
  .then((db) => db.collection('list').find().toArray())
  .then((result) => ({ tasks : result }));
  return list;
};

module.exports = {
  createTask,
  getAllTasks,
};
