const { ObjectId } = require('mongodb');

const taskValid = (status, task) => {

  const statusType = typeof status === 'string';
  const taskType = typeof status === 'string';

    if ( !statusType || !taskType ) { 
return { err: { code: 'invalid_data', message: '"status" and "task" needs to be a string ' } };
}

    return true;
};

const idValidate = (id) => {
    if (!(ObjectId.isValid(id))) {
        return { err: { code: 'invalid_data', message: 'Wrong id format' } };
    }
        
        return true;
    };

module.exports = {
    taskValid,
    idValidate,
};