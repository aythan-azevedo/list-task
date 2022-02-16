const { Router } = require('express');

const router = Router();

  const taskController = require('../controller/tasks');

router.post('/', taskController.createTask);

router.get('/', taskController.getAll);

router.get('/:id', taskController.getById);

// router.put('/:id', taskController.updatetask);

// router.delete('/:id', taskController.deletetask);

module.exports = router;