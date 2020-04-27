const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    console.log('req.body', req.body);

    const hash = await bcrypt.hash(req.body.password, 15);

    console.log(' FIN ', hash);

    res.send({ status: 'OK', messaege: 'User created' });
  } catch (error) {
    console.log(error);
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
