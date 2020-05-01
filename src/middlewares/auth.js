/* eslint-disable no-throw-literal */
const jwt = require('jsonwebtoken');

const isValidHostname = (req, res, next) => {
  const validHosts = ['localhost'];
  if (validHosts.includes(req.hostname)) {
    // si todo esta correcto pasa a la ejecucion del controlador
    next();
  } else {
    res.status(403).send({ status: 'ACCESS_DENIED' });
  }
};

const isAuth = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (token) {
      // comprobar token valido
      const data = jwt.verify(token, process.env.JWT_SECRET);
      console.log('jwt.data', data);

      // no tiene que ser un atributo de req, tiene que ser uno inventado por vos
      // entonces vos haces la validacion en la parte de verify
      req.sessionData = { userId: data.userId, role: data.role };
      next();
    } else {
      // acceso denegado
      // excepcion personalidad con throw
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'Missing header token',
      };
    }
  } catch (error) {
    res
      .status(error.code || 500)
      .send({ status: error.status || 'ERROR', message: error.message });
  }
};

const isAdmin = (req, res, next) => {
  try {
    const { role } = req.sessionData;
    console.log('isAdmin: ', role);
    if (role !== 'admin') {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'Invalid role',
      };
    }
    next();
  } catch (error) {
    res
      .status(error.code || 500)
      .send({ status: error.status || 'ERROR', message: error.message });
  }
};

module.exports = { isValidHostname, isAuth, isAdmin };
