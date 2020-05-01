// definición de todas las rutas que se van a comunicar con el controlador users
const express = require('express');
const usersController = require('../../controllers/v1/users-controller');

// con el router creamos las rutas
const router = express.Router();

// login no es del tipo GET, para que lo datos de la cuenta no vengan en texto plano, totalmente inseguro
router.post('/login', usersController.login);
router.post('/create', usersController.createUser);
router.post('/update', usersController.updateUser);
router.post('/delete', usersController.deleteUser);
router.get('/get-all', usersController.getUsers);


module.exports = router;
