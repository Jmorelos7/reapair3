const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllUsers,
  findOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controllers');

const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middlewares');

const { validIfExistUser } = require('../middlewares/user.middlewares');
const { validateFields } = require('../middlewares/validateFields.middlewares');

const router = Router();

router.get('/', findAllUsers);

router.get('/:id', validIfExistUser, findOneUser);

// router.post(
//   '/',
//   [
//     check('name', 'The name is required').not().isEmpty(),
//     check('email', 'The email is required').not().isEmpty(),
//     check('email', 'The email must be a correct format').isEmail(),
//     check('password', 'The password is required').not().isEmpty(),
//     validateFields,
//   ],
//   createUser
// );

router.use(protect);

router.patch('/:id', validIfExistUser, updateUser, protectAccountOwner);

router.delete('/:id', validIfExistUser, deleteUser);

module.exports = {
  userRouter: router,
};
