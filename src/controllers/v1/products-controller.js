const Products = require('../../mongo/models/products');

const createProduct = async (req, res) => {
  try {
    const { title, desc, price, images, userId } = req.body;

    const product = await Products.create({
      title,
      desc,
      price,
      images,
      user: userId,
    });
    res.send({ status: 'OK', data: product });
  } catch (error) {
    console.log('createProduct error', error);
    res.status(500).send({ status: 'ERROR', data: error.message });
  }
};

const deleteProduct = (req, res) => {};

const getsProducts = async (req, res) => {
  try {
    const products = await Products.find().select('title desc price').populate('user', 'username email data rol');
    res.send({ status: 'OK', data: products });
  } catch (error) {
    console.log('getProducts error', error);
    res.status(500).send({ status: 'ERROR', data: error.message });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  getsProducts,
};
