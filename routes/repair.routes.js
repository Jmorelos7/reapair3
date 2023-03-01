const { Router } = require('express');
const {
  findAllRepairs,
  findOneRepair,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repair.controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields.middlewares');
const { validIfExistRepair } = require('../middlewares/repair.middlewares');
const { protect } = require('../middlewares/auth.middlewares');

const router = Router();

router.post(
  '/',
  [
    check('date', 'The Date is required').not().isEmpty(),
    check('motorsNumber', 'The MotorsNumber is required').not().isEmpty(),
    check('description', 'The Description is required').not().isEmpty(),
    check('userId', 'The UserId is required').not().isEmpty(),
    validateFields,
  ],
  createRepair
);

router.use(protect);

router.get('/', findAllRepairs);

router.get('/:id', validateFields, findOneRepair, validIfExistRepair);

router.patch('/:id', validateFields, validIfExistRepair, updateRepair);

router.delete('/:id', validateFields, validIfExistRepair, deleteRepair);

module.exports = {
  repairRouter: router,
};
