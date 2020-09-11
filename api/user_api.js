const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/users')
    .get(userController.getAll)
    .post(userController.addUser)

router.route('/users/:id')
    .get(userController.getById)
    .put(userController.updateUser)
    .delete(userController.deleteUser)

router.route('/auth')
    .post(userController.authAccess)

module.exports = router;