const express = require('express');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

const taskRouter = require('./routes/tasks');

app.use('/task', taskRouter);

app.listen(PORT, () => console.log(`online na porta ${PORT}`));
