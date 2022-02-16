const { expect } = require('chai');
const frisby = require('frisby');
const { MongoClient } = require('mongodb');


const mongoDbUrl = 'mongodb://127.0.0.1:27017';
const url = 'http://localhost:3000';
const invalidId = 969879

describe('Insere uma nova task no BD', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('list');
    await db.collection('task').deleteMany({});
  });

  beforeEach(async () => {
    await db.collection('task').deleteMany({});
    const myobj = { status: 'pendente',task: 'criar testes unitarios'};
    await db.collection('task').insertOne(myobj);
  });


  afterEach(async () => {
    await db.collection('task').deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });


  it('Será validado que não é possível criar um status com valor number', async () => {
    await frisby
      .post(`${url}/task/`, {
        status: 135,
        task: 'criar testes unitarios',
      })
      .expect('status', 422)
      .then((res) => {
        let { body } = res;
        body = JSON.parse(body);
        const error = body.err.code;
        const { message } = body.err;
        expect(error).equal('invalid_data');
        expect(message).equal('"status" and "task" needs to be a string ');
      });
  });
  it('Será validado que não é possível criar uma task com valor number', async () => {
    await frisby
      .post(`${url}/task/`, {
        status: 'pendente',
        task: 135,
      })
      .expect('status', 422)
      .then((res) => {
        let { body } = res;
        body = JSON.parse(body);
        const error = body.err.code;
        const { message } = body.err;
        expect(error).equal('invalid_data');
        expect(message).equal('"status" and "task" needs to be a string ');
      });
  });
  it('Será validado que  é possível criar uma task ', async () => {
    await frisby
      .post(`${url}/task/`, {
        status: 'pendente',
        task: 'criar testes unitarios',
      })
      .expect('status', 201)
      .then((res) => {
        let { body } = res;
        body = JSON.parse(body);
        const status = body.status;
        const task = body.task;
        expect(status).equal('pendente');
        expect(task).equal('criar testes unitarios');
        expect(body).haveOwnProperty('_id');
      });
  });
});


describe('2 -  listar os produtos', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('list');
    await db.collection('task').deleteMany({});
  });

  beforeEach(async () => {
    await db.collection('task').deleteMany({});
    const taskList = [{ status: 'pendente',task: 'criar testes unitarios'},
    { status: 'pendente',task: 'criar frontend'},];
    await db.collection('task').insertMany(taskList);
  });

  afterEach(async () => {
    await db.collection('task').deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Será validado que todos produtos estão sendo retornados', async () => {
    await frisby
      .get(`${url}/task`)
      .expect('status', 200)
      .then((res) => {
        let { body } = res;
        body = JSON.parse(body);
        const firststatus = body.tasks[0].status;
        const firstTask = body.tasks[0].task;
        const secondstatus = body.tasks[1].status;
        const secondTask = body.tasks[1].task;

        expect(firststatus).equal( 'pendente');
        expect(firstTask).equal('criar testes unitarios');
        expect(secondstatus).equal('pendente');
        expect(secondTask).equal('criar frontend');
      });
  });

  it('Será validado que não é possível listar uma task que não existe', async () => {
    await frisby.get(`${url}/task/${invalidId}`)
      .expect('status', 422)
      .then((secondResponse) => {
        const { json } = secondResponse;
        const error = json.err.code;
        const { message } = json.err;
        expect(error).equal('invalid_data');
        expect(message).equal('Wrong id format');
      });
  });

  it('Será validado que é possível listar uma determinada task', async () => {
    let result;

    await frisby
      .post(`${url}/task`, { 
        status: 'pendente',
        task: 'criar testes unitarios'
      })
      .expect('status', 201)
      .then((response) => {
        const { body } = response;
        result = JSON.parse(body);
        responseTaskId = result._id;
      });

    await frisby.get(`${url}/task/${responseTaskId}`)
      .expect('status', 200)
      .then((secondResponse) => {
        const { json } = secondResponse;
        const status = json.status;
        const task = json.task;
        expect(status).equal('pendente');
        expect(task).equal('criar testes unitarios');
      });
  });
});