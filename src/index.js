// SIEMPRE PARA IMPORTAR DEPENDENCIAS, USAS CONST
// SIEMPRE IMPORTAR LAS LIBRERIAS DE 3ROS PRIMERO, LUEGOS LAS LOCALES
const express = require('express');
const bodyParser = require('body-parser');

const routesV1 = require('./routes/v1');

// crear aplicacion de express
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// aplication json
// SIEMPRE DAR SOPORTE PARA APLICACION JSON
app.use(bodyParser.json());

routesV1(app);

// ejecucion de aplicacion express
// puerto y callback
app.listen(4000, () => {
  console.log('running on 4000');
});
