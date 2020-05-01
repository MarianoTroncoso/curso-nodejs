const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../../mongo/models/users');
const Products = require('../../mongo/models/products');

// tiempo de expiración
// 10 minutos
const expiresIn = 60 * 10;

// segurirdad
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      //comprobar contraseña
      const isOk = await bcrypt.compare(password, user.password);
      if (isOk) {
        // generar token que almacena id y rol
        // como 2do parametro le pasamos la llave secreta, la cual guardamos en las variables de entorno
        // firma
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn }
        );
        res.send({
          status: 'OK',
          data: {
            token,
            expiresIn,
          },
        });
      } else {
        // 403 = contraseña incorrecta, creo
        res.status(403).send({ status: 'INVALID PASSWORD', message: '' });
      }
    } else {
      // no match
      // 204 = petición se realizo de manera correcta pero no encontró ningun dato
      // respuesta de status code 204 es algo vacio, por eso le paso 401
      res.status(401).send({ status: 'USER_NOT_FOUND', message: '' });
    }
  } catch (error) {
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    // obtengo la data
    const { username, email, password, data } = req.body;

    const hash = await bcrypt.hash(password, 15);

    const user = new Users();
    user.username = username;
    user.email = email;
    user.password = hash;
    user.data = data;

    await user.save();

    res.send({ status: 'OK', message: 'User created' });
  } catch (error) {
    if (error.code && error.code === 11000) {
      res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: error.keyValye });
      // para terminar la ejecucion y no envia respuesta al cliente
      return;
    }
    // console.log('error createuser', error);
    // como no tengo forma de idetificar el tipo de error, status(500)
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    // console.log('userId', userId);

    if (!userId) {
      throw new Error('missing param userId');
    }

    await Users.findByIdAndDelete(userId);

    // eliminar los productos asociados a un cliente
    await Products.deleteMany({ user: userId });
    res.send({ status: 'OK', message: 'user deleted' });
  } catch (error) {
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await Users.find().select({ password: 0, __v: 0, role: 0 });
    res.send({ status: 'OK', data: users });
  } catch (error) {
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    console.log('req.sessionData', req.sessionData.userId);
    const { username, email, data } = req.body;
    await Users.findByIdAndUpdate(req.sessionData.userId, {
      username,
      email,
      data,
    });
    res.send({ status: 'OK', message: 'user updated' });
  } catch (error) {
    // console.log(error);
    if (error.code && error.code === 11000) {
      res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: error.keyValue });
      // para terminar la ejecucion y no envia respuesta al cliente
      return;
    }
    res.status(500).send({ status: 'ERROR', message: 'user updated' });
  }
};

module.exports = {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  login,
};
