const bcrypt = require('bcrypt');
const Users = require('../../mongo/models/users');

// segurirdad
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      //comprobar contraseña
      const isOk = await bcrypt.compare(password, user.password);
      console.log(isOk);
      if (isOk) {
        res.send({ status: 'OK', data: {} });
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

    // console.log(' FIN ', hash);

    // UNA FORMA DE GUARDAR DATOS EN MONGO DB
    // si el nombre de la variable con la cual asignas es el mismo que el nombre en la tabla, pones una sola vez
    // await Users.create({
    //   username,
    //   email,
    //   data,
    //   password: hash,
    // });

    // OTRA FORMA DE GUARDAR DATOS EN MONGO DB
    const user = new Users();
    user.username = username;
    user.email = email;
    user.password = password;
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

const deleteUser = (req, res) => {};

const getUsers = (req, res) => {};

const updateUser = async (req, res) => {
  try {
    const { username, email, data, userId } = req.body;
    await Users.findByIdAndUpdate(userId, {
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
