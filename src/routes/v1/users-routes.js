// definición de todas las rutas que se van a comunicar con el controlador users
const express = require('express');

const { isAuth, isValidHostname, isAdmin } = require('../../middlewares/auth');

const usersController = require('../../controllers/v1/users-controller');

// con el router creamos las rutas
const router = express.Router();

// login no es del tipo GET, para que lo datos de la cuenta no vengan en texto plano, totalmente inseguro
router.post('/login', usersController.login);
router.post('/create', usersController.createUser);
router.post('/update', isValidHostname, isAuth, usersController.updateUser);
router.post('/delete', isAuth, isAdmin, usersController.deleteUser);
router.get('/get-all', isAuth, isAdmin, usersController.getUsers);

module.exports = router;
