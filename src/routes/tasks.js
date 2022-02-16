const { Router } = require('express');

const router = Router();

  const taskController = require('../controller/tasks');

router.post('/', taskController.createTask);

router.get('/', taskController.getAll);

router.get('/:id', taskController.getById);

router.put('/:id', taskController.updateProd);

router.delete('/:id', taskController.deleteProd);

module.exports = router;