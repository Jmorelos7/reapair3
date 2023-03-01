const { Router } = require("express");
const { check } = require("express-validator");
const { login, renewToken } = require("../controllers/auth.controller");
const { createUser } = require("../controllers/user.controllers");
const { protect } = require("../middlewares/auth.middlewares");
const { validIfExistUserEmail } = require("../middlewares/user.middlewares");
const { validateFields } = require("../middlewares/validateFields.middlewares");


const router = Router();

router.post(
  '/login',
  [
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password must be mandatory').not().isEmpty(),
  validateFields,
],
login);

router.post(
  '/signup',
  [
    check('name', 'The name must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password must be mandatory').not().isEmpty(),
    validateFields,
    validIfExistUserEmail,
  ],
  createUser
);

  router.use(protect)
  
  router.get('/renew', renewToken)
  
module.exports = {
    authRouter: router,
};