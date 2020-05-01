const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
const { Schema } = mongoose;

// definimos esquema para nuestros usuarios
const productsSchema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [{ type: String, required: true }], default: [] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);
// timestamps sirve para saber cuando fue la ultima vez que se creo un elemento en la base de datos
// y cuando fue la ultima vez que se actualizo
// propiedad createdat, con la fecha de la ultima modificacion

// creamos el modelo
const model = mongoose.model('Product', productsSchema);
module.exports = model;
