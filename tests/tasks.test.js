const sinon = require('sinon');
const { expect } = require('chai');
const frisby = require('frisby');
const { MongoClient } = require('mongodb');

const mongoDbUrl = 'mongodb://127.0.0.1:27017';
const url = 'http://localhost:3000';

describe('Insere uma nova task no BD', () => {
  let connection;
  let db;

  const newTask = {
    status: 'pendente',
    task: 'criar testes unitarios',
  }

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
});