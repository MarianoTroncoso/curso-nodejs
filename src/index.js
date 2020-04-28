// SIEMPRE PARA IMPORTAR DEPENDENCIAS, USAS CONST
// SIEMPRE IMPORTAR LAS LIBRERIAS DE 3ROS PRIMERO, LUEGOS LAS LOCALES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// para el tema de las variables de entorno
const dotenv = require('dotenv');

// habilitar lectura de variables de entorno
dotenv.config();

const routesV1 = require('./routes/v1');

// crear aplicacion de express
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// aplication json
// SIEMPRE DAR SOPORTE PARA APLICACION JSON
app.use(bodyParser.json());

routesV1(app);

// por si acaso, le damos el puerto 4000
const PORT = process.env.PORT || 4000;

// conexion a la base de datos mongo
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to mongodb');
    // iniciamos el servidor
    // ejecucion de aplicacion express
    // puerto y callback
    app.listen(PORT, () => {
      console.log('running on ', PORT);
    });
  })
  .catch((error) => {
    console.log('mongodb error', error);
  });
