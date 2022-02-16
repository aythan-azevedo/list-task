const { connection } = require('./connection');
const { ObjectId } = require('mongodb');


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

const getById = async (id) => {
  const idList = await connection().then((db) => db.collection('list').find(ObjectId(id))
  .toArray())
  .then((result) => result);
  
  return idList;
};

const updatetask = (id, status, task ) => {
  const idList = connection().then((db) => db.collection('list')
  .updateOne({ _id: ObjectId(id) },
  { $set:
    {
    status,
    task
    } 
  }));
  if (idList) {
  return { _id: id, status, task  }; 
} 
};

module.exports = {
  createTask,
  getAllTasks,
  getById,
};
