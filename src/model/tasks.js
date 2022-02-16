const { connection } = require('./connection');


const createTask = async ({ status, task }) => {
  const result = connection()
    .then((db) => db.collection('list').insertOne({ status, task }))
    .then(({ insertedId: _id }) => ({
      _id,
      status,
      task
    }));
  return result;
};

module.exports = {
  createTask
};
