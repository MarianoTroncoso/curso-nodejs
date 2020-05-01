const bcrypt = require('bcrypt');
const Users = require('../../mongo/models/users');

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

    res.send({ status: 'OK', messaege: 'User created' });
  } catch (error) {
    if (error.code && error.code === 11000) {
      res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', messaege: error.keyValye });
      // para terminar la ejecucion y no envia respuesta al cliente
      return;
    }
    // console.log('error createuser', error);
    // como no tengo forma de idetificar el tipo de error, status(500)
    res.status(500).send({ status: 'ERROR', messaege: error.message });
  }
};

const deleteUser = (req, res) => {};

const getUsers = (req, res) => {};

const updateUser = (req, res) => {};

module.exports = {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
};
